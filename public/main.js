import Game from '../src/Game.svelte';
import generateData from "month-data-generator";

const monthData = [
      { min: 9, max: 15, name: "January"   },
      { min: 9, max: 15, name: "February"   },
      { min: 10, max: 17, name: "March"   },
      { min: 12, max: 20, name: "April"   },
      { min: 15, max: 23, name: "May"   },
      { min: 19, max: 27, name: "June"   },
      { min: 22, max: 29, name: "July"   },
      { min: 22, max: 29, name: "August"   },
      { min: 20, max: 27, name: "September"   },
      { min: 17, max: 24, name: "October"   },
      { min: 14, max: 20, name: "November"   },
      { min: 11, max: 17, name: "December"   },
];
export function getData() {

  let islands = [ "Crete", "Euboea", "Lesbos", "Rhodes", "Chios", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thasos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothraki", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis"  ];
  const config = {
        names: islands,
        amount: 36,
        minMaxData: monthData
  }
    const rawData = generateData(config)
    let data = []
  for (const [i, d] of Object.entries(rawData)) {
        d.island = d.name;
        d.temp = d.d
        data.push(d)
  }
    return data;
}


let data = getData(); 
let columns = [{ name: "temperature", column: "temp" }]
let types = [{ name: "highest", method: Math.max }]
let randomMonthIndex = Math.random() * monthData.length | 0;
let randomMonth = monthData[randomMonthIndex].name
/*
for (let i = 0; i < 6000; i++) {
  let randomIndexIsland = Math.random() * islands.length | 0;
  let randomIndexTemps = Math.random() * temps.length | 0;
  let monthIndex = Math.random() * monthNames.length | 0;
  data = data.concat({ id: i, month: monthNames[monthIndex], temp: temps[randomIndexTemps], island: islands[randomIndexIsland] });
}
*/
let question = {
  column: columns[0].column,
  filter: (d) => { return d.month === randomMonth },
  typeFunction: types[0].method,
  text: `Which Island has the ${types[0].name} ${columns[0].name} in ${randomMonth}`,
  month: randomMonth,
  typeText:`${types[0].name} ${columns[0].name}`
}

function gameEvent(direction, slideIndex) {
  window.dispatchEvent(new CustomEvent(`mrGame:${direction}`, { bubbles: true, detail: { slideIndex } }))
}

const app = new Game({
  target: document.getElementById("app"),
  props: {
    name: 'world',
    question,
    data
  }
});

document.getElementById("next").addEventListener("click", () => {
  gameEvent("next", 1)
})

document.getElementById("prev").addEventListener("click", () => {
  gameEvent("prev", 1)
})

document.getElementById("restart").addEventListener("click", () => {
  let monthIndex = Math.random() * monthData.length | 0;
  let randomMonth = monthData[monthIndex].name
  let question = {
    column: columns[0].column,
    filter: (d) => { return d.month === randomMonth },
    typeFunction: types[0].method,
    text: `Which Island has the ${types[0].name} ${columns[0].name} in ${randomMonth}`,
    month: randomMonth,
    typeText:`${types[0].name} ${columns[0].name}`
  }
  gameEvent("restart", 1)
  app.$set({question})
})

export default app;
