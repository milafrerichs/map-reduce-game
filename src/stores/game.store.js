import { readable, writable, derived, get } from "svelte/store";
import { feature } from "topojson";
import { json } from "d3-fetch";

import { randomSelectedFromData, randomFromData, seasons } from "../utils";
import { getResults } from "../utils/data.js";

export const stepIndex = writable(0);
export const greece = writable([]);
export const islands = writable([]);
export const answer = writable("");
export const result = writable({});
export const settings = writable({
  answerDataSize: 16,
  groups: 16,
});
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
}
setup();

export const currentStep = derived(
  [steps, stepIndex],
  ([$steps, $stepIndex]) => $steps[$stepIndex]
);

export const next = function () {
  stepIndex.update((n) => n + 1);
};
export const prev = function () {
  if (get(stepIndex) < 1) return;
  stepIndex.update((n) => n - 1);
};
export const restart = function () {
  reset();
};

export function updateAnswer(data) {
  answer.set(data);
}
