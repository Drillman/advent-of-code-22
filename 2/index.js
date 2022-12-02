const fs = require('fs');

// const signs = {
//   B: 'paper',
//   Y: 'paper',
//   A: 'rock',
//   X: 'rock',
//   C: 'scissors',
//   Z: 'scissors'
// };
const signs = {
  B: 'paper',
  Y: 'draw',
  A: 'rock',
  X: 'lost',
  C: 'scissors',
  Z: 'win'
};
const shapeScore = {
  paper: 2,
  rock: 1,
  scissors: 3
}
const outcomeScore = {
  win: 6,
  draw: 3,
  lost: 0
}
const getWinner = (opponnent, player) => {
  if (opponnent === 'paper') {
    if(player === 'paper') return 'draw';
    else if(player === 'rock') return 'opponnent';
    else if(player === 'scissors') return 'player';
  }
  else if (opponnent === 'rock') {
    if(player === 'paper') return 'player';
    else if(player === 'rock') return 'draw';
    else if(player === 'scissors') return 'opponnent';
  }
  else if (opponnent === 'scissors') {
    if(player === 'paper') return 'opponnent';
    else if(player === 'rock') return 'player';
    else if(player === 'scissors') return 'draw';
  }
}
const getShape = (opponnent, outcome) => {
  if (opponnent === 'paper') {
    if(outcome === 'draw') return 'paper';
    else if(outcome === 'win') return 'scissors';
    else if(outcome === 'lost') return 'rock';
  }
  else if (opponnent === 'rock') {
    if(outcome === 'draw') return 'rock';
    else if(outcome === 'win') return 'paper';
    else if(outcome === 'lost') return 'scissors';
  }
  else if (opponnent === 'scissors') {
    if(outcome === 'draw') return 'scissors';
    else if(outcome === 'win') return 'rock';
    else if(outcome === 'lost') return 'paper';
  }
}
const sumArray = (base, ...additions) => {
  for (const addition of additions) {
    base[0] += addition[0];
    base[1] += addition[1];
  }
  return base;
}

fs.readFile('2/input2.txt', { encoding: 'utf-8'}, (err, data) => {
  const rounds = data.split('\r\n').map(round => round.split(' '));
  // const playersScores = rounds.reduce((acc, curr) => {
  //   const opponentShape = signs[curr[0]];
  //   const playerShape = signs[curr[1]];
  //   const winner = getWinner(opponentShape, playerShape);
  //   const shapeScores = [shapeScore[opponentShape], shapeScore[playerShape]];
  //   if (winner === 'opponnent') {
  //     acc = sumArray(acc, shapeScores, [outcomeScore.win, outcomeScore.lost])
  //   }
  //   else if (winner === 'player') {
  //     acc = sumArray(acc, shapeScores, [outcomeScore.lost, outcomeScore.win])
  //   }
  //   else {
  //     acc = sumArray(acc, shapeScores, [outcomeScore.draw, outcomeScore.draw])
  //   }
  //   return acc;
  // }, [0,0])
  const playersScores = rounds.reduce((acc, curr) => {
    const opponentShape = signs[curr[0]];
    const playerShape = getShape(opponentShape, signs[curr[1]]);
    console.log(curr[1])
    const winner = getWinner(opponentShape, playerShape);
    const shapeScores = [shapeScore[opponentShape], shapeScore[playerShape]];
    if (winner === 'opponnent') {
      acc = sumArray(acc, shapeScores, [outcomeScore.win, outcomeScore.lost])
    }
    else if (winner === 'player') {
      acc = sumArray(acc, shapeScores, [outcomeScore.lost, outcomeScore.win])
    }
    else {
      acc = sumArray(acc, shapeScores, [outcomeScore.draw, outcomeScore.draw])
    }
    return acc;
  }, [0,0])
  console.log(playersScores);
})