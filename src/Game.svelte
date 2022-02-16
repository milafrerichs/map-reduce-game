<script>
  import { onMount } from 'svelte';
  import {json} from "d3-fetch";
  import { feature } from 'topojson';
  import Circles from './Circles.svelte';
  import Dot from './Dot.svelte';
  import CanvasDot from './CanvasDot.svelte';
  import Grid from './Grid.svelte';
  import CanvasGrid from './CanvasGrid.svelte';
  import Question from './Question.svelte';
  import Answers from './Answers.svelte';
  import Answer from './Answer.svelte';
  import Islands from './Islands.svelte';
  import Island from './Island.svelte';
  import Step from './Step.svelte';
  import GeoPath from './GeoPath.svelte';
  import { fade } from 'svelte/transition';
  import { initStore } from "./stores/game.store";
  import { randomFromData, chunkArray } from './utils'
  export let data = [];
  export let question;
  let n = 400;
  let selected = []
  let steps = ["greece", "islands", "dots", "dots-selected", "oneRow", "oneCol", "table"]
  let stepIndex = 0;
  let highlight = false;
  let onlySelected = false;
  let oneCol = false;
  let table = false;
  let answer;
  let size = 200;
  let padding = 20;

  let showgrid = false;
  let activeComponent = Island;
  let activeComponentC = GeoPath;
  let activeData = [];
  let activeProps = { }

  const store = initStore({
    stepIndex: 0,
    selected: [],
    restart: true,
  });
  const { previous: prev, next, setAnswer, restart  } = store;

  let dataset = { features: [] }
    json(
        "islands-simplified.json"
      ).then((data) => {
          let geojson = feature(data, data.objects.land)
          dataset = geojson
        });
    json(
        "islands.json"
      ).then((data) => {
          let land = feature(data, data.objects.land)
          let shallow_water = feature(data, data.objects.shallow_water)
          let deep_water = feature(data, data.objects.deep_water)
          activeData = land.features.map((d, i) => {
              return {
                  land: d,
                  shallow_water: shallow_water.features[i],
                  deep_water: deep_water.features[i],
                }
          })
        });

  $: showgrid = $store.stepIndex >= steps.indexOf("islands") && $store.stepIndex < 6;

  function animateOnlySelected() {
      onlySelected = true;
  }
  $: if($store.stepIndex === 2) {
      activeData = $store.data;
      size = 10;
      padding = 10;
      selected = [];
      activeProps = { radius: 5, color: "#efebc0" }
      activeComponent = Dot;
      activeComponentC = CanvasDot;
    }
    else if($store.stepIndex === 3) {
      activeData = $store.selected;
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

<main class="w-full h-full" style="background-color: #66A2AD">
  {#if $store.stepIndex === 0}
    <Islands data={dataset} width={1600} height={800} />
  {:else if showgrid}
    <Step>
      <Grid component={activeComponent} componentProps={activeProps} data={activeData} {size} {padding} />
    </Step>
    <!-- <Circles {highlight} {data} {selected} {step} />-->
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
