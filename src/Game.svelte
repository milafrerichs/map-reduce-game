<script>
  import { onMount } from "svelte";
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

  function backgroundGradien() {

      return 
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
    background: linear-gradient(-45deg, #0597AD, #004567, #0597AD, #004567, #0597AD, #004567,#0597AD, #004567);
    background-size: 400% 400%;
    animation: gradient 15s ease-in-out infinite;
    height: 100vh;
  }
  :global(.autum) {
    background: rgb(217,221,228);
    background: linear-gradient(180deg, rgba(217,221,228,1) 0%, rgba(243,199,181,1) 43%, rgba(251,181,147,1) 100%);
  }
  :global(.summer) {
    background: linear-gradient(180deg, #BD8CD0 0%, #F19183 48.93%, #FFC975 100%);
  }
  :global(.winter) {
    background: linear-gradient(180deg, #3956A4 0%, #587BBA 48.93%, #7990C1 100%);
  }
  :global(.spring) {
    background: linear-gradient(180deg, #BCDAFC 0%, #A1CFF3 48.93%, #68ACE1 100%);
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
