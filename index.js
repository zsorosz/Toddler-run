const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.style = "border: 1px solid black";

///////////Game States///////////
let gameOver;
let gameInProg = false;
let animateId;
let score = 0;
let lives = 3;

//////////////Backgrounds////////////
const bgImg1 = new Image();
bgImg1.src = "./images/room2.jpg";
const bgImg2 = new Image();
bgImg2.src = "./images/room2.jpg";
let bg1X = 0;
let bg2X = 1500;

//////////////Character//////////////
const babyImg = new Image();
babyImg.src = "./images/baby.png";
let babyY = 250;
let babyWidth = 350;
let babyHeight = 350;

///////////////Game over images//////////////
const hulkImg = new Image();
hulkImg.src = "./images/hulk.png";

const smashImg = new Image();
smashImg.src = "./images/smash.png";

//////////////Sound////////////
let audio = new Audio("./audio/iron-man-01.mp3");
audio.volume = 0.1;
let crash = new Audio("./audio/crash-6711.mp3");
audio.volume = 0.2;
let inputCorrect = new Audio("./audio/button-09a.mp3");
inputCorrect.volume = 0.2;
let inputWrong = new Audio("./audio/button-10.mp3");
inputWrong.volume = 0.2;

//////////////Items//////////////

let itemX = 400;
let randomItems = [];
let speed = 4;
let frequency = 100;

class Item {
  constructor(img, type, xPos) {
    this.img = img;
    this.type = type;
    this.xPos = xPos;
  }

  draw() {
    let itemImg = new Image();
    itemImg.src = this.img;
    this.xPos -= speed;
    ctx.drawImage(itemImg, this.xPos, 250, 250, 250);
  }
}

//////////////FUNCTIONS//////////////////

const animate = () => {
  ctx.drawImage(bgImg1, bg1X, 0, 1500, canvas.height);
  ctx.drawImage(bgImg2, bg2X, 0, 1500, canvas.height);
  const drawBaby = () => {
    ctx.drawImage(babyImg, 0, babyY, babyWidth, babyHeight);
  };
  const drawHulk = () => {
    ctx.drawImage(hulkImg, 50, 100, 500, 500);
  };
  const drawSmash = () => {
    ctx.drawImage(smashImg, 400, -100, 500, 500);
  };

  ctx.font = "48px Luckiest Guy";
  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.fillText(`Score: ${score}`, 40, 70);
  ctx.fillText(`Lives: ${lives}`, canvas.width - 200, 70);

  //////////////Background animation/////////////
  bg1X -= speed;
  bg2X -= speed;

  if (bg1X < -1500) {
    bg1X = 1500;
  }
  if (bg2X < -1500) {
    bg2X = 1500;
  }

  if (score <= 5) {
    speed = 4;
    frequency = 80;
  } else if (score > 5 && score <= 15) {
    speed = 5;
    frequency = 60;
  } else if (score > 15 && score <= 25) {
    speed = 6;
    frequency = 40;
  } else if (score > 25 && score <= 40) {
    speed = 7;
    frequency = 30;
  } else if (score > 40) {
    speed = 10;
    frequency = 20;
  }

  ////////////////////Create items////////////////////
  if (animateId % frequency === 0) {
    let randomItem = items[Math.floor(Math.random() * items.length)];
    randomItems.push(new Item(randomItem.img, randomItem.type, canvas.width));
  }

  randomItems.forEach((item) => {
    item.draw(item);
    if (item.xPos < 150 && item.type === "baby") {
      randomItems.shift();
    } else if (item.xPos < 150 && item.type === "adult") {
      randomItems.length = 1;
      item.xPos = 500;
      item.draw(item);
      gameOver = true;
    }
  });

  ////////////////Game states///////////////////
  if (lives < 1) {
    gameOver = true;
  }
  if (!gameOver) {
    drawBaby();
    animateId = requestAnimationFrame(animate);
  } else {
    gameInProg = false;
    drawHulk();
    drawSmash();
    crash.play();
    cancelAnimationFrame(animateId);
    document.getElementById("restart-button").style.display = "block";
    audio.pause();
  }
};

////////////////Start the game///////////////
const startGame = () => {
  document.querySelector(".game-intro").style.display = "none";
  document.getElementById("game-board").style.display = "flex";
  document.getElementById("restart-button").style.display = "none";

  gameInProg = true;
  gameOver = false;
  randomItems = [];
  score = 0;
  speed = 4;
  frequency = 100;
  lives = 3;

  const counter = document.getElementById("counter");
  let count = 3;
  const interval = setInterval(() => {
    counter.innerText = count;
    count--;
    if (count < 0) {
      counter.innerText = "";
      clearInterval(interval);
    }
  }, 1000);
  audio.load();
  audio.play();
  animate();
};
////////////Input functions////////////////
const correctPress = () => {
  inputCorrect.play();
  randomItems[0].img = "./images/checkmark.png";
  setTimeout(() => {
    randomItems.shift();
  }, 200);
  score++;
};
////////////Start event listeners////////////
window.onload = () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  window.addEventListener("keypress", (e) => {
    if (gameInProg) {
      return;
    } else if (e.key === "Enter") {
      startGame();
    }
  });
};
//////////////////Control event listeners///////////////
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && randomItems[0].type === "baby") {
    correctPress();
  } else if (event.key === "ArrowLeft" && randomItems[0].type === "adult") {
    inputWrong.play();
    randomItems.length = 1;
    randomItems[0].xPos = 500;
    gameOver = true;
  }
  if (event.key === "ArrowRight" && randomItems[0].type === "baby") {
    inputWrong.play();
    randomItems[0].img = "./images/X-mark.png";
    lives--;
    setTimeout(() => {
      randomItems.shift();
    }, 200);
  } else if (event.key === "ArrowRight" && randomItems[0].type === "adult") {
    correctPress();
  }
});
//////////////Restart the game///////////////
document.getElementById("restart-button").style.display = "none";
document.getElementById("restart-button").onclick = () => {
  startGame();
};
