
export function checkData(data, question, answer) {
  let filteredData = data.filter(question.filter)
  let result = filteredData.reduce((a,b) => {
    return question.typeFunction(a, b[question.column]);
  }, 0)
  return result === answer;
}
export function getEntry(data, question) {
  const result = getResults(data, question);
  if(result.length > 0) {
    return result[0]
  }
}

export function getResults(data, question) {
  let filteredData = data.filter(question.filter)
  let result = filteredData.reduce((a,b) => {
    return question.typeFunction(a, b[question.column]);
  }, 0)
  return filteredData.filter((d) => {
    return d[question.column] === result
  })
}
