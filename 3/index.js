const fs = require('fs');
const _ = require('lodash');

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const charValues = [...alphabet.map(x => x.toLocaleLowerCase()), ...alphabet];

fs.readFile('3/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const splittedBags = data.split('\r\n').map(bag => bag.split (''));
  const groupedBags = [];
  for (let i = 0; i < splittedBags.length / 3; i++) {
    groupedBags.push(splittedBags.slice(i * 3, (i+1) * 3));
  }
  // const bags = splittedBags
  //   .map(line => [
  //     line.slice(0, line.length / 2),
  //     line.slice(line.length / 2)
  //   ]);
  const bagsPriority = groupedBags.reduce((acc, group) => {
    const [commonChar] = _.intersectionWith(...group, _.isEqual);
    acc.push(charValues.indexOf(commonChar) + 1);
    return acc;
  }, [])
  const sum = bagsPriority.reduce((acc, curr) => acc + curr, 0);
  console.log(sum);
});