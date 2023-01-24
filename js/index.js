const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.style = "border: 1px solid black";

let gameOver = false;
let animateId;
let score = 0;

const bgImg1 = new Image();
bgImg1.src = "../images/room.png";
const bgImg2 = new Image();
bgImg2.src = "../images/room.png";
let bg1X = 0;
let bg2X = canvas.width;

const babyImg = new Image();
babyImg.src = "../images/baby.png";
let babyY = 450;

const hulkImg = new Image();
hulkImg.src = "../images/hulk.png";

const smashImg = new Image();
smashImg.src = "../images/smash.png";

let itemX = 400;
let randomItems = [];
let speed = 4;

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
    ctx.drawImage(itemImg, this.xPos, 400, 250, 250);
  }
}

const animate = () => {
  ctx.drawImage(bgImg1, bg1X, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg2, bg2X, 0, canvas.width, canvas.height);
  const drawBaby = () => {
    ctx.drawImage(babyImg, 50, babyY, 400, 400);
  };
  const drawHulk = () => {
    ctx.drawImage(hulkImg, 50, 100, 800, 800);
  };
  const drawSmash = () => {
    ctx.drawImage(smashImg, 600, -200, 800, 800);
  };

  ctx.font = "48px Luckiest Guy";
  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.fillText(`Score: ${score}`, 40, 70);

  if (score <= 5) {
    speed = 4;
  } else if (score > 5 && score <= 10) {
    speed = 6;
  } else if (score > 10 && score <= 15) {
    speed = 10;
  }

  randomItems.forEach((item) => {
    item.draw(item);
    if (item.xPos < 200 && item.type === "baby") {
      randomItems.shift();
    } else if (item.xPos < 200 && item.type === "adult") {
      gameOver = true;
    }
  });

  bg1X -= speed;
  bg2X -= speed;

  if (bg1X < -canvas.width) {
    bg1X = canvas.width;
  }
  if (bg2X < -canvas.width) {
    bg2X = canvas.width;
  }

  if (animateId % 50 === 0) {
    let randomItem = items[Math.floor(Math.random() * items.length)];
    console.log(randomItem);
    randomItems.push(new Item(randomItem.img, randomItem.type, canvas.width));
  }

  if (!gameOver) {
    drawBaby();
    animateId = requestAnimationFrame(animate);
  } else {
    drawHulk();
    drawSmash();
    document.getElementById("restart-button").style.display = "block";
    cancelAnimationFrame(animateId);
  }
};

const startGame = () => {
  document.querySelector(".game-intro").style.display = "none";
  document.getElementById("game-board").style.display = "flex";
  document.getElementById("restart-button").style.display = "none";
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
  animate();
};

window.onload = () => {
  //   document.getElementById("game-board").style.display = "none";
  //   document.getElementById("start-button").onclick = () => {
  //     startGame();
  //   };
  startGame();
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && randomItems[0].type === "baby") {
    randomItems[0].img = "../images/checkmark.png";
    setTimeout(() => {
      randomItems.shift();
    }, 500);
    score++;
  } else if (event.key === "ArrowLeft" && randomItems[0].type === "adult") {
    gameOver = true;
  }
  if (event.key === "ArrowRight" && randomItems[0].type === "baby") {
    randomItems[0].img = "../images/X-mark.png";
    setTimeout(() => {
      randomItems.shift();
    }, 500);
  } else if (event.key === "ArrowRight" && randomItems[0].type === "adult") {
    randomItems[0].img = "../images/checkmark.png";
    setTimeout(() => {
      randomItems.shift();
    }, 500);
    score++;
  }
});
document.getElementById("restart-button").style.display = "none";
document.getElementById("restart-button").onclick = () => {
  gameOver = false;
  randomItems = [];
  score = 0;
  startGame();
};
