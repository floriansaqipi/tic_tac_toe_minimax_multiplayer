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
