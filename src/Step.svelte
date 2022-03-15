<script>
  import { fade } from "svelte/transition";
</script>

<div
  transition:fade
  class="absolute top-0 h-full w-full"
  style="background: #66A2AD"
>
  <slot />
</div>
