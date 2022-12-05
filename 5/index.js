const fs = require('fs');

const getStackObj = (stacks, indexes) => {
  return indexes
  .map(i => parseInt(i))
  .reduce((acc, index) => {
    const charIndex = 1 + 4 * (index - 1);
    acc[index] = stacks.map(row => row.charAt(charIndex)).filter(elem => elem !== ' ').reverse();
    return acc
  }, {})
}
const getMovesList = (moves) => {
  return moves.map(line => {
    return line
      .replace('move ', '')
      .replace(' from ', '-')
      .replace(' to ', '-')
      .split('-')
  })
}
const runMoves = (stacksObj, movesList) => {
  return movesList.reduce((stacks, [size, source, target]) => {
    const movingItems = [];
    for (let i = size; i > 0; i--) {
      movingItems.push(stacks[source].pop());
    }
    stacks[target].push(...movingItems.reverse());
    return stacks;
  }, stacksObj);
}

fs.readFile('5/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  let [stacks, moves] = data.split('\r\n\r');
  stacks = stacks.split('\r\n');
  moves = moves.split('\r\n').map(move => move.replace('\n', '')).filter(move => move.length);
  const stacksIndexes = stacks.pop().split(' ').filter(i => i.length);
  const stackObj = getStackObj(stacks, stacksIndexes);
  const movesList = getMovesList(moves);

  const finalState = runMoves(stackObj, movesList);
  const message = Object.keys(finalState).reduce((message, key) => message += finalState[key][finalState[key].length - 1], '');
  console.log({finalState, message});
});
