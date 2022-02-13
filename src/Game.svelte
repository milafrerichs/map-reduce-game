<script>
  import { onMount } from 'svelte';
  import Circles from './Circles.svelte';
  import Question from './Question.svelte';
  import Answers from './Answers.svelte';
  import Answer from './Answer.svelte';
  import Step from './Step.svelte';
  import { fade } from 'svelte/transition';
  import { randomFromData, chunkArray } from './utils'
  export let data = [];
  export let question;
  let n = 400;
  let selected = []
  let steps = ["all", "selected", "oneRow", "oneCol", "table"]
  let stepIndex = 0;
  let highlight = false;
  let onlySelected = false;
  let oneCol = false;
  let table = false;
  let answer;


  $: step = steps[stepIndex];
  function animateSelected() {
    highlight = true;
  }
  function animateOnlySelected() {
      onlySelected = true;
  }
  function prev() {
    stepIndex--;
    if(stepIndex < 1) {
      stepIndex = 0;
      selected = [];
    }
  }
  function next() {
    stepIndex++;
    if(stepIndex === 1) {
      selected = [];
      selected = randomFromData(data)
    }
    if(stepIndex === 6) {
    }
  }
  function animateToTable() {
      table = true;
  }
  function handleAnswer(event) {
    answer = event.detail.answer;
    next()
  }
  onMount(() => {
    window.addEventListener('mrGame:next', e => next());
    window.addEventListener('mrGame:prev', e => prev());
  })
</script>

<style global lang="postcss">
    @tailwind base;
      @tailwind components;
        @tailwind utilities;
</style>



<main class="w-full h-full">
  {#if stepIndex < 5}
    <Step>
      <Circles {highlight} {data} {selected} {step} />
    </Step>
  {:else if stepIndex === 5}
    <Step>
      <Question on:answer={handleAnswer} data={selected} {question}/>
    </Step>
  {:else if stepIndex === 6}
    <Step>
      <Answers {data} {answer} {question}/>
    </Step>
  {:else if stepIndex === 7}
    <Step>
      <Answer {data} {answer} {question}/>
    </Step>    
  {/if}
</main>
