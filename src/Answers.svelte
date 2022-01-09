<script>
  import { checkData, getResults } from './utils/data.js';
  import { chunkArray } from './utils'
  import Table from './Table.svelte';

  export let data = []
  export let answer = {};
  export let question = {}
    export let columns = [
        {key: 'island', name: 'Island'},
        {key: 'month', name: 'Month'},
        {key: 'temp', name: 'Temperature in °C'},
      ]
  let answers = [];

  $: if(data) {
    let chunkData = chunkArray(data, 100)
    answers = chunkData.map((d) => getResults(d, question)[0])
    answers.filter((d) => !d)
    answers.push(answer)
  }
</script>
<div class="m-auto max-w-7xl h-full">
    <h2 class="text-4xl mb-8 text-center">Here are all the answers from the other mappers</h2>
  <Table data={answers} {columns} />
</div>
