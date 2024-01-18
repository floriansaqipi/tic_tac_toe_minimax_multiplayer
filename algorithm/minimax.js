let origBoard
let huPlayer
let aiPlayer

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

exports.initalizeGameState = (gameState) => {
  origBoard = gameState.origBoard
  huPlayer = gameState.huPlayer
  aiPlayer = gameState.aiPlayer
}

exports.bestSpot = () => {
  return minimax(origBoard, 0, -10000, 10000, aiPlayer).index
}


function minimax(newBoard, depth, alpha, beta, player) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, huPlayer) || checkWin(newBoard, aiPlayer) || availSpots.length === 0) {
    return { score: evaluateBoard(newBoard, depth) };
  }

  var moves = generateMoves(newBoard, depth, alpha, beta, player, availSpots);
  var bestMove = findBestMove(player, moves);

  return moves[bestMove];
}


function emptySquares() {
  return origBoard.filter((s) => typeof s == "number")
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

function evaluateBoard(board, depth) {
  return checkWin(board, huPlayer) ? -20 + depth :
    checkWin(board, aiPlayer) ? 20 - depth :
      emptySquares(board).length === 0 ? 0 : 0;
}

function generateMoves(newBoard, depth, alpha, beta, player, availSpots) {
  var moves = [];

  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    var result = minimax(newBoard, depth + 1, alpha, beta, player === aiPlayer ? huPlayer : aiPlayer);
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

  return moves;
}

function findBestMove(player, moves) {
  var bestMove;

  var bestScore = player === aiPlayer ? -Infinity : Infinity;

  for (var i = 0; i < moves.length; i++) {
    if ((player === aiPlayer && moves[i].score > bestScore) || (player === huPlayer && moves[i].score < bestScore)) {
      bestScore = moves[i].score;
      bestMove = i;
    }
  }
  return bestMove;
}