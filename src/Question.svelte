<script>
  import { createEventDispatcher } from "svelte";
  import { checkAnswer, getEntry } from "./utils/data.js";
  import Table from "./TableV2.svelte";
  import { updateAnswer } from "./stores/game.store";
  import SunComponent from "./Sun.svelte";
  import CloudsAndRainIcon from "./icons/CloudsAndRain.icon.svelte";
  import ThermometerIcon from "./icons/Thermometer.icon.svelte";
  import { next, currentTheme } from "./stores/game.store";
  import { selectedData, question } from "./stores/data.store";
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

<div class="m-auto h-full pb-20">
  <div class="mx-auto h-24 max-w-4xl">
    <SunComponent month={$question.month} colors={["#F7CF52", "#F4581B"]} />
  </div>
  <div class="relative z-20 mx-auto -mt-16 max-w-4xl">
    <div class="question-grid mx-auto h-full w-full items-center">
      <section class="flex items-center justify-center px-7">
        <h2
          class="my-8 bg-transparent text-center font-bamboo text-3xl text-{$currentTheme.text}"
        >
          {$question.text}
        </h2>
      </section>

      <Table {data} classes=" w-full">
        <svelte:fragment slot="headerColumns">
          <th>Island</th>
          <th>Month</th>
          <th>Temperature</th>
        </svelte:fragment>
        <svelte:fragment slot="columns" let:dataAtColumn={row}>
          <td>{row.island}</td>
          <td>{row.month}</td>
          <td>{row.temp}</td>
        </svelte:fragment>
      </Table>
      <button
        on:click={() => (showAnswerDialog = true)}
        class="mt-4 mb-1 justify-self-center rounded border-0 bg-white px-7 pt-4 pb-[1.125rem] font-bamboo text-2xl leading-4 text-app-blue-900 shadow-md transition hover:bg-gray-200 focus:outline-none focus:ring focus:ring-app-blue-900"
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
