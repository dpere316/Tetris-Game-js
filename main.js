// Global Variables

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const block = 20; // one block in the grid is 20px by 20px

const all = [] // array of objects

const PIECES = 
{
    shape: [Z, S, T, J, L, I, O],
    color: "#" + ((1 << 24) * Math.random() | 0).toString(16)
}

// Function to randomly select game piece
function randomElement() {
    return PIECES.shape[Math.floor(Math.random() * PIECES.shape.length)];
}

// Function that fills block
function fillBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, block, block);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, block, block);
}

// Function that creates the game piece shapes: if column index === 1 then fillBlock()
function drawPieces() {

    all.forEach(one => {
        one.piece[one.direction].forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === 1) 
                {
                    fillBlock( j*block + one.x, i*block + one.y, one.color)
                }

            })
        })
    })
}




// Function that adds gamePiece to board
function addPiece() {
    let piece = randomElement()

    let fullPiece = {
        piece: piece,
        x: 0,
        y: 0,
        direction: 0,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    all.unshift(fullPiece)
}


// Function has last game piece drops
setInterval(() => {
    all[0].y += 20 

}, 1000)


function detectCollision(){
    all.forEach(one =>{


    })
}

//Keyboard controls
document.addEventListener('keydown', function (event) {
    
    switch (event.key) {
        case "ArrowLeft":
           if(all[0].x - 20 >= 0) 
           {
               all[0].x -= 20
           }
            break
        case "ArrowRight":
            if(all[0].x + 20 <= canvas.width)
            {
                all[0].x += 20
            }   
            break
        case "ArrowUp":
            if(all[0].direction + 1 < all[0].piece.length){
                all[0].direction++
            }
            else{
                all[0].direction = 0
            }
            break
        case "ArrowDown":
            all[0].y += 20
            break
        case " ":
    }
})

addPiece()
//Game Engine .... Loops forever and draws everything 
function animate() { 
    id = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height) //Erases everything 
    drawPieces()
    //addPiece()

}

animate() // Starts game

