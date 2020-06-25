// Global Variables
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")
const block = 20;

let shapes = [Z, S, T, J, L, I, O]

function getTetromino() {
    const color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
    let shape = shapes[0]//Math.floor(Math.random() * shapes.length)]
    .map(shape => shape.map(row=> row.map(e => {return {val: e, color: e===1?color:'white'}})))
    ;
    return {
            shape ,
            x: 0,
            y: 0,
            color, 
            direction: 0
    }
}

let tetrominos = 
{
    shape: [Z, S, T, J, L, I, O],
    x: 0,
    y: 0,
    color:"#" + ((1 << 24) * Math.random() | 0).toString(16)
}
 
function randomElement() {
    return tetrominos.shape[Math.floor(Math.random() * tetrominos.shape.length)];
}

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
            // console.log(grid[i])
            fillBlock( j*block + x , i*block + y , grid[i][j].color)
            
        }
        grid.push(row);
        
    }
    
}


let piece = getTetromino();

function drawPiece(piece, grid) {
    piece.shape[piece.direction].forEach((row,i) => {
        grid[piece.x+i].splice(piece.y, row.length, ...row);
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

drawPiece(piece, grid)
// Function that fills block

function fillBlock(x, y, color) 
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, block, block);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, block, block);
}


// Pieces

function drawPieces() 
{
    for(let i = 0; i < tetrominos.shape.length; i++)
    {
        //console.log(tetrominos.shape[i])

        let direction = tetrominos.shape[i]
        
        for(let j = 0; j < direction.length;j++)
        {
            let row = direction[j]
         //console.log(row)
        for(let k = 0; k < row.length;k++)
        {
            //console.log(row[k])

            if(row[k] === 1)
            {
                fillBlock( direction[j]*block + tetrominos.x, row[k]*block + tetrominos.y, 'red')
            }
            
            
        }

        }

    }

}
// move all pieces down
// check for row completion
// detect collision
function moveDown() {
    for(let i = grid.length-1; i >=0; i--) {
        let rCopy = grid[i].map(e=>e)
        let nextRCopy;
        if(i < grid.length-2)
            nextRCopy = grid[i+1].map(e=>e);

        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j].color !== 'white' && i < grid.length-1 ) {
                if(grid[i+1][j].color === 'white' &&
                 grid[i+1].every(e => e.color !== grid[i][j].color)) {
                     [nextRCopy[j],rCopy[j]] = [rCopy[j],nextRCopy[j]];
                 }
            }
                //compare i-1 row and see if there is athing else in j spot
                //also compare i-1 row to check if there is that color
        }
        grid[i] = rCopy;
        if(i < grid.length-2)
            grid[i+1] = nextRCopy
    }
    
}
for(let i = 0; i < 15; i++) {
    moveDown()
}

drawPieces()
//let piece = addPiece()
//Game Engine .... Loops forever and draws everything 
function animate() { 
    id = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height) //Erases everything 
    drawGrid()
    //drawPiece(piece, grid)
    //drawPieces()
    //addPiece()

}




animate() // Starts game
