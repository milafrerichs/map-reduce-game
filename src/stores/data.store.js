import { readable, writable, derived, get } from "svelte/store";

import { randomSelectedFromData, randomFromData, seasons } from "../utils";
import { getResults } from "../utils/data.js";

export const data = writable([]);
export const question = writable({});

export const questionData = derived([data, question], ([$data, $question]) =>
  $data.filter($question.filter)
);

export const selectedData = derived(
  [data, questionData],
  ([$data, $questionData]) => randomSelectedFromData($data, $questionData, 16)
);

export const groupedData = derived(
  [data, questionData, selectedData],
  ([$data, $questionData, $selectedData]) =>
    randomFromData($data, $questionData, $selectedData, 16)
);

export const otherAnswers = derived(
  [groupedData, question],
  ([$groupedData, $question]) => {
    const answers = $groupedData.map((d) => getResults(d, $question)[0]);
    return answers.filter((e, i) => answers.indexOf(e) === i);
  }
);
