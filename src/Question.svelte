<script>
  import { createEventDispatcher } from "svelte";
  import { checkData, getEntry } from "./utils/data.js";
  import Table from "./TableV2.svelte";
  import SunIcon from "./icons/Sun.icon.svelte";
  import SunComponent from "./Sun.svelte";
  import CloudsAndRainIcon from "./icons/CloudsAndRain.icon.svelte";
  import ThermometerIcon from "./icons/Thermometer.icon.svelte";

  export let data = [];
  import { store } from "./stores/game.store";

  export let question;

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

<div class="m-auto h-full bg-app-teal-500 overflow-y-auto">
  <div class="max-w-7xl mx-auto overflow-y-auto">
    <SunComponent
      month="April"
      colors={["#F7CF52", "#F4581B"]}
    />
    <div
      class="h-full w-full items-center question-grid mx-auto bg-app-teal-500"
    >
      <section
        class="bg-white flex items-center justify-center px-7 border border-question-heading border-b-0 border-opacity-5"
      >
        <h2 class="text-xl my-8 text-center">{text}</h2>
      </section>

      <Table
        {data}
        classes="border w-full border-question-heading border-opacity-5"
      >
        <svelte:fragment slot="headerColumns">
          <th>Island</th>
          <th>Month</th>
          <th><ThermometerIcon classes="h-6" /></th>
          <th><CloudsAndRainIcon classes="h-6" /></th>
        </svelte:fragment>
        <svelte:fragment slot="columns" let:dataAtColumn={row}>
          <td>{row.island}</td>
          <td>{row.month}</td>
          <td>{row.temp}</td>
          <td>200</td>
        </svelte:fragment>
      </Table>

      <button
        class="justify-self-end text-black font-semibold text-sm border-0 px-3 hover:bg-app-teal-300 bg-app-teal-400 py-1 rounded-none"
      >
        Provide your answer
      </button>
    </div>
  </div>
</div>

<style>
  .question-grid {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: min-content max-content min-content;
    align-content: flex-start;
  }
</style>
