import { winningArrays } from "../utils/Utils";

export const GameAi = gameboard => {
  let computedPosition;
  let testPossiblePos = null,
    possiblePos = [];
  let opponentCurrentSquares = [],
    opponentFutureMove = [];
  let computerCurrentSquares = [];

  //calculate the array with possible future positions for computer
  for (let j = 0; j <= 6; j++) {
    testPossiblePos = null;
    for (let i = 0; i <= 35; i = i + 7) {
      if (gameboard[j + i] === 0) testPossiblePos = j + i;
    }
    if (testPossiblePos !== null) possiblePos.push(testPossiblePos);
  }
  console.log("possiblePos", possiblePos);

  //build an array with players selected squares
  gameboard.forEach((square, index) => {
    if (square === 1) opponentCurrentSquares.push(index);
  });
  console.log("gameboard opponent squares", opponentCurrentSquares);

  //build an array with computer selected squares
  gameboard.forEach((square, index) => {
    if (square === 2) computerCurrentSquares.push(index);
  });
  console.log("gameboard computer squares", computerCurrentSquares);

  //guess future player moves
  let noSelectedSquares = 0,
    opponentPossibleMoves = [];
  winningArrays.forEach(winningCombination => {
    noSelectedSquares = 0;
    for (let h = 0; h < possiblePos.length; h++) {
      if (winningCombination.includes(possiblePos[h])) {
        let comptSquares = false;
        for (let p = 0; p < computerCurrentSquares.length; p++) {
          if (winningCombination.includes(computerCurrentSquares[p])) {
            comptSquares = true;
          }
        }

        if (comptSquares === false) {
          for (let k = 0; k < opponentCurrentSquares.length; k++) {
            if (winningCombination.includes(opponentCurrentSquares[k])) {
              noSelectedSquares++;
            }
          }
        }
        if (noSelectedSquares !== 0)
          opponentPossibleMoves.push([winningCombination, noSelectedSquares]);

        break;
      }
    }
  });
  console.log("opponentPossibleMoves", opponentPossibleMoves);

  //select the most probable future opponent move
  if (opponentPossibleMoves.length > 1) {
    opponentFutureMove = opponentPossibleMoves.reduce(function(p, v) {
      return p[1] > v[1] ? p : v;
    });
  } else opponentFutureMove = null;
  console.log("opponentFutureMove", opponentFutureMove);

  //calculate the computer next position
  if (opponentFutureMove === null) {
    computedPosition =
      possiblePos[Math.floor(Math.random() * possiblePos.length)];
  } else {
    for (let i = 0; i < possiblePos.length; i++) {
      if (opponentFutureMove[0].includes(possiblePos[i]))
        computedPosition = possiblePos[i];
    }
  }
  console.log(computedPosition);

  return computedPosition;
};
