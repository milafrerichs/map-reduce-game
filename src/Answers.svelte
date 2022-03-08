<script>
  import { checkData, getResults } from './utils/data.js';
  import { chunkArray } from './utils'
  import Table from './TableV2.svelte';
  import ThermometerIcon from "./icons/Thermometer.icon.svelte";
  import { data, answer, question } from "./stores/game.store";

    export let columns = [
        {key: 'island', name: 'Island'},
        {key: 'month', name: 'Month'},
        {key: 'temp', name: 'Temperature in °C'},
      ]
  let answers = [];

  $: if($data) {
    answers.push($answer)
    let chunkData = chunkArray($data, 400)
    answers = chunkData.map((d) => getResults(d, $question)[0])
    answers.filter((d) => !d)
  }
</script>
<div class="m-auto max-w-7xl h-full">
    <div
      class="h-full w-full items-center question-grid mx-auto bg-app-teal-500"
    >
      <section
        class="bg-white flex items-center justify-center px-7 border border-question-heading border-b-0 border-opacity-5"
      >
        <h2 class="text-xl my-8 text-center">Answers from all mappers</h2>
      </section>
  {#if answers.length > 0}
    <Table data={answers}
        classes="border w-full border-question-heading border-opacity-5"
      >
        <svelte:fragment slot="headerColumns">
          <th>Island</th>
          <th>Month</th>
          <th><ThermometerIcon classes="h-6" /></th>
        </svelte:fragment>
        <svelte:fragment slot="columns" let:dataAtColumn={row}>
          <td>{row.island}</td>
          <td>{row.month}</td>
          <td>{row.temp}</td>
        </svelte:fragment>
      </Table>
  {/if}
</div>
</div>
