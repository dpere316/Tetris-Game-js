// Global Variables
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const block = 20; // one block in the grid is 20px by 20px

const all = [] // array of objects

const PIECES = 
{
    shape: [Z, S, T, J, L, I, O],
    shapeType: ['Z', 'S', 'T', 'J', 'L', 'I', 'O'],
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
        // console.log(one.x)
        one.free = true  
        one.move = true
        one.moveRight = true
        one.moveDown = true
        
        one.piece[one.direction].forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === 1) 
                {
                    if(one.current){

                        let allOthers = [...all]
                        allOthers.shift()
                        // console.log(allOthers)
                    
                        // detectCollision()
                        allOthers.forEach(other => {
                            other.piece[other.direction].forEach((r,it) =>
                            {
                                r.forEach((c,jk)=>
                                {
                                    if(c === 1)
                                    {
                                        if(j*block + one.x === other.x + jk*block)
                                        {
                                            // console.log(j*block + one.x , other.x + jk*block)
                                            one.move = false
                                        }
                                        if(i*block + one.y === other.y + jk*block)
                                        {
                                            one.moveDown = false
                                            one.move = false
                                            one.moveRight =false
                                            // one.current = false
                                            // addPiece()
                                        
                                            
                                        }
                                        if(j*block + one.x === other.x)
                                        {

                                            one.moveRight = false

                                        }

                                    }

                                })
                            })
                        })
                    }
                    if(j*block + one.x === 0)
                    {
                        one.move = false
                    }
                    if(j*block + one.x === canvas.width - 20)
                    {
                        one.moveRight = false
                    }
                    if(i*block + one.y === canvas.height - 20)
                    {
                        one.moveDown = false
                        one.move = false
                        one.moveRight = false
                        if(one.current)
                        {
                            addPiece()
                            one.current = false

                        }
                        
                    }


                    fillBlock( j*block + one.x, i*block + one.y, one.color)
                }

            })
        })
    })
}

function detectCollision()
{

}
// Function that adds gamePiece to board
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
    all.unshift(fullPiece)
}


// Function has last game piece drops
setInterval(() => {
    if(all[0].moveDown)
    {
        all[0].y += 20
    }
     

}, 5000)


//Keyboard controls
document.addEventListener('keydown', function (event) {

    switch (event.key) {
        case "ArrowLeft":
          
           if(all[0].move) 
           {
               all[0].x -= 20
           }
            break
        case "ArrowRight":
            if(all[0].moveRight) 
            {

                all[0].x += 20

            }
            break
        case "ArrowUp":
            if(all[0].move && all[0].moveRight && all[0].moveDown)
            {
                if(all[0].direction >= all[0].piece.length-1)
                {
                    all[0].direction = 0
                }
                else
                {
                    all[0].direction++
                }
            }
            break
        case "ArrowDown":
            if(all[0].moveDown)
            {
                all[0].y += 20
            }
            break
        
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

