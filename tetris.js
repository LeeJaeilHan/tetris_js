let board = document.querySelector("#board");

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
    console.log(board,fragment);
    board.appendChild(fragment);
}

makeBoard();