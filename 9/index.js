const fs = require('fs');

const getNewPosition = (direction, position) => {
  switch(direction) {
    case 'R':
      return [position[0], position[1]+1];
    case 'L': 
      return [position[0], position[1]-1];
    case 'U': 
      return [position[0] - 1, position[1]];
    case 'D':
        return [position[0] + 1, position[1]];
    default: 
      console.error('help me i\'m stuck under the water');
  }
}

const isTouching = (headPosition, tailPosition) => {
  const rowDifference = Math.abs(headPosition[0] - tailPosition[0]);
  const columnDifference = Math.abs(headPosition[1] - tailPosition[1]);
  if (rowDifference === 0)  return columnDifference <= 1;
  else if (rowDifference === 1) return columnDifference <= 1;
  else return false;
};

const rowIndexDirection = (diff) => diff > 0 ? 'D' : 'U';
const columnIndexDirection = (diff) => diff > 0 ? 'R' : 'L';

const getTailDirections = (headPosition, tailPosition) => {
  const rowIndexDifference = headPosition[0] - tailPosition[0];
  const columnIndexDifference = headPosition[1] - tailPosition[1];
  const moves = [];
  if (headPosition[1] > tailPosition[1]) moves.push('R')
  if (headPosition[1] < tailPosition[1]) moves.push('L')
  if (headPosition[0] < tailPosition[0]) moves.push('U')
  if (headPosition[0] > tailPosition[0]) moves.push('D')
  return moves
  // if (headPosition[0] < tailPosition[0]) {
  //   if (columnIndexDifference === 0) return [rowIndexDirection(rowIndexDifference)];
  //   return [columnIndexDirection(columnIndexDifference)];
  //   // else return [rowIndexDirection(rowIndexDifference)];
  // } else {
  //   if (columnIndexDifference === 0) return [rowIndexDirection(rowIndexDifference)]
  //   else return [columnIndexDirection(columnIndexDifference)];
  // }
  // else {
  //   // const directions = [];
  //   // for(let r=1; r < rowIndexDifference; r++) directions.push(rowIndexDirection(rowIndexDifference))
  //   // for(let c=1; c < rowIndexDifference; r++) directions.push(rowIndexDirection(rowIndexDifference))
  //   return [columnIndexDirection(columnIndexDifference), rowIndexDirection(rowIndexDifference)];
  // }
}

fs.readFile('9/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const commands = data.split('\r\n').map(line => line.split(' '));
  // let headPosition = [0, 0]; // y,x
  // let tailPosition = [0, 0];
  const positions = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
  const tailPositionsSet = new Set(['0/0']);
  for(const [direction, steps] of commands) {
    for(let step=0; step < steps; step++) {
      for(let [index, position] of Object.entries(positions)) {
        if (+index === 0) {
          positions[+index] = getNewPosition(direction, position);
          continue;
        }
        let isPositionTouching = isTouching(positions[+index-1], positions[+index])
        const positionWasntTouching = !isTouching(positions[+index-1], positions[+index]);
        while (!isPositionTouching) {
          const moves = getTailDirections(positions[+index-1], positions[+index]);
          for(const positionDirection of moves) {
            positions[+index] = getNewPosition(positionDirection, positions[+index]);
          }
          isPositionTouching = isTouching(positions[+index-1], positions[+index])
        }
        if (+index === 9 && positionWasntTouching) {
          tailPositionsSet.add(`${positions[+index][0]}/${positions[+index][1]}`);
        }
      }
      // headPosition = getNewPosition(direction, headPosition);
      // const isTailTouching = isTouching(headPosition, tailPosition);
      // if (!isTailTouching) {
      //   for(const tailDirection of getTailDirections(headPosition, tailPosition)) {
      //     tailPosition = getNewPosition(tailDirection, tailPosition);
      //   }
      //   tailPositionsSet.add(`${tailPosition[0]}-${tailPosition[1]}`);
      // }
    }
  }
  console.log({positions, size: tailPositionsSet.size})
});