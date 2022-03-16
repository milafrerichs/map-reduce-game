import { chunkArray, randomInChunks, randomFromData } from '../../src/utils';

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
