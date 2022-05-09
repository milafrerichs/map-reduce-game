<script>
  import { scaleLinear, scaleBand, scalePoint, scaleOrdinal } from "d3-scale";
  import { range } from "d3-array";
  import Island from "./Island.svelte";
  import Greece from "./Greece.svelte";
  import Dot from "./Dot.svelte";
  import { greece, islands, stepIndex } from "./stores/game.store";
  import { data, selectedData } from "./stores/data.store";

  export let width;
  export let height;
  let useGrid = false;
  let activeData;

  let steps = [
    {
      name: "greece",
      component: Greece,
      useGrid: false,
      data: greece,
      props: { width, height },
    },
    {
      name: "gridIslands",
      data: islands,
      useGrid: true,
      component: Island,
      size: 340,
      padding: 0,
      offset: 0,
      props: { width: 400, height: 200, padding: 40 },
    },
    {
      name: "allCircles",
      data: data,
      useGrid: true,
      component: Dot,
      padding: 0,
      size: 20,
      offset: 0,
      props: { radius: 5 },
    },
    {
      name: "selectedCircles",
      data: data,
      useGrid: true,
      component: Dot,
      padding: 0,
      size: 20,
      offset: 0,
      props: { radius: 5, highlightSelected: true, selectedColor: "red" },
    },
  ];

  $: currentStep = steps[$stepIndex];
  $: size = currentStep.size;
  $: useGrid = currentStep.useGrid;
  $: cols = Math.ceil(width / size);
  $: rows = Math.ceil(activeData.length / cols);
  $: if (width && height) {
    steps[0].props.width = width;
    steps[0].props.height = height;
  }

  $: if (currentStep.data) {
    const unsubscribe = currentStep.data.subscribe((value) => {
      activeData = value;
    });
  }

  $: colScale = scalePoint()
    .domain(range(cols))
    .range([0, width])
    .round(true)
    .padding(currentStep.padding || 0);

  $: rowScale = scalePoint()
    .domain(range(rows))
    .range([0, height])
    .round(true)
    .padding(currentStep.padding || 0);

  function transform(d, i) {
    if (useGrid) {
      let row = Math.floor(i / cols);
      let col = cols == 1 ? 0 : i % cols;

      return `translate(${colScale(col)}, ${rowScale(row) - currentStep.offset})`;
    }
    return "translate(0,0)";
  }
</script>

<svg {width} {height}>
  {#each activeData as d, i}
    <g class="islands" transform={transform(d, i)}>
      <svelte:component
        this={currentStep.component}
        data={d}
        {...currentStep.props}
      />
    </g>
  {/each}
</svg>
