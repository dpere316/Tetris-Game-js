// Game Piece
const width = 10 // the size of each block on grid

const colors = ['red','green','blue','teal','orange']

const l = [
  [1,width+1, width*2+1,2],
  [width,width+1,width+2,width*2+2],
  [1,width+1,width*2+1,width*2],
  [width,width*2,width*2+1,width*2+2]
]
const z = [
  [1,width+1,width,2],
  [1,width+1,width+2,width*2+2],
  [1,width+1,width,2],
  [1,width+1,width+2,width*2+2]
  
]

const t = [
  [width+1,1,width,width+2],
  [1,width+1,width+2,width*2+1],
  [width,width+1,width+2,width*2+1],
  [1,width+1,width,width*2+1]

]

const o = [
  [width,width+1,0,1],
  [width,width+1,0,1],
  [width,width+1,0,1],
  [width,width+1,0,1]

]
const i = [
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3],
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3]

]