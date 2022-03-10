export function randomGaussian(length, v = 4) {
  // https://riptutorial.com/javascript/example/8330/random--with-gaussian-distribution
  let r = 0;
  for (let i = v; i > 0; i--) {
    r += Math.random();
  }
  return Math.ceil((r / v) * length);
}

export function randomIndex(length) {
  return Math.random() * length | 0;
}

export function randomFromDataWithInclude(data, shouldInclude, dataItems = 10) {
  let shouldBeIncluded = data.filter((d) => d[shouldInclude.key] === shouldInclude.value)
  let randomData = randomFromData(data, dataItems);
  // if randomData does not one of shouldBeIncluded, remove one from randomData and add one from shouldBeIncluded

}
function randomDataWithGaussian(data, dataItems) {
  let selected = [];
  for (let i = 0; i < dataItems; i++) {
    const randomIndex = randomGaussian(data.length);
    selected.push(data[randomIndex]);
  }
  return selected;

}
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


export function randomFromData(data, question, itemsPerGroup = 10) {
  let possibleAnswerDataPoints = [];
  let otherDataPoints = [];

  for (const dataPoint of data) {
    if (question.filter(dataPoint)) possibleAnswerDataPoints.push(dataPoint);
    else otherDataPoints.push(dataPoint)
  }
  console.log({ possibleAnswerDataPoints })

  let selectedGroup = randomDataWithGaussian(otherDataPoints, itemsPerGroup - 2);
  otherDataPoints = otherDataPoints.filter(o => selectedGroup.every(s => s.id !== o.id))
  selectedGroup = selectedGroup.concat(randomDataWithGaussian(possibleAnswerDataPoints, 2));

  const colCount = Math.ceil(data.length / itemsPerGroup) - 1;
  let groups = Array.from({ length: colCount }, () => []);
  const leftOvers = [];

  //insert wrong answer data points.
  otherDataPoints.forEach((datum, i) => {
    const index = i % colCount;
    if (groups[index].length > (itemsPerGroup - 1)) {
      leftOvers.push(datum)
    }
    else groups[index].push(datum);
  })

  const lastGroup = groups[groups.length - 1];
  lastGroup.concat(leftOvers.splice(0, itemsPerGroup - lastGroup.length));

  // insert at least one correct answer
  groups.forEach(group => {
    const randomIndex = randomGaussian(possibleAnswerDataPoints.length);
    group.push(possibleAnswerDataPoints[randomIndex]);
  })

  groups.unshift(selectedGroup);
  return groups.map(group => shuffle(group));
}

export function randomInChunks(data, chunks = 10) {
  let result = [];
  let addedIndizes = []
  for (let i = 0; i < data.length; i++) {
    console.log(addedIndizes)
    let randomIndex = randomGaussian(data.length);
    console.log(addedIndizes.indexOf(randomIndex))
    while (addedIndizes.indexOf(randomIndex) > 0) {
      randomIndex = randomGaussian(data.length);
    }
    console.log(randomIndex)
    addedIndizes.push(randomIndex)
    const chunkIndex = Math.floor(randomIndex / chunks)
    if (!result[chunkIndex]) {
      result[chunkIndex] = [] // start a new chunk
    }
    result[chunkIndex].push(data[randomIndex])
  }
  return result;
}

export function chunkArray(inputArray, chunks = 2) {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunks)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
}
