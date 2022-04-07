export function checkData(data, question, answer) {
  let filteredData = data.filter(question.filter);
  let result = filteredData.reduce((a, b) => {
    return question.typeFunction(a, b[question.column]);
  }, 0);
  return result === answer;
}

export function getEntry(data, question) {
  const result = getResults(data, question);
  if (result.length > 0) {
    return result[0];
  }
}

export function getResults(data, question) {
  let filteredData = data.filter(question.filter);
  let result = filteredData.reduce((a, b) => {
    return question.typeFunction(a, b[question.column]);
  }, 0);
  return filteredData.filter((d) => {
    return d[question.column] === result;
  });
}

export function checkAnswer(data, question, answer = "") {
  const entry = getEntry(data, question);
  const island = entry.island;
  const value = entry[question.column];
  const regex = new RegExp(`(${island})(?:.*)(${value})`, "i");
  return regex.test(answer);
}

export function getBeforeAfterMonths(month) {
  const indexMonth = monthNames.indexOf(month);
  const before = indexMonth === 0 ? 11 : indexMonth-1
  const after = indexMonth === 11 ? 0 : indexMonth+1
  return [monthNames[before], monthNames[after]]
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
