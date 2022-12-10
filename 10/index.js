const fs = require('fs');

fs.readFile('10/input3.txt', { encoding: 'utf-8'}, (err, data) => {
  const commands = data.split('\r\n').map(line => line.split(' '));
  const keyCycles = [40,80,120,160,200,240];
  const pixels = [[],[],[],[],[],[]];
  const cycleCommands = commands.reduce((acc, [command, number]) => {
    if (command === 'noop') return [...acc, [command, number]];
    return [...acc, [command, 0], [command, number]];
  }, []);
  let x = 1;
  let rowIndex = 0;
  for (const [index, [command,number]] of Object.entries(cycleCommands)) {
    const sprite = [x-1, x, x+1];
    const crtIndex = +index - (rowIndex * 40);
    pixels[rowIndex].push(sprite.includes(crtIndex) ? '#' : '.');

    if(keyCycles.includes(+index + 1)) {
      console.log({rowIndex})
      rowIndex++;
    };
    if(command === 'addx') x += +number
  }
  pixels.forEach(pixelRow => {
    console.log(pixelRow.join(''));
  })
});