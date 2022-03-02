<script>
  import { selectedData } from "./stores/game.store";
  export let radius = 5;
  export let color = "#efebc0"
  export let data = {};
  export let selectedColor = "red";
  export let highlightSelected = false;

  let fill = color;

  $: isSelected = highlightSelected && $selectedData.includes(data)
  $: fill = isSelected ? selectedColor : color;
</script>
<circle r="{radius}" fill="{fill}"/>
