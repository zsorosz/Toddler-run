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

let itemX = 400;
let randomItems = [];

class Item {
  constructor(img, type, xPos) {
    this.img = img;
    this.type = type;
    this.xPos = xPos;
  }

  draw() {
    let itemImg = new Image();
    itemImg.src = this.img;
    this.xPos -= 3;
    ctx.drawImage(itemImg, this.xPos, 400, 500, 500);
  }
}

const animate = () => {
  ctx.drawImage(bgImg1, bg1X, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg2, bg2X, 0, canvas.width, canvas.height);
  ctx.drawImage(babyImg, 100, babyY, 400, 400);

  ctx.font = "48px serif";
  ctx.fillText(`Score: ${score}`, 10, 48);

  randomItems.forEach((item) => {
    item.draw(item);
    if (item.xPos < 200 && item.type === "baby") {
      randomItems.shift();
    } else if (item.xPos < 200 && item.type === "adult") {
      gameOver = true;
    }
  });

  bg1X -= 3;
  bg2X -= 3;

  if (bg1X < -canvas.width) {
    bg1X = canvas.width;
  }
  if (bg2X < -canvas.width) {
    bg2X = canvas.width;
  }

  if (animateId % 100 === 0) {
    let randomItem = items[Math.floor(Math.random() * 11)];
    console.log(randomItem);
    randomItems.push(new Item(randomItem.img, randomItem.type, canvas.width));
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
  //   document.getElementById("game-board").style.display = "none";
  //   document.getElementById("start-button").onclick = () => {
  //     startGame();
  //   };
  startGame();
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && randomItems[0].type === "baby") {
    randomItems.shift();
    score++;
    console.log("left");
  } else if (event.key === "ArrowLeft" && randomItems[0].type === "adult") {
    gameOver = true;
  }
  if (event.key === "ArrowRight" && randomItems[0].type === "baby") {
    randomItems.shift();
  } else if (event.key === "ArrowRight" && randomItems[0].type === "adult") {
    randomItems.shift();
    score++;
  }
});
