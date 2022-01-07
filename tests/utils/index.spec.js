import { chunkArray, randomInChunks } from '../../src/utils';

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
    console.log(result)
    expect(result[0].length).toBe(20)
  })
})
