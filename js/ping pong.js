document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const userPaddle = document.getElementById("userPaddle");
    const aiPaddle = document.getElementById("aiPaddle");
    const ball = document.getElementById("ball");
    const userScore = document.getElementById("userScore");
    const aiScore = document.getElementById("aiScore");
    const message = document.getElementById("message");
    const startButton = document.getElementById("startButton");
  
    let gameInterval;
    let ballSpeedX = 5;
    let ballSpeedY = 5;
    let userPoints = 0;
    let aiPoints = 0;
    let userPaddleY = 150;
    let aiPaddleY = 150;
  
    gameBoard.addEventListener("mousemove", (event) => {
      const rect = gameBoard.getBoundingClientRect();
      userPaddleY = event.clientY - rect.top - userPaddle.offsetHeight / 2;
    });
  
    startButton.addEventListener("click", () => {
      startGame();
    });
  
    function startGame() {
        clearInterval(gameInterval);
      
        // Show the ball and paddles when the game starts
        ball.style.display = "block";
        userPaddle.style.display = "block";
        aiPaddle.style.display = "block";
      
        ball.style.left = `${315}px`;
        ball.style.top = `${175}px`;
        resetBall();
        gameInterval = setInterval(gameLoop, 1000 / 60);
      }      
      
      function gameLoop() {
        ball.style.left = `${parseInt(ball.style.left) + ballSpeedX}px`;
        ball.style.top = `${parseInt(ball.style.top) + ballSpeedY}px`;
      
        userPaddle.style.top = `${Math.max(Math.min(userPaddleY, gameBoard.offsetHeight - userPaddle.offsetHeight), 0)}px`;
        aiPaddleY = parseInt(ball.style.top) - aiPaddle.offsetHeight / 2;
        aiPaddle.style.top = `${Math.max(Math.min(aiPaddleY, gameBoard.offsetHeight - aiPaddle.offsetHeight), 0)}px`;
      
        checkCollisions();
        checkScore();
      
        if (parseInt(ball.style.left) < 0 || parseInt(ball.style.left) + ball.offsetWidth > gameBoard.offsetWidth) {
          ballSpeedX = -ballSpeedX;
        }
      
        if (parseInt(ball.style.top) < 0 || parseInt(ball.style.top) + ball.offsetHeight > gameBoard.offsetHeight) {
          ballSpeedY = -ballSpeedY;
        }
      }
      
  
    function resetBall() {
      ball.style.left = "315px";
      ball.style.top = "175px";
      ballSpeedX = -ballSpeedX;
    }
  
    function checkCollisions() {
      if (
        (parseInt(ball.style.top) >= parseInt(userPaddle.style.top) &&
          parseInt(ball.style.top) <= parseInt(userPaddle.style.top) + userPaddle.offsetHeight &&
          parseInt(ball.style.left) <= 40) ||
        (parseInt(ball.style.top) >= parseInt(aiPaddle.style.top) &&
          parseInt(ball.style.top) <= parseInt(aiPaddle.style.top) + aiPaddle.offsetHeight &&
          parseInt(ball.style.left) >= 590)
      ) {
        ballSpeedX = -ballSpeedX;
      }
  
      if (parseInt(ball.style.top) <= 0 || parseInt(ball.style.top) >= 350) {
        ballSpeedY = -ballSpeedY;
      }
    }
  
    function checkScore() {
      if (parseInt(ball.style.left) <= 0) {
        aiPoints++;
        aiScore.innerText = aiPoints;
        message.innerText = "AI got a point";
        resetBall();
        checkGameOver();
      }
  
      if (parseInt(ball.style.left) >= 630) {
        userPoints++;
        userScore.innerText = userPoints;
        message.innerText = "User got a point";
        resetBall();
        checkGameOver();
      }
    }
  
    function checkGameOver() {
      if (userPoints >= 20 || aiPoints >= 20) {
        clearInterval(gameInterval);
        message.innerText = userPoints >= 20 ? "User wins" : "AI wins";
        startButton.innerText = "Restart Game";
    }
  }
});
  