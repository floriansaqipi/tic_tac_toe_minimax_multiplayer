const socket = io()

const bg = document.querySelector(".bg");
const playAgain = document.querySelector("#play-again");
const goBack = document.querySelector("#go-back");
const endGame = document.querySelector(".endgame");
const cells = document.querySelectorAll('.box');
const currentTurnText = document.querySelector("#playerNameDisplay");

var origBoard;
let isPcFirst = isPcTurn;
let isFirstGame = true;
let playerTurn = true;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

huPlayer = humanSymbol;
aiPlayer = aiSymbol;

firstPlayer = isPcFirst ? aiPlayer : huPlayer;
playerTurn = !isPcFirst;

socket.on("connect", () => {
    console.log("You connected with id: ", socket.id)
    if (isPcFirst) {
        sendGetBestMoveToSocket()
    }
    socket.on("send-move", bestMoveIndex => {
        setTimeout(() => { turn(bestMoveIndex, aiPlayer); }, 500);
    })
})

function sendGetBestMoveToSocket() {
    socket.emit("get-best-move", {
        origBoard: origBoard,
        huPlayer: huPlayer,
        aiPlayer: aiPlayer,
    }, socket.id)
}


startGame();


function startGame() {
    changeFirstTime(firstPlayer);

    currentTurnText.innerHTML = isPcFirst ? "AI's Turn" : playerName + "'s turn";

    playAgain.style.display = "inline";
    goBack.style.display = "inline";
    endGame.style.display = "none";
    origBoard = Array.from(Array(9).keys());

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click', turnClick, false);
    }

    if (isPcFirst && !isFirstGame) {
        sendGetBestMoveToSocket();
        playerTurn = false;
    }
}

function changeFirstTime(player) {
    bg.style.display = "block";
    bg.style.left = (player === "X") ? "0px" : "85px";
}

function turnClick(square) {
    if (playerTurn && typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer);
        if (!checkWin(origBoard, huPlayer) && !checkTie()) {
            playerTurn = false;
            sendGetBestMoveToSocket();
            checkTie();
        }
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    changeTurn(player);
    changeDisplayText(player);

    let gameWon = checkWin(origBoard, player)
    if (gameWon) {
        gameOver(gameWon);
    } else {
        checkTie();
    }
    playerTurn = true;
}

function changeTurn(player) {

    if (player === aiPlayer) {
        bg.style.left = (player === "O") ? "85px" : "0px";

        setTimeout(() => {
            bg.style.left = (player === "O") ? "0px" : "85px";
        }, 500);
    }
    else {
        changeFirstTime(player)
    }
}

function changeDisplayText(player) {
    if (checkWin(origBoard, player) || checkTie()) {
        currentTurnText.innerHTML = "Game Over!";
    } else {
        currentTurnText.innerHTML = player === aiPlayer ? playerName + "'s Turn" : "AI's Turn";
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function checkTie() {
    if (emptySquares().length != 0) {
        return false;
    }
    else {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "none";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        bg.style.display = "none";

        return true;
    }
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
        gameWon.player == huPlayer ? "#08D9D6" : "#08D9D6";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    bg.style.display = "none";
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!");
}

function declareWinner(who) {
    endGame.style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
    isFirstGame = false;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}