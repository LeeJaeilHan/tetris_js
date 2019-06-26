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

function rotatePiece(piece) {
    let newPiece = [];
    for(let i=0; i<4; i++)
        newPiece[i] = piece[i].slice();
    let mid = 4/2;
    for(let i=0; i<mid; i++)
        for(let j=i; j<3-i; j++) {
            let tmp = newPiece[i][j];
            newPiece[i][j] = newPiece[3-j][i];
            newPiece[3-j][i] = newPiece[3-i][3-j];
            newPiece[3-i][3-j] = newPiece[j][3-i];
            newPiece[j][3-i] = tmp;
        }
    return newPiece;
}

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
TetrisGame.prototype.steerLeft = function(){
    if(isValid(this.rows,this.curPiece,this.pieceR,this.pieceC-1))
        this.pieceC-=1;
}
TetrisGame.prototype.steerRight = function(){
    if(isValid(this.rows,this.curPiece,this.pieceR,this.pieceC+1))
        this.pieceC+=1;
}
TetrisGame.prototype.steerDown = function(){
    if(isValid(this.rows,this.curPiece,this.pieceR+1,this.pieceC))
        this.pieceR+=1;
}
TetrisGame.prototype.fallDown = function(){
    while(isValid(this.rows,this.curPiece,this.pieceR+1,this.pieceC))
        this.pieceR+=1;
}
TetrisGame.prototype.rotate = function(){
    let newPiece = rotatePiece(this.curPiece);
    if(isValid(this.rows,newPiece,this.pieceR,this.pieceC))
        this.curPiece = newPiece;
}

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
                    game.steerRight();
                    break;
                case 'ArrowLeft':
                    game.steerLeft();
                    break;
                case 'ArrowDown':
                    game.steerDown();
                    break;
                case 'Space':
                    game.fallDown();
                    break;
                case 'ArrowUp':
                    game.rotate();
                    break;
                case 'Enter':
                    console.log('Enter');
                default:
                    break;            
            }
            draw(game);
        }
        window.addEventListener('keydown',setKeyboardEvent);
    }
    function pause() {
        
    }
}

tetrisRun();