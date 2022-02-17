<script>
  import { geoPath, geoEqualEarth } from  "d3-geo";
  import { Layer  } from 'svelte-canvas';
  export let data = {};
  export let height = 50;
  export let width = 50;
  export let padding = 10;
  export let x = 0;
  export let y = 0;
  const  projection = geoEqualEarth().center([19.57, 34.88]).scale(300);
  let path = geoPath(projection);
  $: if(data !== {}) {
    projection.fitSize([width-padding, height-2*padding], data);
  }
    $: render = ({ context  }) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x,y);
            context.fillStyle = "#efebc0";
        context.strokeStyle = '#efebc0';
            context.beginPath();
            path.context(context)(data);
            context.fill();

            context.beginPath();
            path.context(context)(data);
            context.stroke();
      };
</script>

<Layer {render} />

