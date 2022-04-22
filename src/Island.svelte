<script>
  import { geoPath, geoEqualEarth } from "d3-geo";
  export let data = {};
  export let height = 50;
  export let width = 50;
  export let padding = 10;
  export let mainColor = "#efebc0";
  export let water = true;
  const projection = geoEqualEarth().center([19.57, 34.88]).scale(300);
  let path = geoPath(projection);
  $: outerPath = water ? "deep_water": "land";
  $: if (data !== {} && width && height) {
    projection.fitSize(
      [width - padding, height - 2 * padding],
      data[outerPath]
    );
    path = geoPath(projection);
  }
</script>

<g transform="translate(0, {padding})">
  {#if water}
    <path
      stroke-width="1"
      fill="#8AB7BA"
      stroke="#8AB7BA"
      d={path(data.deep_water)}
      style="opacity:0.5; fill-rule: evenodd"
    />
    <path
      stroke-width="1"
      d={path(data.shallow_water)}
      fill="#C0CFC8"
      stroke="#C0CFC8"
      style="opacity:0.4; fill-rule: evenodd"
    />
  {/if}
  <path
    stroke-width="2"
    d={path(data.land)}
    fill="{mainColor}"
    stroke="{mainColor}"
    style=" fill-rule: evenodd"
  />
</g>
