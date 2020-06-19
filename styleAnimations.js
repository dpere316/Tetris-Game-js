// Generates a random color in hexadecimal (ie. #62b9cc)

function generateRandomColor() {
  return '#'+ Math.floor(Math.random()*16777215).toString(16);
}

// Changes the color of the background using STYLE

function changeBackgroundColor() {
  var colorBg =   document.getElementById("color-overlay")
  colorBg.style.backgroundColor = generateRandomColor();
}

function changeBackground() {
    changeBackgroundColor();
  }
  
  // Run this function every 300ms
  setInterval(changeBackground, 800);