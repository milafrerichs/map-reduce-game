<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let verifyAnswer;

  let answer;
  let wrongAnswerProvided = false;
  const dispatch = createEventDispatcher();

  function handleAnswer() {
    const correctAnswer = verifyAnswer(answer);
    if (!correctAnswer) {
      wrongAnswerProvided = true;
    }
    dispatch("answer", correctAnswer);
  }

  function handleClose() {
    dispatch("close");
  }
</script>

<template>
  <div class="wrapper">
    <div
      class="content rounded-sm bg-app-teal-500 p-4 shadow-sm"
      transition:fly={{ y: -20, duration: 300 }}
    >
      <span>Please type in your answer</span>

      <input
        type="text"
        class="w-full rounded-sm border-2 bg-white p-1 pt-2"
        bind:value={answer}
        placeholder="Your answer"
      />
      {#if wrongAnswerProvided}
        <span class="text-red-400">Wrong answer, please try again.</span>
      {/if}
      <div class="flex w-full  justify-between pt-2">
        <button
          on:click={handleClose}
          class="justify-self-end rounded-none border-0 px-3 py-1 text-sm font-semibold text-black hover:bg-app-teal-400"
        >
          Cancel
        </button>
        <button
          on:click={handleAnswer}
          class="justify-self-end rounded-none border-0 bg-app-teal-400 px-3 py-1 text-sm font-semibold text-black hover:bg-app-teal-300"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    max-height: 300px;
    max-width: 600px;
    min-width: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
</style>
