<script>
  import { geoPath, geoEqualEarth } from "d3-geo";
  export let data = {};
  export let height = 50;
  export let width = 50;
  export let padding = 10;
  const projection = geoEqualEarth().center([19.57, 34.88]).scale(300);
  let path = geoPath(projection);
  $: if (data !== {}) {
    projection.fitSize(
      [width - padding, height - 2 * padding],
      data.deep_water
    );
  }
</script>

<g transform="translate(0, {padding})">
  <path
    stroke-width="1"
    d={path(data.deep_water)}
    fill="#8AB7BA"
    stroke="#8AB7BA"
    style="opacity:0.5; fill-rule: evenodd"
  />
  <path
    stroke-width="1"
    d={path(data.shallow_water)}
    fill="#C0CFC8"
    stroke="#C0CFC8"
    style="opacity:0.4; fill-rule: evenodd"
  />
  <path
    stroke-width="2"
    d={path(data.land)}
    fill="#efebc0"
    stroke="#efebc0"
    style=" fill-rule: evenodd"
  />
</g>
