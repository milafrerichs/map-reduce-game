<script>
  import { getResults } from "./utils/data.js";
  import Table from "./Table.svelte";

  export let data = [];
  export let answer = {};
  export let question = {};
  export let columns = [
    { key: "island", name: "Island" },
    { key: "month", name: "Month" },
    { key: "temp", name: "Temperature in °C" },
  ];
  let answers = [];

  $: if (data) {
    answers = getResults(data, question);
  }

  function handleClick() {
    window.dispatchEvent(new CustomEvent(`mrGame:restart`, { bubbles: true }));
  }
</script>

<div class="m-auto h-full max-w-7xl">
  <h3 class="mb-4 text-2xl">{question.text}</h3>
  {#if answers.length > 0}
    <Table data={answers} {columns} />
  {/if}
  <button on:click={handleClick}>Restart</button>
</div>
