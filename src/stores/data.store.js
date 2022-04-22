import { readable, writable, derived, get } from "svelte/store";

import { randomSelectedFromData, randomFromData, seasons } from "../utils";
import { getResults } from "../utils/data.js";

export const data = writable([]);
export const question = writable({});
export const theme = readable({
  summer: {
    text: "white",
  },
  spring: {
    text: "app-blue-900",
  },
  fall: {
    text: "app-blue-900",
  },
  winter: {
    text: "white",
  },
});

let dataCache = [];
let questionCache = {};
let questionDataCache = [];
let selectedDataCache = [];
let groupedDataCache = [];
let otherAnswersCache = [];

export const questionData = derived([data, question], ([$data, $question], set) => {
  if(dataCache !== $data || questionCache !== $question) {
    dataCache = $data;
    questionCache = $question;
    set($data.filter($question.filter))
  }
});

export const selectedData = derived(
  [data, questionData],
  ([$data, $questionData], set) => {
    if(dataCache !== $data || questionDataCache !== $questionData) {
      dataCache = $data;
      questionDataCache = $questionData;
      set(randomSelectedFromData($data, $questionData, 16));
    }
  }
);

export const groupedData = derived(
  [data, questionData, selectedData],
  ([$data, $questionData, $selectedData], set) => {
    if(dataCache !== $data || questionDataCache !== $questionData || selectedDataCache !== $selectedData) {
      selectedDataCache = $selectedData;
      set(randomFromData($data, $questionData, $selectedData, 6));
    }
  }

);

export const otherAnswers = derived(
  [groupedData, question],
  ([$groupedData, $question]) => {
    const answers = $groupedData.map((d) => getResults(d, $question)[0]);
    return answers.filter((e, i) => answers.indexOf(e) === i);
  }
);

export const currentMonth = derived(
  [question],
  ([$question]) => $question.month
);

export const currentSeason = derived([currentMonth], ([$currentMonth]) =>
  seasons($currentMonth)
);

export const currentTheme = derived(
  [theme, currentSeason],
  ([$theme, $currentSeason]) => $theme[$currentSeason]
);

