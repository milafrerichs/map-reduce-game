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
    padding-top: 24px;
    padding-bottom: 20px;

  }
  tr:not(.header-row) td{
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .table{
    border-spacing: 15px 24px;
  }

  .table tr th {
    text-align: left;
  }
  
</style>
