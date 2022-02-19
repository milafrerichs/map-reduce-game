import { readable, writable, derived, get } from 'svelte/store'
import { feature } from 'topojson';
import { json } from "d3-fetch";

import { randomFromData } from "../utils";

export const stepIndex = writable(0);
export const data = writable([]);
export const greece = writable([]);
export const islands = writable([]);
export const selectedData = writable([]);
export const question = writable({});
export const answer = writable("");
export const steps = readable(["greece", "islands", "dots", "dots-selected", "oneRow", "oneCol", "table"]);


function generateData() {
  let data = [];
  let islands = ["Crete", "Evia", "Lesbos", "Rhodes", "Chíos", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thassos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothrace", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis"];
  let temps = Array.from({ length: 34 - 15 + 1 }, (_, i) => i + 15)
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let columns = [{ name: "temperature", column: "temp" }]
  let types = [{ name: "highest", method: Math.max }]
  let randomMonthIndex = Math.random() * monthNames.length | 0;
  let randomMonth = monthNames[randomMonthIndex]
  for (let i = 0; i < 6000; i++) {
    let randomIndexIsland = Math.random() * islands.length | 0;
    let randomIndexTemps = Math.random() * temps.length | 0;
    let monthIndex = Math.random() * monthNames.length | 0;
    data = data.concat({ id: i, month: monthNames[monthIndex], temp: temps[randomIndexTemps], island: islands[randomIndexIsland] });
  }
  let question = {
    column: columns[0].column,
    filter: (d) => { return d.month === randomMonth },
    typeFunction: types[0].method,
    text: `Which Island has the ${types[0].name} ${columns[0].name} in ${randomMonth}`,
    month: randomMonth
  }
  return { data, question };
}

function getGeoData() {
  let dataset = { features: [] }
  json(
    "islands-simplified.json"
  ).then((data) => {
    let geojson = feature(data, data.objects.land)
    greece.set([geojson])
  });
  json(
    "islands.json"
  ).then((data) => {
    let land = feature(data, data.objects.land)
    let shallow_water = feature(data, data.objects.shallow_water)
    let deep_water = feature(data, data.objects.deep_water)
    islands.set(land.features.map((d, i) => {
      return {
        land: d,
        shallow_water: shallow_water.features[i],
        deep_water: deep_water.features[i],
      }
    }))
  });
}

function reinitializeStore(state) {
  const { data, question } = generateData();
  return { restart: true, selected: [], stepIndex: 0, data, question }
}

function setup() {
  reset();
  getGeoData();
}

function reset() {
  //const { d: data, q: question } = generateData();
  const result = generateData();
  data.set(result.data)
  question.set(result.question)
}
setup()

export const currentStep = derived([steps, stepIndex], ([$steps, $stepIndex]) => $steps[$stepIndex])

export const next = function () {
  stepIndex.update(n => n + 1);
  if (get(stepIndex) == 1) {
    selectedData.set(randomFromData(get(data)));
  }
}
export const prev = function () {
  if (get(stepIndex) < 1) return;
  stepIndex.update(n => n - 1);
  if (get(stepIndex) == 0) {
    selectedData.set([]);
  }
}
export const restart = function () {
  selectedData.set([]);
  setup();
}

export function updateAnswer(data) {
  answer.set(data)
}
