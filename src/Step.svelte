<script>
  import { fade } from 'svelte/transition';
</script>
<div transition:fade class="absolute top-0 w-full h-full" style="background: #22699C
">
  <slot></slot>
</div>
