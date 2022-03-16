<script>
  import { onMount } from "svelte";
  import Data from "./Data.svelte";
  import Question from "./Question.svelte";
  import Answers from "./Answers.svelte";
  import Result from "./Result.svelte";
  import Step from "./Step.svelte";
  import { fade } from "svelte/transition";
  import {
    currentStep,
    greece,
    islands,
    question as questionStore,
    data as dataStore,
    settings as gameSettings,
    stepIndex,
    next,
    prev,
    restart,
    currentSeason,
  } from "./stores/game.store";
  let width;
  let height;
  export let question;
  export let data;
  export let settings;

  function animateOnlySelected() {
    onlySelected = true;
  }
  function animateSelected() {
    highlight = true;
  }
  function animateToTable() {
    table = true;
  }

  $: if (question) {
    questionStore.set(question);
  }

  $: if (data) {
    dataStore.set(data);
  }

  $: if (settings) {
    gameSettings.set(settings);
  }

  onMount(() => {
    window.addEventListener("mrGame:next", (e) => next());
    window.addEventListener("mrGame:prev", (e) => prev());
    window.addEventListener("mrGame:restart", (e) => restart());
  });
</script>

<main
  class="h-screen w-full font-sans {$stepIndex < 4 ? 'ocean' : `${$currentSeason}-gradient`}"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  {#if $stepIndex < 4}
    <Data {width} {height} />
  {:else if $stepIndex === 4}
    <Question />
  {:else if $stepIndex === 5}
    <Answers />
  {:else}
    <Result />
  {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
