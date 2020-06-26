// document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let blocks = Array.from(document.querySelectorAll('.grid div')) // each div gets an index number
    const scoreDisplay = document.querySelector('#score')
    const start = document.querySelector('#start-button')
    
    let score = 0
    const pieces = [l,z,t,o,i] // Array of all the pieces

    let timerId;

    let currentPos = 4 // position of the piece across the grid
    let direction = 0 // rotation of the piece

    let randomPiece = Math.floor(Math.random()*pieces.length) // returns index of a random piece from the pieces Array

    let currentPiece = pieces[randomPiece][direction]

    //draw a random piece
    function draw(){
        currentPiece.forEach( val =>{
            blocks[currentPos + val].classList.add('tetromino')
        })
    }

    // undraw the piece
    function erase()
    {
        currentPiece.forEach(val =>
            {
                blocks[currentPos + val].classList.remove('tetromino')
            })
    }

    
    //drop piece
    function moveDown(){
        erase()
        currentPos+= width
        draw()
        detectCollision()
    }

    // detect collsion
    function detectCollision()
    {
        if(currentPiece.some(val => blocks[currentPos + val + width].classList.contains('filled')))
        {
            currentPiece.forEach(val => {
                blocks[currentPos + val].classList.add('filled')
            })
            randomPiece = Math.floor(Math.random()*pieces.length)
            currentPiece = pieces[randomPiece][direction]
            currentPos = 4
            draw()
            addScore()
            endGame()
            
        }
    }

    function moveLeft() {
        erase()
        const leftWall = currentPiece.some(index => (currentPos + index) % width === 0)
        if (!leftWall) currentPos -= 1
        if (currentPiece.some(index => blocks[currentPos + index].classList.contains('filled'))) {
          currentPos += 1
        }
        draw()
      }

    function moveRight()
    {
        erase()
        const rightWall = currentPiece.some(index => (currentPos + index) % width === width - 1)
        if (!rightWall) currentPos += 1
        if (currentPiece.some(index => blocks[currentPos + index].classList.contains('filled'))) {
        currentPos -= 1
    }
    draw()
    }

    function rotatePiece()
    {
        erase()
        direction++
        if(direction === currentPiece.length)
        {
            direction = 0
        }
        currentPiece = pieces[randomPiece][direction]
        draw()

    }
    // controls
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
          case "ArrowLeft":
            moveLeft()
            break;
          case "ArrowRight":
            moveRight()
            break;
          case "ArrowUp":
              rotatePiece()
            break;
          case "ArrowDown":
              moveDown()
            break;
        }
      });

      start.addEventListener('click',() =>
      {
          if(timerId)
          {
              clearInterval(timerId)
              timerId = null
          }
          else{
              draw()
              timerId = setInterval(moveDown,1000)
          }
      })

    //   Clear rows & add score
       function addScore()
       {
           for(let i = 0; i < 199; i +=width)
           {
               const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9] // number of rows across the grid

               if(row.every(val => blocks[val].classList.contains('filled'))){
                   score+=100
                   scoreDisplay.innerHTML = score
                   row.forEach(val => {
                       blocks[val].classList.remove('filled')
                       blocks[val].classList.remove('tetromino')
                       
                   })
                   const clear = blocks.splice(i,width)
                   blocks = clear.concat(blocks)
                   blocks.forEach(square => grid.appendChild(square))
               }
           }
       }

        //end Game
        function endGame() {
            if (currentPiece.some(index => blocks[currentPos + index].classList.contains("filled")))
            {
                scoreDisplay.innerHTML = "end";
                clearInterval(timerId);
            }
        }

       

// })

