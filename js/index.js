const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.style = "border: 1px solid black";

const bgImg = new Image();
bgImg.src = "../images/room.jpg";

const startGame = () => {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
};

window.onload = () => {
  // document.getElementById("start-button").onclick = () => {
  //   startGame();
  // };
  startGame();
};
