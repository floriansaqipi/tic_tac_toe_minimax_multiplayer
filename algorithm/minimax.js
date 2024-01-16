const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]

let origBoard
let huPlayer
let aiPlayer
let isPc

exports.initalizeGameState = (gameState) => {
  origBoard = gameState.origBoard
  huPlayer = gameState.huPlayer
  aiPlayer = gameState.aiPlayer
  isPc = gameState.isPc
}

exports.bestSpot = () => {
  console.log(
    "origBOard: ",
    origBoard,
    "HumanPlayer:",
    huPlayer,
    "AiPlayer: ",
    aiPlayer,
    "IsPc:",
    isPc
  )
  return minimax(origBoard, 0, -10000, 10000, aiPlayer).index
}

function evaluateBoard(board, depth, player) {
  if (checkWin(board, huPlayer)) {
    return -20 + depth
  } else if (checkWin(board, aiPlayer)) {
    return 20 - depth
  } else if (emptySquares(board).length === 0) {
    return 0
  }

  return 0
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), [])
  let gameWon = null
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player }
      break
    }
  }
  return gameWon
}

function emptySquares() {
  return origBoard.filter((s) => typeof s == "number")
}

function minimax(newBoard,depth,alpha,beta ,player) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, huPlayer) || checkWin(newBoard, aiPlayer) || availSpots.length === 0) {
      return { score: evaluateBoard(newBoard,depth, aiPlayer) };
  }

  var moves = [];

  for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      var result = minimax(newBoard,depth+1,alpha,beta, player === aiPlayer ? huPlayer : aiPlayer);
      move.score = result.score;

      newBoard[availSpots[i]] = move.index;

      moves.push(move);
      if (player === aiPlayer) {
          alpha = Math.max(alpha, move.score);
      } else {
          beta = Math.min(beta, move.score);
      }

      if (alpha >= beta) {
          break; 
      }
  }

  var bestMove;

  var bestScore = player === aiPlayer ? -Infinity : Infinity;

  for (var i = 0; i < moves.length; i++) {
      if ((player === aiPlayer && moves[i].score > bestScore) || (player === huPlayer && moves[i].score < bestScore)) {
          bestScore = moves[i].score;
          bestMove=i;
      }
  }

  return moves[bestMove];
}