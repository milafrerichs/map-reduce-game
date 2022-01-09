<script>
  import Circles from './Circles.svelte';
  import Question from './Question.svelte';
  import Answers from './Answers.svelte';
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
 
</script>

<style global lang="postcss">
    @tailwind base;
      @tailwind components;
        @tailwind utilities;
</style>



<main class="w-full h-full">
  {#if stepIndex < 5}
  <div transition:fade class="absolute top-0 w-full h-full">
    <Circles {highlight} {data} {selected} {step} />
  </div>
  {:else if stepIndex === 5}
    <div transition:fade class="absolute top-0 w-full h-full">
      <Question on:answer={handleAnswer} data={selected} {question}/>
    </div>
  {:else}
    <div transition:fade class="absolute top-0 w-full h-full">
      <Answers {data} {answer} {question}/>
    </div>
  {/if}
  <div class="absolute bottom-0">
  <button on:click={prev} >Prev</button>
  <button on:click={next} >Next</button>
    </div>
</main>
