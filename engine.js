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
        for(let j = 0; j < COLS; j++)
        {
            let x = 0;
            let y = 0
            fillBlock( j*block + x , i*block + y , 'white')
            
        }
        
    }
    
}

//Pieces
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

//Game Engine .... Loops forever and draws everything 
function animate() { 
    id = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height) //Erases everything 
    drawGrid()
    //drawPieces()
    //addPiece()

}

animate() // Starts game
