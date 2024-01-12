var origBoard;
let isPc = isPcTurn;

huPlayer=symbol;
aiPlayer=symbol1;


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

const cells = document.querySelectorAll('.box');
startGame();


function startGame() {
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#go-back").style.display = "none";
    document.querySelector(".endgame").style.display = "none";
    
    origBoard = Array.from(Array(9).keys());
    
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click', turnClick, false);
    }
    
    if (isPc) {
        
        turn(bestSpot(), aiPlayer);
    }
}

function turnClick(square) {
     if (typeof origBoard[square.target.id] == 'number') {
            turn(square.target.id, huPlayer);
            if (!checkWin(origBoard, huPlayer) && !checkTie()) {
                turn(bestSpot(), aiPlayer);
				checkTie();
               
            }
		 }
   
}


function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}


function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
    document.querySelector("#play-again").style.display = "inline"
    document.querySelector("#go-back").style.display = "inline"
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
        document.querySelector("#play-again").style.display = "inline"
        document.querySelector("#go-back").style.display = "inline"
		return true;
	}
	return false;
}

function evaluateBoard(board, player) {
   //todo
}


function minimax(newBoard, player) {
  //todo
}
