const fs = require('fs');
const _ = require('lodash');

let total = 0;
const folderSizes = {}
const neededSize = 40_000_000;
const computeSize = (obj, key) => {
  const size = Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value !== 'string') {
      acc += computeSize(value, key);
    }
    else { acc += +value }
    return acc;
  }, 0)
  if (size <= 100_000) total += size;
  if (key) folderSizes[key] = size;
  return size;
}


fs.readFile('7/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const lines = data.split('\r\n');
  let map = {};
  let currentPath = [];
  let lsMode = false;
  for (const line of lines) {
    const cdSplit = line.split('$ cd ');
    const fileSplit = line.split(' ');
    if (line.includes('$ cd')) {
      if (cdSplit[1] === '..') currentPath.pop();
      else { currentPath.push(cdSplit[1]) }
      lsMode = false; 
    }
    else if (line.includes('$ ls')) { lsMode = true }
    else if (fileSplit[0] !== 'dir'){
      _.set(map, [...currentPath, fileSplit[1]], fileSplit[0])
    };
  }
  console.log(computeSize(map))
  console.log(Object.entries(folderSizes).reduce((acc, [key, size]) => {
    if (folderSizes['/'] - size <= neededSize && (!acc[1] || size < acc[1])) return [key, size];
    return acc;
  }, [null, null]))
  // console.log(total);
  // console.log(JSON.stringify(map)); 
});