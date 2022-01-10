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
    answers = getResults(data, question)
  }
</script>
<div class="m-auto max-w-7xl h-full">
    <h3 class="text-2xl mb-4">{question.text}</h3>
  <Table data={answers} {columns} />
</div>
