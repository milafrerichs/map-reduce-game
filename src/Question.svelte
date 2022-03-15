<script>
  import { createEventDispatcher } from "svelte";
  import { checkAnswer, getEntry } from "./utils/data.js";
  import Table from "./TableV2.svelte";
  import { updateAnswer } from "./stores/game.store";
  import SunComponent from "./Sun.svelte";
  import CloudsAndRainIcon from "./icons/CloudsAndRain.icon.svelte";
  import ThermometerIcon from "./icons/Thermometer.icon.svelte";
  import { selectedData, question, next } from "./stores/game.store";
  import AnswerModal from "./components/Answer.modal.svelte";

  const dispatch = createEventDispatcher();

  $: data = $selectedData;

  let showAnswerDialog = false;

  function verifyAnswer(answer) {
    return checkAnswer(data, $question, answer);
  }

  function nextStep(correctAnswer) {
    if (correctAnswer) {
      updateAnswer(getEntry(data, $question));
      showAnswerDialog = false;
      dispatch("mr:correctAnswer", {
        text: correctAnswer,
      });
    }
  }
</script>

<div class="m-auto h-full overflow-y-auto bg-app-teal-500">
  <div class="mx-auto h-24 max-w-7xl">
    <SunComponent month={$question.month} colors={["#F7CF52", "#F4581B"]} />
  </div>
  <div class="mx-auto max-w-7xl overflow-y-auto">
    <div
      class="question-grid mx-auto h-full w-full items-center bg-app-teal-500"
    >
      <section
        class="flex items-center justify-center border border-b-0 border-question-heading border-opacity-5 bg-white px-7"
      >
        <h2 class="my-8 text-center text-xl">{$question.text}</h2>
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
        on:click={() => (showAnswerDialog = true)}
        class="justify-self-end rounded-none border-0 bg-app-teal-400 px-3 py-1 text-sm font-semibold text-black hover:bg-app-teal-300"
      >
        Provide your answer
      </button>
    </div>
  </div>
</div>

{#if showAnswerDialog}
  <AnswerModal
    {verifyAnswer}
    on:answer={nextStep}
    on:close={() => (showAnswerDialog = false)}
  />
{/if}

<style>
  .question-grid {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: min-content max-content min-content;
    align-content: flex-start;
  }
</style>
