<script>
  import { onMount } from "svelte";
  import Circles from "./Circles.svelte";
  import Question from "./Question.svelte";
  import Answers from "./Answers.svelte";
  import Answer from "./Answer.svelte";
  import Step from "./Step.svelte";
  import { initStore } from "./stores/game.store";

  let n = 400;
  let highlight = false;

  const store = initStore({
    stepIndex: 0,
    selected: [],
    restart: true,
  });
  const { previous: prev, next, setAnswer, restart } = store;

  function animateSelected() {
    highlight = true;
  }

  function handleAnswer(event) {
    setAnswer(event.detail.answer);
    next();
  }
  onMount(() => {
    window.addEventListener("mrGame:next", (e) => next());
    window.addEventListener("mrGame:prev", (e) => prev());
    window.addEventListener("mrGame:restart", (e) => restart());
  });
</script>

<main class="w-full h-full">
  {#if $store.stepIndex < 5}
    <Step>
      <Circles {highlight} data={$store.data} />
    </Step>
    {:else if $store.stepIndex === 5}
    <Step>
      <Question on:answer={handleAnswer} question={$store.question} />
    </Step>
    {:else if $store.stepIndex === 6}
    <Step>
      <Answers data={$store.data} question={$store.question} />
    </Step>
    {:else if $store.stepIndex === 7}
    <Step>
      <Answer data={$store.data} question={$store.question} />
    </Step>
  {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
