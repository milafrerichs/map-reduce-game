<script>
  import { scaleLinear, scaleBand, scalePoint, scaleOrdinal } from "d3-scale";
  import { range } from "d3-array";
  import Island from "./Island.svelte";
  import Greece from "./Greece.svelte";
  import Dot from "./Dot.svelte";
  import {
    greece,
    islands,
    data,
    selectedData,
    stepIndex,
  } from "./stores/game.store";

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
      size: 200,
      props: { width: 200, height: 200, padding: 20 },
    },
    {
      name: "allCircles",
      data: data,
      useGrid: true,
      component: Dot,
      size: 20,
      props: { radius: 5 },
    },
    {
      name: "selectedCircles",
      data: data,
      useGrid: true,
      component: Dot,
      size: 20,
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
    .padding(1);

  $: rowScale = scalePoint()
    .domain(range(rows))
    .range([0, height])
    .round(true)
    .padding(1);

  function transform(d, i) {
    if (useGrid) {
      let row = Math.floor(i / cols);
      let col = cols == 1 ? 0 : i % cols;

      return `translate(${colScale(col)}, ${rowScale(row) - size})`;
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
