<script>
  import { onMount } from 'svelte';
  import Data from './Data.svelte';
  import Question from './Question.svelte';
  import Answers from './Answers.svelte';
  import Answer from './Answer.svelte';
  import Step from './Step.svelte';
  import { fade } from 'svelte/transition';
  import { currentStep, greece, islands, question, stepIndex, next, prev, restart } from "./stores/game.store";
  let width;
  let height;

  function animateOnlySelected() {
      onlySelected = true;
  }
  function animateSelected() {
    highlight = true;
  }
  function animateToTable() {
      table = true;
  }

  function handleAnswer(event) {
    setAnswer(event.detail.answer);
    next();
  }

  onMount(() => {
    window.addEventListener('mrGame:next', e => next());
    window.addEventListener('mrGame:prev', e => prev());
    selected = randomFromData(data)
    window.addEventListener("mrGame:restart", (e) => restart());
  })

</script>

<main class="w-full h-screen" bind:clientWidth={width} bind:clientHeight={height} style="background-color: #66A2AD">
  {#if $stepIndex < 4}
  <Data {width} {height} />
  {:else}
    <Question question={$question}/>
  {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
