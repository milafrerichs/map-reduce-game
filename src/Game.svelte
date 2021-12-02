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

<main>
  {#if stepIndex < 5}
  <div transition:fade>
    <Circles {highlight} {data} {selected} {step} />
  </div>
  {:else if stepIndex === 5}
    <div transition:fade>
      <Question on:answer={handleAnswer} data={selected} {question}/>
    </div>
  {:else}
    <Answers {data} {answer} {question}/>
  {/if}
  <button on:click={prev} >Prev</button>
  <button on:click={next} >Next</button>
</main>

<style>
</style>
