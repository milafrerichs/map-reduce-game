<script>
  import {
    currentStep,
    question as questionStore,
    data as dataStore,
    result,
  } from "./stores/game.store";
</script>

<div class="m-auto h-full overflow-y-auto bg-app-teal-500">
  <div class="grid h-screen place-items-center">
    <div class="mx-auto max-w-7xl bg-white p-6">
      <h1>The result after the reduce step is:</h1>
      <p>{$result.island}: {$result.temp}</p>
    </div>
  </div>
</div>
