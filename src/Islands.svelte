<script>
  import { Canvas } from 'svelte-canvas';
  import GeoPath from './GeoPath.svelte';

  export let data = { features: [] }
  export let height;
  export let width;
</script>

<Canvas width={width} height={height}>
  <GeoPath {data} {width} {height}/>
</Canvas>
