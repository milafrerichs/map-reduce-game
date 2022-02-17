<script>
  export let data = [];
  export let highlight;
  export let classes = '';
</script>

<div class="bg-[#efebc0] px-8 {classes}">
  <table class="w-full table">
    <tr class="header-row">
      <slot name="headerColumns"/>
    </tr>
    {#each data as row, index}
      <tr class:active={index === highlight} class="">
        <slot name="columns" dataAtColumn={row} {index}/>
      </tr>
    {/each}
  </table>
</div>

<style global>

  .header-row:first-child th{
    padding-top: theme('spacing.6');
    padding-bottom: theme('spacing.5');

  }
  tr:not(.header-row) td{
    padding-top: theme('spacing.1');
    padding-bottom: theme('spacing.1');
  }

  .table{
    border-spacing: theme('spacing.4') theme('spacing.6');
  }

  .table tr th {
    text-align: left;
  }
  
</style>
