import { writable } from 'svelte/store'
import { randomFromData } from "../utils";


function incrementStep(currentState) {
  currentState.stepIndex++;
  if (currentState.stepIndex == 1) {
    currentState.selected = randomFromData(currentState.data);
  }
  if (currentState.stepIndex > 0)
    currentState.restart = true;
  return currentState;
}

function decrementStep(currentState) {
  if (currentState.stepIndex < 1) return;
  currentState.stepIndex--;
  if (currentState.stepIndex == 0)
    currentState.selected = [];
  return currentState;
}

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
    text: `Which Island has the ${types[0].name} ${columns[0].name} in ${randomMonth}`
  }
  return { data, question };
}

function reinitializeStore(state) {
  const { data, question } = generateData();
  return { restart: true, selected: [], stepIndex: 0, data, question }
}

export const store = writable();

export function initStore(initialState = {}) {
  const { update, set, subscribe } = store
  const { data, question } = generateData();

  //initialize store
  set({ ...initialState, data, question })

  return {
    subscribe,
    next: () => update(incrementStep),
    previous: () => update(decrementStep),
    setAnswer: (answer) => update(state => ({ ...state, answer })),
    restart: () => update(reinitializeStore)
  }
};