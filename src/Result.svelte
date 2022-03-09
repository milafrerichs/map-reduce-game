<script>
  import { currentStep, question as questionStore, data as dataStore, result } from "./stores/game.store";
</script>
<div class="m-auto h-full bg-app-teal-500 overflow-y-auto">

  <div class="grid place-items-center h-screen">
    <div class="bg-white p-6 mx-auto max-w-7xl">
      <h1>The result after the reduce step is:</h1>
      <p>{$result.island}: {$result.temp}</p>
  </div>
  </div>
</div>
