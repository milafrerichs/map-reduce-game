<script>
  import { geoPath, geoNaturalEarth1 } from  "d3-geo";
  export let  dataset = {};
  export let height = 200;
  export let width = 200;
  const  projection = geoNaturalEarth1();
  let path = geoPath(projection);
  $: if(dataset !== {}) {
    projection.fitSize([width, height], dataset);
    path = geoPath(projection)
  }
</script>

<svg width=200 height=200>
  <path  d={path(dataset)} />
</svg>
