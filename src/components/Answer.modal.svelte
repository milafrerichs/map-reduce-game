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
    dispatch("answer", answer);
  }

  function handleClose() {
    dispatch("close");
  }
</script>

<template>
  <div class="wrapper">
    <div
      class="content bg-app-teal-500 rounded-sm shadow-sm p-4"
      transition:fly={{ y: -20, duration: 300 }}
    >
      <span>Please type in your answer</span>

      <input
        type="text"
        class="p-1 rounded-sm w-full pt-2 bg-white border-2"
        bind:value={answer}
        placeholder="Your answer"
      />
      {#if wrongAnswerProvided}
        <span class="text-red-400">Wrong answer, please try again.</span>
      {/if}
      <div class="flex justify-between  w-full pt-2">
        <button
          on:click={handleClose}
          class="justify-self-end text-black font-semibold text-sm border-0 px-3 hover:bg-app-teal-400 py-1 rounded-none"
        >
          Cancel
        </button>
        <button
          on:click={handleAnswer}
          class="justify-self-end text-black font-semibold text-sm border-0 px-3 hover:bg-app-teal-300 bg-app-teal-400 py-1 rounded-none"
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
