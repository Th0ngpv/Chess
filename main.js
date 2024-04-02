//initialize
let legalSquares = [];
let isWhiteTurn = true;
const board = document.querySelectorAll(".square");
const pieces = document.querySelectorAll(".piece");
const piecesImages = document.querySelectorAll("img");

setupBoardSquares();
setupPieces();
//setup the board square
function setupBoardSquares() {
    //add drag and drop event listener
    //assign square.id
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener("dragover",allowDrop);
        board[i].addEventListener("drop",drop);
        let row = 8 - Math.floor(i/8);
        let column = String.fromCharCode(97 + (i % 8));
        let square = board[i];
        square.id = column + row;
    }
}
//setup the pieces
function setupPieces() {
    //add drag attribute and assign id for pieces
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart",drag);
        pieces[i].setAttribute("draggable",true);
        pieces[i].id = pieces[i].className.split(" ") + pieces[i].parentElement.id;
    }
    //remove drag attribute for piecesImages
    for (let i = 0; i < piecesImages.length; i++) {
        piecesImages[i].setAttribute("draggable",false);
    }
}
//prevent the default dragover event
function allowDrop(event) {
    event.preventDefault();
}
//transfer the piece.id as text during the drag and drop
function drag(event) {
    const piece = event.target;
    const pieceColor = piece.getAttribute("color");
    //check who turn is it 
    if ((isWhiteTurn && pieceColor === "white")||(!isWhiteTurn && pieceColor === "black")) {
        event.dataTransfer.setData("text",piece.id);
        // const startingSquareId = piece.parentNode.id;
        // getPossibleMoves(startingSquareId,piece);
    }
    
}
//get the piece id and location then append it to the current drop target
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSquare = event.currentTarget;
    let destinationSquareId = destinationSquare.id;
    //check if the destinationSquare is occupied and is it the same color
    if (isSquareOccupied(destinationSquare) === "blank") {
        destinationSquare.appendChild(piece);
        //switch turn
        isWhiteTurn = !isWhiteTurn;
        return;
    }
    if ((isSquareOccupied(destinationSquare) !== "blank")) {
        //remove the piece inside
        while (destinationSquare.firstChild) {
            destinationSquare.removeChild(destinationSquare.firstChild);
        }
        destinationSquare.appendChild(piece);
        //switch turn
        isWhiteTurn = !isWhiteTurn;
        return;
    }
}
//check if the square is occupied and return the color of the piece inside
function isSquareOccupied(square) {
    if (square.querySelector(".piece")) {
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    } else {
        return "blank";
    }
}