import { checkData, getEntry, checkAnswer } from '../../src/utils/data.js';

describe("#checkData" , () => {
  it("checks the question data by answer", () => {
    let data = [
      {a: 1, b: "c"},
      {a: 2, b: "c"},
      {a: 5, b: "c"},
    ]
    let question = {
      column: "a",
      filter: (d) => { return true },
      typeFunction: Math.max,
    }
    let result = checkData(data, question, 5);
    expect(result).toBe(true);
  })
  it("returns true", () => {
    let data = [
      {a: 1, b: "c"},
      {a: 2, b: "c"},
      {a: 5, b: "b"},
    ]
    let question = {
      column: "a",
      filter: (d) => { return d.b === "c" },
      typeFunction: Math.max,
    }
    let result = checkData(data, question, 2);
    expect(result).toBe(true);
  })
})
describe("#getEntry" , () => {
  it("checks the question data by answer", () => {
    let data = [
      {a: 1, b: "c"},
      {a: 2, b: "c"},
      {a: 5, b: "c"},
    ]
    let question = {
      column: "a",
      filter: (d) => { return true },
      typeFunction: Math.max,
    }
    let result = getEntry(data, question);
    expect(result).toStrictEqual({a: 5, b: "c"});
  })
})

describe('#checkAnswer', () => {
  let data = [
    {a: 15, island: "Corfu"},
    {a: 20, island: "Corfu"},
    {a: 30, island: "Corfu"},
  ]
  let question = {
    column: "a",
    filter: (d) => { return true },
    typeFunction: Math.max,
  }
  test.each([
    ['Corfu:30', true],
    ['Corfu=30', true],
    ['Corfu;30', true],
    ['corfu:30', true],
    ['corfu=30', true],
    ['corfu;30', true],
    ['Corfu;24', false],
    ['Bali;30', false],
  ])('.checkAnswer(%s)', (answer, expected) => {
    let result = checkAnswer( data, question,answer);
    expect(result).toEqual(expected);
  })
})
