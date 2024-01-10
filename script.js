let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

let emptyPostions = Array.from(boxes).filter(e => e.innerHTML === "").map(e => e.id);

if(isPc){
    playPc();
}

boxes.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
            updateEmptyPositions();
        }
    })
})

function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function cheakWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline"
            document.querySelector("#go-back").style.display = "inline"

            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

function cheakDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
            document.querySelector("#go-back").style.display = "inline"
        }
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#go-back").style.display = "none";

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})

function playPc(){
    if(isGameOver){
        return
    }
    let randomIndex = randomEmptyPostionIndex();
    console.log(randomIndex)
    if(randomIndex === -1) {
        return
    }
    boxes[randomIndex].innerHTML = turn;
    cheakWin();
    cheakDraw();
    changeTurn();
    updateEmptyPositions();
}

function updateEmptyPositions(){
    emptyPostions = Array.from(boxes).filter(e => e.innerHTML === "").map(e => e.id);
}

function randomEmptyPostionIndex(){
    if (!(emptyPostions.length > 0)){
        return -1;
    }
    let randomIdIndex = Math.floor(Math.random() * emptyPostions.length) 
    return emptyPostions[randomIdIndex];
}