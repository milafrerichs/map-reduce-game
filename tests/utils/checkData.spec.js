import { checkData, getEntry } from '../../src/utils/data.js';

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
