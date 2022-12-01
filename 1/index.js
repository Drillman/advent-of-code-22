const fs = require('fs/promises');
(async () => {
  const data = await fs.readFile('1/inputDay1.txt', { encoding: 'utf8'});
  const calories = data
    .split('\n\n')
    .map(line => line.split('\n'))
    .map(unit => unit
      .map(input => parseInt(input))
      .reduce((acc,curr) => acc + curr, 0));
  console.log(Math.max(...calories));
  const top3 = calories.sort().reverse();
  console.log(top3[0] + top3[1] + top3[2]);
})();