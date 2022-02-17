<script>
  import { geoPath, geoEqualEarth } from  "d3-geo";
  export let data = {};
  export let height = 50;
  export let width = 50;
  export let padding = 10;
  const  projection = geoEqualEarth().center([19.57, 34.88]).scale(300);
  let path = geoPath(projection);
  $: if(data !== {}) {
    projection.fitSize([width-padding, height-2*padding], data);
  }

</script>

<g transform="translate(0, {padding})">
  <path stroke-width=1 d={path(data)} fill="#efebc0" stroke="#efebc0" style=" fill-rule: evenodd"/>
</g>
