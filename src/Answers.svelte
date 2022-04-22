<script>
  import { checkData, getResults, getEntry } from "./utils/data.js";
  import { chunkArray } from "./utils";
  import Ribbon from "./Ribbon.svelte";
  import Table from "./TableV2.svelte";
  import Island from "./Island.svelte";
  import ThermometerIcon from "./icons/Thermometer.icon.svelte";
  import { answer, result, islands } from "./stores/game.store";

  import { question, data, otherAnswers, currentTheme } from "./stores/data.store";
  export let columns = [
    { key: "island", name: "Island" },
    { key: "month", name: "Month" },
    { key: "temp", name: "Temperature in °C" },
  ];
  export let showResult = false;

  let highlight;
  let answers = [];
  let w;
  let h;
  $: if ($data) {
    answers = [];
    if ($answer.hasOwnProperty("island")) {
      answers.push($answer);
      highlight = 0;
    }
    answers = answers.concat($otherAnswers);
    result.set(getEntry(answers, $question));
  }
  function getIslands(islandName) {
    return $islands.filter((d) => d.land.properties.name_en === islandName)[0]
  }
  function backgroundClass(islandName) {
    return islandName === $answer.island ? "bg-app-blue-900" : "bg-white"
  }
  function textClass(islandName) {
    if(showResult) {
        if(islandName === $result.island) {
            return "text-green-400"
          }
      }
    return islandName === $answer.island ? "text-white" : "text-app-blue-900"
  }
</script>
<div class="m-auto h-full">
  <!-- TODO: Add sun component -->

  <div class="question-grid mx-auto h-full w-full max-w-5xl items-center">
    <section class="flex items-center justify-center px-7">
      <h2
        class="my-8 bg-transparent text-center font-bamboo text-5xl text-{$currentTheme.text}"
      >
      {#if showResult}
        Result from the Reducer
        {:else}
        Answers from all mappers
        {/if}
      </h2>
    </section>
    {#if answers.length > 0}
      <div class="grid grid-cols-3 gap-6">
        {#each answers as { island, temp }}
          <div class="rounded-xl p-8 {backgroundClass(island)} relative">
            {#if showResult && $result.island === island }
              <Ribbon>Correct Answer</Ribbon>
            {/if}
            <div class="{textClass(island)}" bind:clientWidth={w} bind:clientHeight={h}>
            <svg width={w}>
              <Island width={w} height={h} data={getIslands(island)} water={false} mainColor="currentColor"/>
            </svg>
          </div>
          <div class="mb-6 text-center text-3xl font-sans font-bold {textClass(island)}">
            {island}
          </div>
          <div class="text-center font-sans text-3xl {textClass(island)}">
            {temp} °C
          </div>
        </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
