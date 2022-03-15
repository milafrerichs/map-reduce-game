<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { scaleLinear, scaleBand, scalePoint, scaleOrdinal } from "d3-scale";
  import { range } from "d3-array";
  import { select as d3select, selectAll } from "d3-selection";
  import { transition } from "d3-transition";
  import { store } from "./stores/game.store";

  export let data = [];
  export let onlySelected = false;
  export let oneCol = false;
  export let table = false;
  export let step;

  let steps = ["all", "selected", "oneRow", "oneCol", "table"];

  let svg;
  let dots;
  let size = 10;
  let padding = 10;
  let width = 1200;
  let height = 800;
  let dataCols = Math.ceil(Math.sqrt(data.length));
  let selectedCols;
  let selectedRows;
  let displayedData = data;

  $: step = steps[$store.stepIndex];
  $: selected = $store.selected;
  $: cols =
    step === "oneCol" || step === "table"
      ? 1
      : Math.ceil(width / (size + padding));
  $: dataRows = Math.ceil(data.length / cols);
  $: selectedRows = Math.ceil(selected.length / cols);
  $: rows =
    step === "oneCol" || step === "table"
      ? selectedRows
      : step === "oneRow"
      ? 1
      : dataRows;
  $: displayedData = step === "all" || step === "selected" ? data : selected;

  $: colScale = scalePoint().domain(range(cols)).range([0, width]).padding(1);

  $: rowScale = scalePoint().domain(range(rows)).range([0, height]).padding(1);

  $: if (data) {
    d3select(dots).selectAll(".dot").data(data);
  }

  function row(i) {
    return Math.floor(i / cols);
  }
  function col(i) {
    if (cols == 1) {
      return 0;
    }
    return i % cols;
  }

  onMount(() => {
    d3select(dots).selectAll(".dot").data(data);
  });
</script>

<main bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg {width} {height} bind:this={svg}>
    <g bind:this={dots}>
      {#each displayedData as d, i}
        <g
          class="dot"
          transform="translate({colScale(col(i))},{rowScale(row(i))})"
        >
          {#if step === "table"}
            <text>{d.island}, {d.temp}°C</text>
          {:else if selected.some((e) => e.id === d.id)}
            <circle r="5" fill="red" />
          {:else if step === "all" || step === "selected"}
            <circle r="5" fill="gray" />
          {/if}
        </g>
      {/each}
    </g>
  </svg>
</main>

<style>
</style>
