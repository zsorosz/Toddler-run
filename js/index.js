const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.style = "border: 1px solid black";

let gameOver = false;
let animateId;

const bgImg1 = new Image();
bgImg1.src = "../images/room.png";
const bgImg2 = new Image();
bgImg2.src = "../images/room.png";
let bg1X = 0;
let bg2X = canvas.width;

const babyImg = new Image();
babyImg.src = "../images/baby.png";
let babyY = 450;

const animate = () => {
  /////////Background animation//////////
  ctx.drawImage(bgImg1, bg1X, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg2, bg2X, 0, canvas.width, canvas.height);
  ctx.drawImage(babyImg, 100, babyY, 400, 400);

  bg1X -= 2;
  bg2X -= 2;

  if (bg1X < -canvas.width) {
    bg1X = canvas.width;
  }
  if (bg2X < -canvas.width) {
    bg2X = canvas.width;
  }

  if (!gameOver) {
    animateId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animateId);
  }
};

const startGame = () => {
  document.querySelector(".game-intro").style.display = "none";
  document.getElementById("game-board").style.display = "flex";
  animate();
};

window.onload = () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  //   startGame();
};
