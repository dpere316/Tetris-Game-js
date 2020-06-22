//   Game board 

const ROW = 20;
const Col = 10;

// Uses map() to create a gameboard that is 20 x 10
function drawBoard(){

    let gameBoard = Array(ROW).fill().map(() =>
    {
        Array(Col)
    }
    )
    return gameBoard
}

drawBoard();

