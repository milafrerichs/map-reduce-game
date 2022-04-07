import { chunkArray, randomInChunks, randomFromData, randomSelectedFromData } from '../../src/utils';

describe("#chunkArray" , () => {
  it("checks the question data by answer", () => {
    let data = [ 1,2,3,4 ]
    expect(chunkArray(data, 2)).toStrictEqual([[1,2],[3,4]])
  })
})
describe("#randomInChunks" , () => {
  it("checks the question data by answer", () => {
    let data = [ 1,2,3,4,5,6,7,8,9,10 ]
    const result = randomInChunks(data, 5)
    expect(result[0].length).toBe(20)
  })
})

describe("#randomFromData" , () => {
  it("gets the amount of groups", () => {
    let data = [1,2,3,4,5,6,7,8,9,10]
    let selected = [200]
    let questionData = [15,16,17,18,19]
    let groups = randomFromData(data, questionData, selected, 5)

    expect(groups.length).toBe(5)
    expect(groups[0][0]).toBeGreaterThan(14)
    expect(groups[0][1]).toBeLessThan(14)
  })
})

describe("#randomSelectedFromData" , () => {
  it("returns result", () => {
    let data = [
      { island: "Cos", month: "December", value: 1 },
      { island: "Cos", month: "December", value: 2 },
      { island: "Cos", month: "December", value: 3 },
      { island: "Cos", month: "January", value: 4 },
      { island: "Cos", month: "January", value: 5 },
      { island: "Cos", month: "January", value: 6 },
      { island: "Cos", month: "January", value: 7 },
      { island: "Cos", month: "February", value: 8 },
      { island: "Cos", month: "February", value: 9 },
      { island: "Cos", month: "February", value: 10 },
      { island: "Cos", month: "March", value: 11 },
      { island: "Cos", month: "March", value: 11 },
      { island: "Cos", month: "March", value: 11 },
      { island: "Cos", month: "March", value: 11 },
      { island: "Cos", month: "March", value: 11 },
      { island: "Cos", month: "March", value: 11 },
      { island: "Cos", month: "March", value: 11 },
    ]
    let questionData = [
      { island: "Cos", month: "January", value: 4 },
      { island: "Cos", month: "January", value: 5 },
      { island: "Cos", month: "January", value: 6 },
      { island: "Cos", month: "January", value: 7 },
    ]
    let result = randomSelectedFromData(data, questionData, 5)

    expect(result.length).toBe(5)
    expect(result[0].value).toBeLessThan(10)
    expect(result[1].value).toBeLessThan(10)
    expect(result[2].value).toBeLessThan(10)
    expect(result[3].value).toBeLessThan(10)
    expect(result[4].value).toBeLessThan(10)
  })
})

