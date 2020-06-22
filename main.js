// Game engine

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

// Function to randomly select game piece
function randomElement(array)
{
    return piece = array[Math.floor(Math.random() * PIECES.length)];
}

// I need a function that rotates and moves the game piece
function movement()
{

}

// I need a function that fills in the pieces with a color
function fillPiece()
{
    
}


// I need collision detection for the (left and right wall) and for game pieces


// This creates a red block
drawBlock(0,0,'red')

function drawBlock(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, block, block);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, block, block);
  }
