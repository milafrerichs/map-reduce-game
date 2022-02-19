
export function checkData(data, question, answer) {
  let filteredData = data.filter(question.filter)
  let result = filteredData.reduce((a, b) => {
    return question.typeFunction(a, b[question.column]);
  }, 0)
  return result === answer;
}

export function getEntry(data, question) {
  const result = getResults(data, question);
  if (result.length > 0) {
    return result[0]
  }
}

export function getResults(data, question) {
  let filteredData = data.filter(question.filter)
  let result = filteredData.reduce((a, b) => {
    return question.typeFunction(a, b[question.column]);
  }, 0)
  return filteredData.filter((d) => {
    return d[question.column] === result
  })
}


export function checkAnswer(data, question, answer = '') {
  const entry = getEntry(data, question);
  const { island, temp } = entry;
  const answerLength = `${island}:${temp}`.length
  const regex = new RegExp(`(${island})(?:.*)(${temp})`, 'i');
  const matches = regex.test(answer)
  return {
    isCorrectAnswer: matches && answer.length === answerLength,
    entry
  };
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
  "December"
];
