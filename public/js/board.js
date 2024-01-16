var origBoard;
let isPc = isPcTurn;

huPlayer=symbol;
aiPlayer=symbol1;

const socket = io()

socket.on("connect", () => {
    console.log("You connected with id: ", socket.id)
    if (isPc) {
      socket.emit("get-best-move", {
          origBoard: origBoard,
          isPc: isPc,
          huPlayer: huPlayer,
          aiPlayer: aiPlayer,
        }, socket.id)   
  }
  socket.on("send-move", bestMoveIndex => {
    console.log(bestMoveIndex);
    setTimeout(() => { turn(bestMoveIndex, aiPlayer); }, 500);
})
  })

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
    document.querySelector("#play-again").style.display = "inline";
    document.querySelector("#go-back").style.display = "inline";
    document.querySelector(".endgame").style.display = "none";
    
    origBoard = Array.from(Array(9).keys());
    
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
           turn(square.target.id, huPlayer);
           if (!checkWin(origBoard, huPlayer) && !checkTie()) {
               socket.emit("get-best-move", {
                   origBoard: origBoard,
                   isPc: isPc,
                   huPlayer: huPlayer,
                   aiPlayer: aiPlayer,
                 }, socket.id)
               checkTie();
           }
        }
}


function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
    changeTurn(player);
	let gameWon = checkWin(origBoard, player)
	if (gameWon) {
        gameOver(gameWon);
    } else {
        checkTie();
    }
  
}

function changeTurn(player) {
    if (player==="X") {
        
        document.querySelector(".bg").style.left = "85px";
        
    } else if(player==="O") {
       
        document.querySelector(".bg").style.left = "0";
    }
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
			gameWon.player == huPlayer ? "#08D9D6" : "#08D9D6";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!");
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

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "none";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
        document.querySelector("#play-again").style.display = "inline"
        document.querySelector("#go-back").style.display = "inline"
		return true;
	}
	return false;
}