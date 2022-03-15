<script>
  export let data = [];
  export let columns = [];
  export let highlight;
</script>

<div class="">
  <table>
    <tr>
      {#each columns as column}
        <th>{column.name} </th>{/each}
    </tr>
    {#each data as row, index}
      <tr class:active={index === highlight}>
        {#each columns as column}
          <td>{row[column.key]} {column.extra || ""}</td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
