const TICK_MS = 200;
const WIDTH = 10;
const HEIGHT = 20;
const board = document.querySelector("#board");
const pieces = [
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [0,0,1,0],
        [0,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
    ],
    [
        [0,1,1,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0]
    ],
    [
        [0,1,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,0,0]
    ],
    [
        [0,1,0,0],
        [0,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
    ]
];

function isValid(rows,piece,R,C){
    for(let i=0; i<4; i++)
        for(let j=0; j<4; j++) {
            if(!piece[i][j]) continue;
            if(R+i>=HEIGHT || C+j>=WIDTH || C+j < 0 || rows[R+i][C+j])
                return false;
        }
    return true;
}


function draw(game) {
    const rows = game.getRows();
    rows.forEach(function(tr,i){
        tr.forEach(function(td,j){
            if(td)
                board.children[i].children[j].className = 'orange';
            else
                board.children[i].children[j].className = 'white';
        });
    });
}
function applyPiece(rows,piece,R,C){
    let newRows = [];
    for(let i=0; i<rows.length; i++)
        newRows[i] = rows[i].slice();
    for(let i=0; i<4; i++)
        for(let j=0; j<4; j++)
            if(piece[i][j])
                newRows[R+i][C+j] = 1;
    return newRows;
}
function randomPiece() {
    return pieces[Math.floor(Math.random()*pieces.length)];
};

function TetrisGame(){
    this.gameover = false;
    this.curPiece = randomPiece();
    this.nextPiece = randomPiece();
    this.pieceR=0;
    this.pieceC=3;
    this.rows = Array(HEIGHT).fill(Array(WIDTH).fill(0));
}
TetrisGame.prototype.tick = function() {
    if(this.gameover)
        return false;
    if(isValid(this.rows,this.curPiece,this.pieceR+1,this.pieceC)){
        this.pieceR+=1;
    } else {
        this.rows = applyPiece(this.rows,this.curPiece,this.pieceR,this.pieceC);
        this.pieceR=0;
        this.pieceC=3;
        if(!isValid(this.rows,this.nextPiece,this.pieceR,this.pieceC)){
            this.gameover = true;
            return false;
        }
        this.curPiece = this.nextPiece;
        this.nextPiece = randomPiece();
        
    }
    return true;
};
TetrisGame.prototype.getRows = function(){
    return applyPiece(this.rows,this.curPiece,this.pieceR,this.pieceC);
};



function tetrisRun() {
    const game = new TetrisGame();
    makeBoard();
    play();
    function makeBoard() {
        const fragment = document.createDocumentFragment();
        [...Array(HEIGHT).keys()].forEach((row,i)=>{
            const tr = document.createElement('tr')
            fragment.appendChild(tr);
            [...Array(WIDTH).keys()].forEach((col,j)=>{
                const td = document.createElement('td')
                tr.appendChild(td);
            })
        });
        board.appendChild(fragment);
    }
    function play(){
        window.setInterval(function(){
            if(game.tick()) {
                draw(game);
            }
        }, TICK_MS);
        function setKeyboardEvent(e){
            switch(e.code) {
                case 'ArrowRight':
                    console.log('ArrowRight');
                    break;
                case 'ArrowLeft':
                    console.log('ArrowLeft');
                    break;
                case 'ArrowDown':
                    console.log('ArrowDown');
                    break;
                case 'Space':
                    console.log('space');
                    break;
                case 'ArrowUp':
                    console.log('ArrowUp');
                    break;
                case 'Enter':
                    console.log('Enter');
                default:
                    break;            
            }
        }
        window.addEventListener('keydown',setKeyboardEvent);
    }
    function pause() {
        
    }
}

tetrisRun();