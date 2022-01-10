<script>
  import { createEventDispatcher  } from 'svelte';
  import { checkData, getEntry } from './utils/data.js';
  import Table from './Table.svelte';
  export let data = [];
  export let question;
    export let columns = [
        {key: 'island', name: 'Island'},
        {key: 'month', name: 'Month'},
        {key: 'temp', name: 'Temperature in °C'},
      ]
  const dispatch = createEventDispatcher();
  let { text } = question;

  let answer;

  function checkAnswer(event) {
      let correct = checkData(data, question, answer)
      dispatch('answer', {
        answer: getEntry(data, question)
      });
  }

</script>
<div class="m-auto max-w-7xl h-full">
  <div class="flex flex-col h-full justify-center items-center">
    <h2 class="text-4xl mb-8 text-center">{text}</h2>
    <Table {data} {columns} />

    <input type="text" bind:value={answer}>
    <button on:click={checkAnswer}>Check Answer</button>

  </div>
</div>
