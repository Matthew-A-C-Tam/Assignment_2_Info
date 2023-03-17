document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const gameWidth = document.documentElement.clientWidth * 0.7;
    const gameHeight = document.documentElement.clientHeight * 0.7;
    gameBoard.style.width = `${gameWidth}px`;
    gameBoard.style.height = `${gameHeight}px`;
  
    const userPaddle = document.getElementById("userPaddle");
    const aiPaddle = document.getElementById("aiPaddle");
    const ball = document.getElementById("ball");
    const userScoreElem = document.getElementById("userScore");
    const aiScoreElem = document.getElementById("aiScore");
    const message = document.getElementById("message");
    const startButton = document.getElementById("startButton");
  
    let userPoints = 0;
    let aiPoints = 0;
    let gameInterval;
    let ballSpeedX = 5;
    let ballSpeedY = 5;
  
    gameBoard.addEventListener("mousemove", (event) => {
      const rect = gameBoard.getBoundingClientRect();
      let userPaddleY = event.clientY - rect.top - userPaddle.offsetHeight / 2;
      userPaddle.style.top = `${Math.max(Math.min(userPaddleY, gameBoard.offsetHeight - userPaddle.offsetHeight), 0)}px`;
    });
  
    startButton.addEventListener("click", () => {
      startGame();
    });
  
    function startGame() {
      clearInterval(gameInterval);
  
      userPoints = 0;
      aiPoints = 0;
      userScoreElem.innerText = userPoints;
      aiScoreElem.innerText = aiPoints;
      message.innerText = "";
  
      ball.style.display = "block";
      userPaddle.style.display = "block";
      aiPaddle.style.display = "block";
  
      resetBall();
      gameInterval = setInterval(gameLoop, 1000 / 60);
    }
  
    function resetBall() {
      ball.style.left = `${gameBoard.offsetWidth / 2 - ball.offsetWidth / 2}px`;
      ball.style.top = `${gameBoard.offsetHeight / 2 - ball.offsetHeight / 2}px`;
      ballSpeedX = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * (7 - 3 + 1)) + 3);
      ballSpeedY = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * (5 - 2 + 1)) + 2);
    }
  
    function gameLoop() {
      ball.style.left = `${parseInt(ball.style.left) + ballSpeedX}px`;
      ball.style.top = `${parseInt(ball.style.top) + ballSpeedY}px`;
  
      let aiPaddleY = parseInt(ball.style.top) - aiPaddle.offsetHeight / 2;
      aiPaddle.style.top = `${Math.max(Math.min(aiPaddleY, gameBoard.offsetHeight - aiPaddle.offsetHeight), 0)}px`;
  
      checkCollisions();
      checkScore();
    }
  
    function checkCollisions() {
      let ballRect = ball.getBoundingClientRect();
      let userPaddleRect = userPaddle.getBoundingClientRect();
      let aiPaddleRect = aiPaddle.getBoundingClientRect();
  
      if (ballRect.left <= userPaddleRect.right && ballRect.right >= userPaddleRect.left &&
        ballRect.top <= userPaddleRect.bottom && ballRect.bottom >= userPaddleRect.top) {
        ballSpeedX = -ballSpeedX;
      }
  
      if (ballRect.left <= aiPaddleRect.right && ballRect.right >= aiPaddleRect.left &&
        ballRect.top <= aiPaddleRect.bottom && ballRect.bottom >= aiPaddleRect.top) {
        ballSpeedX = -ballSpeedX;
      }
  
      if (parseInt(ball.style.top) <= 0 || parseInt(ball.style.top) + ball.offsetHeight >= gameBoard.offsetHeight) {
        ballSpeedY = -ballSpeedY;
      }
    }
  
    function checkScore() {
      if (parseInt(ball.style.left) <= 0) {
        aiPoints++;
        aiScoreElem.innerText = aiPoints;
        message.innerText = "AI got a point";
        if (aiPoints < 20) {
          resetBall();
        } else {
          endGame("AI wins");
        }
      }
  
      if (parseInt(ball.style.left) + ball.offsetWidth >= gameBoard.offsetWidth) {
        userPoints++;
        userScoreElem.innerText = userPoints;
        message.innerText = "User got a point";
        if (userPoints < 20) {
          resetBall();
        } else {
          endGame("User wins");
        }
      }
    }
  
    function endGame(winnerText) {
      clearInterval(gameInterval);
      message.innerText = winnerText;
      startButton.innerText = "Restart Game";
    }
  });
  