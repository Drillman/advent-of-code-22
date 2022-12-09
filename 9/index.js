const fs = require('fs');

const directionMap = {
  'R': (position) => [position[0], position[1]+1],
  'L': (position) => [position[0], position[1]-1],
  'U': (position) => [position[0]-1, position[1]],
  'D': (position) => [position[0] + 1, position[1]]
};

const isTouching = (headPosition, tailPosition) => {
  const rowDifference = Math.abs(headPosition[0] - tailPosition[0]);
  const columnDifference = Math.abs(headPosition[1] - tailPosition[1]);
  return rowDifference <= 1 && columnDifference <= 1;
};

const getKnotDirections = (headPosition, tailPosition) => {
  const moves = [];
  if (headPosition[1] > tailPosition[1]) moves.push('R')
  if (headPosition[1] < tailPosition[1]) moves.push('L')
  if (headPosition[0] < tailPosition[0]) moves.push('U')
  if (headPosition[0] > tailPosition[0]) moves.push('D')
  return moves;
}

const positionToString = (position) => `${position[0]}/${position[1]}`;

fs.readFile('9/input1.txt', { encoding: 'utf-8'}, (err, data) => {
  const commands = data.split('\r\n').map(line => line.split(' '));
  const knots = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
  const tailPositionsSet = new Set([positionToString(knots[0])]);

  for(const [direction, steps] of commands) {
    for(let step=0; step < steps; step++) {
      for(let [index, position] of Object.entries(knots)) {
        if (+index === 0) {
          knots[+index] = directionMap[direction](position);
          continue;
        }
        if (!isTouching(knots[+index-1], knots[+index])) {
          const directions = getKnotDirections(knots[+index-1], knots[+index]);
          directions.forEach(direction => { knots[+index] = directionMap[direction](knots[+index]) })
          if (+index === 9) {
            tailPositionsSet.add(positionToString(knots[+index]));
          }
        }
      }
    }
  }
  console.log({positions: knots, size: tailPositionsSet.size})
});