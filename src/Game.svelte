<script>
  import { onMount, onDestroy } from "svelte";
  import Data from "./Data.svelte";
  import Waves from "./Waves.svelte";
  import Question from "./Question.svelte";
  import Answers from "./Answers.svelte";
  import Result from "./Result.svelte";
  import Step from "./Step.svelte";
  import { fade } from "svelte/transition";
  import {
    currentStep,
    greece,
    islands,
    settings as gameSettings,
    stepIndex,
    next,
    prev,
    restart,
    currentSeason,
  } from "./stores/game.store";
  import {
    question as questionStore,
    data as dataStore,
  } from "./stores/data.store";
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

  function handleNext() {
    next();
  }
  function handlePrev() {
    prev();
  }
  function handleRestart() {
    restart();
  }

  onMount(() => {
    window.addEventListener("mrGame:next", handleNext, false);
    window.addEventListener("mrGame:prev", handlePrev, false);
    window.addEventListener("mrGame:restart", handleRestart, false);
  });
  onDestroy(() => {
    window.removeEventListener("mrGame:next", handleNext);
    window.removeEventListener("mrGame:prev", handlePrev);
  });
</script>

<main
  class="h-screen w-full font-sans {$stepIndex < 4
    ? 'ocean'
    : `bg-gradient-${$currentSeason}`}"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  {#if $stepIndex < 4}
    <Data {width} {height} />
  {:else if $stepIndex === 4}
    <Question />
    <Waves />
  {:else if $stepIndex === 5}
    <Answers />
    <Waves />
  {:else}
    <Result />
  {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  :global(.ocean) {
    background: linear-gradient(
      -45deg,
      #0597ad,
      #004567,
      #0597ad,
      #004567,
      #0597ad,
      #004567,
      #0597ad,
      #004567
    );
    background-size: 400% 400%;
    animation: gradient 35s ease-in-out infinite;
    height: 100vh;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
