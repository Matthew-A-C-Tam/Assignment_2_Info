// get the canvas element and context
const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');

// function to resize the canvas to fit the browser window
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.6;
  canvas.height = window.innerHeight * 0.6;
}

// resize the canvas whenever the browser window is resized
window.addEventListener('resize', resizeCanvas);

// resize the canvas initially
resizeCanvas();

// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// User Paddle
const user = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// COM Paddle
const com = {
    x : canvas.width - 10 - 10, // right side of canvas, subtract paddle width
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}


// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}


// draw the net
function drawNet() {
    const netWidth = 2;
    const netHeight = canvas.height;
    const gap = 15;
  
    const x = (canvas.width - netWidth) / 2;
  
    ctx.fillStyle = 'white';
    for (let i = 0; i < netHeight; i += gap) {
      ctx.fillRect(x, i, netWidth, gap - 5);
    }
  }
  

// draw text
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}
