// Global Variables
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const block = 20; // one block in the grid is 20px by 20px

const all = []; // array of objects

const PIECES = {
  shape: [Z, S, T, J, L, I, O],
  shapeType: ["Z", "S", "T", "J", "L", "I", "O"],
  color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
};

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
//setTimeout(function(){window.cancelAnimationFrame(id)}, 10000)
// Function that creates the game piece shapes: if column index === 1 then fillBlock()
function drawPieces() {
  // all.forEach(one => {
  // console.log(one.x)

  let rest = [...all];
//   rest.shift();
  rest.forEach((o,p) => {
    console.log(o.piece)
    o.piece[o.direction].forEach((row, i) => {
      let x = i;
      row.forEach((c, j) => {
        
          let one = all[0];
          one.free = true;
          one.move = true;
          one.moveRight = true;
          one.moveDown = true;

          console.log(c,j * block + o.x, x * block + o.y)
          let otherPiece = {x:j * block + o.x, y: i* block + o.y, c:c }

          one.piece[one.direction].forEach((row, i) => {
            row.forEach((col, j) => {
              if (col === 1) {
                if (j * block + one.x === 0) {
                  one.move = false;
                }
                if (j * block + one.x === canvas.width - 20) {
                  one.moveRight = false;
                }
                //  console.log(c,j * block + o.x, i * block + o.y)
                console.log(i * block + one.y )
                if(p!=0 && otherPiece.c===1 && ((i * block + one.y) === (otherPiece.y - 20 ))){
                    console.log('hit another peice')
                    one.moveDown = false;
                }

                if (i * block + one.y === canvas.height - 20 )//|| i * block + one.y === o.y - 20) 
                {
                  one.moveDown = false;
                  one.move = false;
                  one.moveRight = false;
                  if (one.current) {
                    addPiece();
                    one.current = false;
                  }
                }

                // fillBlock(j * block + one.x, i * block + one.y, one.color);
              }
            });

          });
          if (c === 1)
          {

          
          fillBlock(j * block + o.x, i * block + o.y, o.color);
         }
      });
    });
  });
}

function detectCollision() {}
// Function that adds gamePiece to board
function addPiece() {
  let piece = randomElement();

  let fullPiece = {
    current: true,
    piece: piece,
    x: 0,
    y: 0,
    direction: 0,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };
  all.unshift(fullPiece);
}

// Function has last game piece drops
setInterval(() => {
  if (all[0].moveDown) {
    all[0].y += 20;
  }
}, 5000);

//Keyboard controls
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      if (all[0].move) {
        all[0].x -= 20;
      }
      break;
    case "ArrowRight":
      if (all[0].moveRight) {
        all[0].x += 20;
      }
      break;
    case "ArrowUp":
      if (all[0].move && all[0].moveRight && all[0].moveDown) {
        if (all[0].direction >= all[0].piece.length - 1) {
          all[0].direction = 0;
        } else {
          all[0].direction++;
        }
      }
      break;
    case "ArrowDown":
      if (all[0].moveDown) {
        all[0].y += 20;
      }
      break;
  }
});

addPiece();
//Game Engine .... Loops forever and draws everything
function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Erases everything
  drawPieces();
  //addPiece()
}

animate(); // Starts game
