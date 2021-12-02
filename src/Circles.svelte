<script>
  import { fade  } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { scaleLinear, scaleBand, scalePoint, scaleOrdinal } from 'd3-scale';
  import { range } from 'd3-array';
  import { select as d3select, selectAll } from 'd3-selection';
  import { transition } from 'd3-transition';
  export let data = [];
  export let selected = []
  export let onlySelected = false;
  export let oneCol = false;
  export let table = false;
  export let step;

  let svg;
  let dots;
  let size = 10;
  let padding = 10;
  let width = 1200;
  let height = 800;
  let dataCols = Math.ceil(Math.sqrt(data.length));
    let selectedCols;
    let selectedRows;


  $: cols = step === "oneCol" || step === "table" ? 1 : width / (size+padding);
  $: rows = step === "oneCol" || step === "table" ? selectedRows : dataRows;
  $: selectedRows = Math.ceil(selected.length / cols);
  $: dataRows = Math.ceil(data.length / cols);

  $: if(step === "oneRow" || step === "oneCol") {
    const t = d3select(dots).transition().duration(300);
    d3select(dots).selectAll('.dot')
        .data(selected, (d) => {
            return d && d.id;
          })
        .join(
            enter => {
            enter.append('circle')
            .call(enter => enter.transition().delay((d) => 7)
                .attr('transform', (d,i) => {
                    return `translate(${colScale(col(i))},${rowScale(row(i))})`
                  }))
              },
            update => update
            .call(enter => enter.transition(t)
                .attr('transform', (d,i) => {
                    return `translate(${colScale(col(i))},${rowScale(row(i))})`
                  })),
            exit => exit
            .call(enter => enter.transition(t).delay((d) => 7)
                .attr('transform', (d) => "translate(0,0)")
                .remove())
          )
  }

  $: if(step === "table") {
    const t = d3select(dots).transition().duration(300);
    d3select(dots).selectAll('.dot')
        .data(selected, (d) => {
            return d && d.id;
          })
        .join(
            enter => {
            enter.append('circle')
            .call(enter => enter.transition().delay((d) => 7)
                .attr('cx', (d) => +colSelectedScale(d.id))
                .attr('cy', (d) => +rowSelectedScale(d.id)))
              },
            update => update
            .call(enter => {
                enter.transition(t)
                .attr('transform', (d,i) => {
                  return `translate(${colScale(col(i))},${rowScale(row(i))})`
                })
                enter.selectAll('circle').remove()
                enter.append('text').text((d) => `${d.island}, ${d.temp}°C`)

              }),
            exit => exit
            .call(enter => enter.transition(t).delay((d) => 7)
                .attr('transform', (d) => "translate(0,0)")
                .remove())
          )
  }

  $: colScale = scalePoint()
        .domain(range(cols))
        .range([0, width ])
        .padding(1);

  $: rowScale = scalePoint()
        .domain(range(rows))
        .range([0, height])
        .padding(1);

  $: if(data) {
    d3select(dots).selectAll('.dot').data(data) //, (d) => d.id)
  }

  function row(i) {
    return Math.floor(i / cols);
  }
  function col(i) {
    if(cols == 1) { return 0 }
    return i % cols;
  }

  function animateSelected() {
    selectAll('g circle').data(data).attr('fill', (d,i) => { 
      return 
    })
  }

  onMount(() => {
    d3select(dots).selectAll('.dot').data(data) //, (d) => d.id)
  })


</script>

<main>
  <svg width={width} height={height} bind:this={svg}>
    <g bind:this={dots}>
    {#each data as d,i}
      <g class="dot" transform="translate({colScale(col(i))},{rowScale(row(i))})">
      {#if selected.some(e => e.id === d.id) }
          <circle  transition:fade="{{duration: 200}}" r="5" fill="red"/>
        {:else}
          <circle  transition:fade r="5" fill="gray"/>
        {/if}
      </g>
    {/each}
    </g>
  </svg>
</main>

<style>
</style>

