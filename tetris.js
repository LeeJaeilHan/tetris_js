let board = document.querySelector("#board");
let boardData = [];
let blockArr = [
    ['red',true,[
        [1,1],
        [1,1],
    ]],
    ['blue',true,[
        [2,2,2,2],
    ]],
    ['orange',true,[
        [0,3,0],
        [3,3,3],
    ]],
    ['skyblue',true,[
        [4,0,0],
        [4,4,4],
    ]],
    ['yellow',true,[
        [0,0,5],
        [5,5,5],
    ]],
    ['yellowgreen',true,[
        [0,6,6],
        [6,6,0],
    ]],
    ['pink',true,[
        [7,7,0],
        [0,7,7],
    ]],
]
let blockDict = {
    0:['white',false,[]],
    1:['red',true,[
        [1,1],
        [1,1],
    ]],
    2:['blue',true,[
        [1,1,1,1],
    ]],
    3:['orange',true,[
        [0,1,0],
        [1,1,1],
    ]],
    4:['skyblue',true,[
        [1,0,0],
        [1,1,1],
    ]],
    5:['yellow',true,[
        [0,0,1],
        [1,1,1],
    ]],
    6:['yellowgreen',true,[
        [0,1,1],
        [1,1,0],
    ]],
    7:['pink',true,[
        [1,1,0],
        [0,1,1],
    ]],
    10:['red',false,[]],
    20:['blue',false,[]],
    30:['orange',false,[]],
    40:['skyblue',false,[]],
    50:['yellow',false,[]],
    60:['yellowgreen',false,[]],
    70:['pink',false,[]],
}

function makeBoard(){
    let fragment = document.createDocumentFragment();
    for(let i=0; i<20; i++) {
        let tr = document.createElement("tr");
        fragment.appendChild(tr);
        for(let j=0; j<10; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
    }
    board.appendChild(fragment);
}

function drawScreen(){
    boardData.forEach(function(tr,i){
        tr.forEach(function(td,j){
            board.children[i].children[j].className = blockDict[td][0];
        });
    });
}

function createBlock(){
    let block = blockArr[Math.floor(Math.random()*7)][2];
    block.forEach(function(tr,i){
        boardData[i] = [];
        tr.forEach(function(td,j){
            boardData[i][j+3] = td;
        });
    });
    drawScreen();
}

makeBoard();
createBlock();