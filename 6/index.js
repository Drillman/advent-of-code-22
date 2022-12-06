const fs = require('fs');

fs.readFile('6/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const lines = data 
    .split('\r\n')
    .map(line => {
      for(let i = 13; i < line.length; i++) {
        const lastChars = line.slice(i-13, i+1);
        const set = new Set(lastChars.split(''));
        if (lastChars.length === set.size) return i + 1;
      }
    })
  console.log(lines);
});