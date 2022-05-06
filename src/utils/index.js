import { getBeforeAfterMonths, monthNames } from './data.js';

let islands = [ "Crete", "Euboea", "Lesbos", "Rhodes", "Chios", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thasos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothraki", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis"  ];

export function randomGaussian(length, v = 4) {
  // https://riptutorial.com/javascript/example/8330/random--with-gaussian-distribution
  let r = 0;
  for (let i = v; i > 0; i--) {
    r += Math.random();
  }
  return Math.ceil((r / v) * length);
}

export function randomIndex(length) {
  return (Math.random() * length) | 0;
}

export function randomFromDataWithInclude(data, shouldInclude, dataItems = 10) {
  let shouldBeIncluded = data.filter(
    (d) => d[shouldInclude.key] === shouldInclude.value
  );
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
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

/*
 * pick three islands
 * get randomData for these three islands
 * find out the max, filter out any that we only have one max
 * get other data points for these islands for the previous and next month
 */
export function randomSelectedFromData(data, questionData, dataItems = 10) {
  let monthItems = Math.ceil(dataItems / 2);
  let beforeAfterMonths = getBeforeAfterMonths(questionData[0].month)
  let selectedIslands = randomDataWithGaussian(islands, 3)
  let qData = questionData.filter((d) => selectedIslands.includes(d.island))
  let selectedRaw = randomDataWithGaussian(qData, monthItems);
  let max = maxWithKey(selectedRaw, "d")
  let selected = selectedRaw.filter(function(d) { return d.d < max })
  selected.push(selectedRaw.filter(function(d) { return d.d == max })[0])

  let rest = dataItems - selected.length;
  let intersection = data.filter((x) => !questionData.includes(x) && beforeAfterMonths.indexOf(x.month) > -1 && selectedIslands.indexOf(x.island) > -1 && x.d < max);
  selected = selected.concat(randomDataWithGaussian(intersection, rest));
  return shuffle(selected);
}

function randomIndexWithRetries(data, per) {
  let rIndex = randomGaussian(data.length);
  let tries = 0;
  while (data[rIndex].length >= per) {
    rIndex = randomIndex(data.length);
    tries++;
    if (tries > data.length * 2) {
      break;
    }
  }
  return rIndex;
}

export function randomFromData(
  data,
  questionData,
  selected,
  numberOfGroups = 10
) {
  const a = new Set(data);
  const b = new Set(selected);
  const difference = new Set(Array.from(a).filter((x) => !b.has(x)));

  const answersPerGroupCount = Math.ceil(questionData.length / numberOfGroups);
  const itemsPerGroup = Math.ceil(difference.size / numberOfGroups);
  let groups = Array.from({ length: numberOfGroups }, () => []);
  const leftOvers = [];
  groups = groups.map((group) => {
    for (let i = 0; i < answersPerGroupCount; i++) {
      const rIndex = randomIndex(questionData.length);
      let q = questionData.splice(rIndex, 1);
      group = group.concat(q);
    }
    return group;
  });

  difference.forEach((datum, i) => {
    let rIndex = randomIndex(groups.length);
    let tries = 0;
    while (groups[rIndex].length >= itemsPerGroup - 1) {
      rIndex = randomIndex(groups.length);
      tries++;
      if (tries > groups.length * 2) {
        break;
      }
    }
    if (tries > groups.length * 4 || groups[rIndex].length >= itemsPerGroup) {
      leftOvers.push(datum);
    } else {
      groups[rIndex].push(datum);
    }
  });

  const lastGroup = groups[groups.length - 1];
  lastGroup.concat(leftOvers.splice(0, itemsPerGroup - lastGroup.length));
  groups.concat(lastGroup);

  return groups;
}

export function randomInChunks(data, chunks = 10) {
  let result = [];
  let addedIndizes = [];
  for (let i = 0; i < data.length; i++) {
    let randomIndex = randomGaussian(data.length);
    while (addedIndizes.indexOf(randomIndex) > 0) {
      randomIndex = randomGaussian(data.length);
    }
    addedIndizes.push(randomIndex);
    const chunkIndex = Math.floor(randomIndex / chunks);
    if (!result[chunkIndex]) {
      result[chunkIndex] = []; // start a new chunk
    }
    result[chunkIndex].push(data[randomIndex]);
  }
  return result;
}

export function chunkArray(inputArray, chunks = 2) {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunks);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}

export function sortByMonth(a,b) {
  var aIndex = monthNames.indexOf(a.month)
  var bIndex = monthNames.indexOf(b.month)
  return aIndex - bIndex;
}

export function sortByKey(key) {
  return function(a,b) {
    var aValue = (a[key]);
    var bValue = b[key];
    if(typeof aValue === "string"){
      aValue = aValue.toUpperCase();
    }
    if(typeof bValue === "string"){
      bValue = bValue.toUpperCase();
    }
    if (aValue < bValue) {
          return -1;
    }
    if (aValue > bValue) {
          return 1;
    }
    return 0;
  }
}

export function maxWithKey(arr, key) {
  return arr.reduce(function(acc, b) {
      return Math.max(acc, b[key]);
  }, -Infinity);
}

export function seasons(month) {
  switch (month) {
    case "December":
    case "January":
    case "February":
      return "winter";
    case "March":
    case "April":
    case "May":
      return "spring";
    case "June":
    case "July":
    case "August":
      return "summer";
    case "September":
    case "October":
    case "November":
      return "fall";
    default:
      return "summer";
  }
}

