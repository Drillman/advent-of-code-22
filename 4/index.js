const fs = require('fs');

const inputToRange = (input) => {
  const limits = input.split('-').map(x => parseInt(x));
  const range = [];
  for (let i = limits[0]; i <= limits[1]; i++) {
    range.push(i);
  }
  return range;
}

fs.readFile('4/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const pairs = data.split('\r\n').map(pair => pair.split(','));
  const count = pairs.reduce((acc, pair) => {
    const ranges = [ inputToRange(pair[0]), inputToRange(pair[1]) ];
    const largestIndex = ranges[0].length > ranges[1].length ? 0 : 1;
    const smallerIndex = ranges[0].length > ranges[1].length ? 1 : 0;
    if (ranges[smallerIndex].find(space => ranges[largestIndex].includes(space))) acc++;
    // if (ranges[smallerIndex].every(space => ranges[largestIndex].includes(space))) acc++;
    return acc;
  }, 0);
  console.log(count);
});