<script>
  import { createEventDispatcher } from "svelte";
  import { checkData, getEntry } from "./utils/data.js";
  import Table from "./Table.svelte";
  import { store } from "./stores/game.store";

  export let question;
  export let columns = [
    { key: "island", name: "Island" },
    { key: "month", name: "Month" },
    { key: "temp", name: "Temperature in °C" },
  ];
  const dispatch = createEventDispatcher();
  let { text } = question;
  $: data = $store.selected;

  let answer;

  function checkAnswer(event) {
    let correct = checkData(data, question, answer);
    dispatch("answer", {
      answer: getEntry(data, question),
    });
  }
</script>

<div class="m-auto max-w-7xl h-full">
  <div class="h-full justify-center items-center">
    <h2 class="text-4xl mt-8 mb-16 text-center">{text}</h2>
    <Table {data} {columns} />

    <div class="p-4 border flex flex-col mt-8 max-w-xl">
      <input type="text" bind:value={answer} />
      <button on:click={checkAnswer} class="mt-4">Check Answer</button>
    </div>
  </div>
</div>
