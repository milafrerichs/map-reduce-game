<script>
  import { fade  } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { scaleLinear, scaleBand, scalePoint, scaleOrdinal } from 'd3-scale';
  import { range } from 'd3-array';
  import { select as d3select, selectAll } from 'd3-selection';
  import { transition } from 'd3-transition';
  let width = 1200;
  let height = 800;

  export let data = [];
  export let size = 10;
  export let padding = 10;
  export let component;
  export let componentProps;

  export let cols = Math.ceil(width / (size+padding));
  export let rows = Math.ceil(data.length / cols);

  let svg;
  let dots;
  let dataCols = Math.ceil(Math.sqrt(data.length));
  let selectedCols;
  let selectedRows;



  $: cols = Math.ceil(width / (size+padding));
  $: if(data) {
    rows = Math.ceil(data.length / cols);
  }


  $: colScale = scalePoint()
        .domain(range(cols))
        .range([0, width ])
        .round(true)
        .padding(1);

  $: rowScale = scalePoint()
        .domain(range(rows))
        .range([0, height])
        .round(true)
        .padding(1);

  $: if(data) {
    d3select(dots).selectAll('.dot').data(data)
  }

  function row(i) {
    return Math.floor(i / cols);
  }
  function col(i) {
    if(cols == 1) { return 0 }
    return i % cols;
  }

  onMount(() => {
    d3select(dots).selectAll('.dot').data(data)
  })

</script>

<main class="h-full w-full" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg width={width} height={height} bind:this={svg}>
    <g bind:this={dots}>
    {#each data as d,i}
      <g class="dot" transform="translate({colScale(col(i))},{rowScale(row(i))-size})" data-name="{i}">
      <svelte:component width={size} height={size} this={component} data={d} {...componentProps}/>
      </g>
    {/each}
    </g>
  </svg>
</main>

<style>
</style>

