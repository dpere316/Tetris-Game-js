// Global Variables
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")
const block = 20;

//Grid 
const COLS = 10;
const ROWS = 20;
function drawGrid ()
{
    for(let i = 0; i < ROWS; i++)
    {   
        let row  = [];
        for(let j = 0; j < COLS; j++)
        {   
            row.push(0)
            let x = 0;
            let y = 0
            fillBlock( j*block + x , i*block + y , grid[i][j].color)
            
        }
        grid.push(row);
        
    }
    
}

const PIECES = 
{
    shape: [Z, S, T, J, L, I, O],
    shapeType: ['Z', 'S', 'T', 'J', 'L', 'I', 'O'],
    color: "#" + ((1 << 24) * Math.random() | 0).toString(16)
}

function drawPiece(piece, grid) {
    piece.piece.forEach((row,i) => {
        /// grid[piece.x+i].splice(piece.y, row.length, row);
    })
}

function generateGrid ()
{
    return Array.from({length: ROWS}, (_) => {
        return Array.from({length: COLS}, (_)=> { return {
            val: 0,
            color: "white"
        }})
    })
}
let grid = generateGrid();
console.log(grid);
// Pieces
let tetrominos = [Z, S, T, J, L, I, O]


// Function that fills block
function fillBlock(x, y, color) 
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, block, block);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, block, block);
}

// Function that creates the game piece shapes: if column index === 1 then fillBlock()
function drawPieces() 
{
    
    
}
let piece = addPiece()
//Game Engine .... Loops forever and draws everything 
function animate() { 
    id = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height) //Erases everything 
    drawGrid()
    drawPiece(piece, grid)
    //drawPieces()
    //addPiece()

}

function addPiece() {
    let piece = randomElement()

    let fullPiece = {
        current: true,
        piece: piece,
        x: 0,
        y: 0,
        direction: 0,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    return fullPiece
}


function randomElement() {
    return PIECES.shape[Math.floor(Math.random() * PIECES.shape.length)];
}

animate() // Starts game
