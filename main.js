//initialize
let legalSquares = [];
const board = document.querySelectorAll(".square");
const pieces = document.querySelectorAll(".piece");
const piecesImages = document.querySelectorAll("img");
//setup the board square's ID
function setupBoardSquares() {
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener("dragover",allowDrop);
        board[i].addEventListener("drop",drop);
        let row = 8 - Math.floor(i/8);
        let column = String.fromCharCode(97 + (i % 8));
        let square = board[i];
        square.id = column + row;
    }
}