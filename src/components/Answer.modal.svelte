<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let verifyAnswer;

  let answer;
  let name;

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
  <div
    aria-label="Question"
    role="dialog"
    aria-modal="true"
    class="absolute left-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden"
  >
    <!-- Dark Overlay -->
    <div
      transition:fly={{ duration: 300 }}
      class="fixed inset-0 bg-black/50 transition-opacity"
      aria-hidden="true"
    />

    <div
      class="relative flex w-full max-w-4xl flex-col rounded bg-white py-12 px-4 shadow"
      transition:fly={{ y: -20, duration: 300 }}
    >
      <!-- Close Button -->
      <button
        on:click={handleClose}
        class="absolute top-4 right-5 inline-flex h-6 w-6 items-center justify-center rounded focus:outline-none focus:ring focus:ring-app-blue-900"
      >
        <span class="sr-only">Close</span>
        <svg
          aria-hidden="true"
          class="h-[14px] w-[14px]"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.282706 13.7173C0.659648 14.0942 1.27242 14.0942 1.64936 13.7173L7 8.36666L12.3506 13.7173C12.7276 14.0942 13.3404 14.0942 13.7173 13.7173C14.0942 13.3404 14.0942 12.7276 13.7173 12.3506L8.36666 7L13.7173 1.64936C14.0942 1.27242 14.0942 0.659648 13.7173 0.282706C13.3404 -0.0942354 12.7276 -0.0942354 12.3506 0.282706L7 5.63334L1.64936 0.282706C1.27242 -0.0942354 0.659648 -0.0942354 0.282706 0.282706C-0.0942354 0.659648 -0.0942354 1.27242 0.282706 1.64936L5.63334 7L0.282706 12.3506C-0.0942354 12.7276 -0.0942354 13.3404 0.282706 13.7173Z"
            fill="black"
          />
        </svg>
      </button>

      <h3 class="text-center font-bamboo text-2xl text-app-blue-900">
        The island with the highest temperature in September is ...
      </h3>

      <div class="mx-auto w-full max-w-xl">
        <div>
          <label for="answer" class="sr-only">Answer</label>
          <input
            type="text"
            id="answer"
            name="answer"
            class="mt-5 w-full rounded border border-gray-400 bg-gray-100 px-6 pt-4 pb-3.5 text-2xl text-app-blue-900 focus:outline-none focus:ring focus:ring-app-blue-900"
            bind:value={answer}
            placeholder="Your Answer"
          />
        </div>

        <div class="mt-10">
          <label
            for="name"
            class="text-center font-bamboo text-2xl text-app-blue-900"
            >Your name:</label
          >
          <input
            type="text"
            id="name"
            name="name"
            class="mt-5 w-full rounded border border-gray-400 bg-gray-100 px-6 pt-4 pb-3.5 text-2xl text-app-blue-900 focus:outline-none focus:ring focus:ring-app-blue-900"
            bind:value={name}
            placeholder="Your Name"
          />
        </div>

        {#if wrongAnswerProvided}
          <span class="text-red-400">Wrong answer, please try again.</span>
        {/if}
        <div class="mt-8 flex w-full justify-center pt-2">
          <button
            on:click={handleAnswer}
            class="rounded bg-app-blue-900 px-24 pt-3 pb-3.5 font-bamboo text-2xl text-white transition hover:bg-app-blue-700 focus:outline-none focus:ring focus:ring-app-blue-900 focus:ring-offset-1"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
