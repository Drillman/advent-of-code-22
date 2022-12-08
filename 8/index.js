const fs = require('fs');

const isVisible = (map, rowIndex, columnIndex) => {
  const treeHeight = map[rowIndex][columnIndex];
  const visibleTrees = [0,0,0,0];
  let countVertically = true;
  for(let i = 0; i < map.length; i++) {
    const currentHeigh = map[i][columnIndex];
    if (i < rowIndex && countVertically && currentHeigh < treeHeight) visibleTrees[0]++;
    else if (i < rowIndex && countVertically && currentHeigh >= treeHeight) {
      visibleTrees[0] = 1;
    }
    else if (i > rowIndex && countVertically && currentHeigh < treeHeight) visibleTrees[1]++;
    else if (i > rowIndex && countVertically && currentHeigh >= treeHeight) {
      visibleTrees[1]++;
      countVertically = false;
    };
  }

  let countHorizontally = true;
  for(let x = 0; x < map[rowIndex].length; x++) {
    const currentHeigh = map[rowIndex][x];
    if (x < columnIndex && countHorizontally && currentHeigh < treeHeight) visibleTrees[2]++;
    else if (x < columnIndex && countHorizontally && currentHeigh >= treeHeight) {
      visibleTrees[2] = 1;
    }
    else if (x > columnIndex && countHorizontally && currentHeigh < treeHeight) visibleTrees[3]++;
    else if (x > columnIndex && countHorizontally && currentHeigh >= treeHeight) {
      visibleTrees[3]++;
      countHorizontally = false;
    };
  }

  return visibleTrees.reduce((acc, curr) => curr > 0 ? acc * curr : acc);
}

fs.readFile('8/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const lines = data.split('\r\n').map(line => line.split(''));
  const treeScores = [];
  for (let i = 1; i < lines.length - 1; i++) {
    for (let x = 1; x < lines[i].length - 1; x++) {
      treeScores.push(isVisible(lines,i,x))
    }
  }
  console.log(Math.max(...treeScores));
});