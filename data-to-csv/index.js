const drawingData = [
  ['26 Jan', 2],
  ['', 2],
  ['', 2],
  ['', 4],
  ['', 6],
  ['', 0],
  ['1 Feb', 4],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 2],
  ['', 2],
  ['', 3],
  ['', 0],
  ['', 2],
  ['', 2],
  ['', 0],
  ['', 6],
  ['15 Feb', 8],
  ['', 3],
  ['', 2],
  ['', 0],
  ['', 19],
  ['', 0],
  ['', 5],
  ['', 0],
  ['', 0],
  ['', 14],
  ['', 0],
  ['', 2],
  ['', 0],
  ['', 11],
  ['1 March', 0],
  ['', 0],
  ['', 5],
  ['', 0],
  ['', 0],
  ['', 7],
  ['', 2],
  ['', 0],
  ['', 6],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 8],
  ['15 March', 0],
  ['', 4],
  ['', 4],
  ['', 2],
  ['', 0],
  ['', 3],
  ['', 0],
  ['', 2],
  ['', 4],
  ['', 2],
  ['', 2],
  ['', 2],
  ['', 4],
  ['', 0],
  ['', 0],
  ['', 4],
  ['', 0],
  ['1 April', 0],
  ['', 9],
  ['', 4],
  ['', 4],
  ['', 4],
  ['', 4],
  ['', 6],
  ['', 2],
  ['', 2],
  ['', 4],
  ['', 4],
  ['', 6],
  ['', 2],
  ['', 0],
  ['15 April', 0],
  ['', 0],
  ['', 0],
  ['', 2],
  ['', 0],
  ['', 0],
  ['', 4],
  ['', 0],
  ['', 3],
  ['', 0],
  ['', 0],
  ['', 3],
  ['', 2],
  ['', 0],
  ['', 4],
  ['', 0],
  ['1 May', 4],
  ['', 0],
  ['', 5],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 2],
  ['', 0],
  ['', 4],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 5],
  ['', 12],
  ['15 May', 0],
  ['', 2],
  ['', 4],
  ['', 2],
  ['', 6],
  ['', 4],
  ['', 2],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 0],
  ['', 6],
  ['', 2],
  ['29 May', 0],
]

const maxNumberOfDatapoints = 25
const numbersOnly = drawingData.map((datapoint) => datapoint[1])
const daysSinceStart = drawingData.length
const sizeOfChunkedData = Math.ceil(daysSinceStart / maxNumberOfDatapoints)
var i,j,temparray=[],chunk = 10
for (i=0,j=daysSinceStart; i<j; i+=sizeOfChunkedData) {
    temparray.push(numbersOnly.slice(0, i+sizeOfChunkedData))
}
const chunked = temparray.map((chunk) => {
  return chunk.reduce((prev, num) => prev + num, 0)
})


let reconstituted = chunked.map((num, i) => {
  return ["'',", num]
})
console.log('date, drawings');
reconstituted[0][0] = '26 Jan 2017,'
reconstituted[reconstituted.length - 1][0] = 'Now!,'

reconstituted.forEach((datapoint) => {
  console.log(datapoint[0], datapoint[1]);
})
const numberOfDrawingsCollected = reconstituted[reconstituted.length - 1][1]

console.log('datapoints length: ', reconstituted.length, "  should be less than 25 for sqaurespace!")
console.log('Days since start: ', daysSinceStart)
console.log('Number of Drawings: ', numberOfDrawingsCollected)
console.log('Drawings per day: ', numberOfDrawingsCollected/daysSinceStart)
