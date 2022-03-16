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

export function randomSelectedFromData(data, questionData, dataItems=10) {
     let monthItems = Math.ceil(dataItems / 2)
     let rest = dataItems - monthItems;
     let intersection = data.filter(x => !questionData.includes(x));
     let selected = randomDataWithGaussian(questionData, monthItems)
     selected = selected.concat(randomDataWithGaussian(intersection, rest))
     return shuffle(selected);
}

function randomIndexWithRetries(data, per){
    let rIndex= randomGaussian(data.length);
    let tries = 0;
    while(data[rIndex].length >= per) {
      rIndex = randomIndex(data.length);
      tries++;
      if(tries > data.length*2) {
        break;
      }
    }
  return rIndex;
}


export function randomFromData(data, questionData, selected, itemsPerGroup = 10) {
  const a = new Set(data);
  const b = new Set(selected);
  const difference = new Set(
    Array.from(a).filter(x => !b.has(x))
  );

  const colCount = Math.ceil(data.length / itemsPerGroup) - 1;
  const answersPerGroupCount = Math.ceil(questionData.length / colCount) - 1;
  let groups = Array.from({ length: colCount }, () => []);
  const leftOvers = [];
  //
  // insert at least one correct answer
  questionData.forEach(group => {
    let missingEntries = itemsPerGroup - group.length;
    for(let i=0;i<missingEntries;i++) {
      const rIndex = randomIndex(questionData.length);
      let q = questionData.splice(rIndex, 1)
      group = group.concat(q);
    }
  })


  difference.forEach((datum, i) => {
    let rIndex= randomGaussian(groups.length);
    let tries = 0;
    while(groups[rIndex].length >= (itemsPerGroup-1)) {
      rIndex = randomIndex(groups.length);
      tries++;
      if(tries > groups.length*2) {
        break;
      }
    }
    if(tries > groups.length*4 || groups[rIndex].length >= (itemsPerGroup-1)) {
      leftOvers.push(datum)
    } else {
      groups[rIndex].push(datum);
    }
  })

  const lastGroup = groups[groups.length - 1];
  lastGroup.concat(leftOvers.splice(0, itemsPerGroup - lastGroup.length));

  return groups.map(group => shuffle(group));
}

export function randomInChunks(data, chunks = 10) {
  let result = [];
  let addedIndizes = []
  for (let i = 0; i < data.length; i++) {
    let randomIndex = randomGaussian(data.length);
    while (addedIndizes.indexOf(randomIndex) > 0) {
      randomIndex = randomGaussian(data.length);
    }
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
