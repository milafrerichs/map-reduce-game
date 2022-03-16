import { readable, writable, derived, get } from "svelte/store";
import { feature } from "topojson";
import { json } from "d3-fetch";

import { randomSelectedFromData, randomFromData } from "../utils";

export const stepIndex = writable(0);
export const data = writable([]);
export const greece = writable([]);
export const islands = writable([]);
export const selectedData = writable([]);
export const groupedData = writable([]);
export const question = writable({});
export const answer = writable("");
export const result = writable({});
export const settings = writable({});
export const steps = readable([
  "greece",
  "islands",
  "dots",
  "dots-selected",
  "table",
  "answers",
  "result",
]);

function getGeoData() {
  let dataset = { features: [] };
  json("islands-simplified.json").then((data) => {
    let geojson = feature(data, data.objects.land);
    greece.set([geojson]);
  });
  json("islands.json").then((data) => {
    let land = feature(data, data.objects.land);
    let shallow_water = feature(data, data.objects.shallow_water);
    let deep_water = feature(data, data.objects.deep_water);
    islands.set(
      land.features.map((d, i) => {
        return {
          land: d,
          shallow_water: shallow_water.features[i],
          deep_water: deep_water.features[i],
        };
      })
    );
  });
}

function setup() {
  reset();
  getGeoData();
}

function reset() {
  stepIndex.set(0);
  selectedData.set([]);
}
setup();

export const questionData = derived([data, question], ([$data, $question]) => $data.filter($question.filter))

export const currentStep = derived(
  [steps, stepIndex],
  ([$steps, $stepIndex]) => $steps[$stepIndex]
);

export const next = function () {
  stepIndex.update((n) => n + 1);
  if (get(stepIndex) == 1) {
    let sett = get(settings);
    const selected = randomSelectedFromData(get(data), get(questionData), sett.answerDataSize);
    const groups = randomFromData(get(data), get(questionData), selected, 16);
    selectedData.set(selected);
    groupedData.set(groups);
  }
};
export const prev = function () {
  if (get(stepIndex) < 1) return;
  stepIndex.update((n) => n - 1);
  if (get(stepIndex) == 0) {
    selectedData.set([]);
  }
};
export const restart = function () {
  selectedData.set([]);
  setup();
};

export function updateAnswer(data) {
  answer.set(data);
}
