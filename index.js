const topCont = document.querySelector(".topRow");
const bottomCont = document.querySelector(".bottomRow");
const bird = document.querySelector(".bird");
const playBtn = document.querySelector("#play");
const restartBtn = document.querySelector("#restart");
const menu = document.querySelector(".menu");
let gameScore2 = document.querySelector(".score2");
let score3 = document.querySelector("#score2");
let updatedScore2 = parseInt(score3.textContent);
let gameScore = document.querySelector("#score");
let updatedScore = parseInt(gameScore.textContent);
score3.textContent = 0;
gameScore.textContent = 0;
let birdY = 0;
let birdSpeed = 7;
let columns = [];
let columnSpeed = 4;
let lose = false;
let fallInterval;
let moveInterval;
let generateColumn;
let counter = 0;
let activeListener = false;

playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
function startGame() {
  menu.style.display = "none";
  restartBtn.style.display = "none";
  columns.forEach((column) => {
    column.top.remove();
    column.bottom.remove();
  });
  gameScore.textContent = 0;
  score3.textContent = 0;
  birdY = 0;
  lose = false;
  counter = 0;
  columns = [];

  clearInterval(fallInterval);
  clearInterval(moveInterval);
  clearInterval(generateColumn);

  fallInterval = setInterval(fall, 30);
  moveInterval = setInterval(movecolumn, 20);
  genColumn();
  generateColumn = setInterval(genColumn, 1400);
  if (!activeListener) {
    document.addEventListener("click", birdJump);
    activeListener = true;
  }
}

function fall() {
  birdY += birdSpeed;
  bird.style.top = birdY + "px";
  if (birdY >= 460) {
    gameEnd();
  }

  checkCollision();
}

function genColumn() {
  let randomHeight = Math.floor(Math.random() * (250 - 100) + 100);
  let newTopColumn = document.createElement("div");
  let newBottomColumn = document.createElement("div");
  newTopColumn.className = "columnTop column";
  newBottomColumn.className = "columnBottom column";
  newTopColumn.style.height = randomHeight + "px";
  newBottomColumn.style.height = 500 - randomHeight - 180 + "px";
  topCont.appendChild(newTopColumn);
  bottomCont.appendChild(newBottomColumn);
  columns.push({ top: newTopColumn, bottom: newBottomColumn, x: 0 });
}

function movecolumn() {
  columns.forEach((column, index) => {
    column.x += columnSpeed;
    column.top.style.right = column.x + "px";
    column.bottom.style.right = column.x + "px";
    const birdRect = bird.getBoundingClientRect();
    const topRect = column.top.getBoundingClientRect();
    if (!column.passed && birdRect.left > topRect.right) {
      column.passed = true;
      counter++;
      gameScore.textContent = counter;
      score3.textContent = counter;
      console.log(counter);
    }
    if (column.x >= 460) {
      column.top.remove();
      column.bottom.remove();
      columns.splice(index, 1);
    }
  });

  checkCollision();
}

function birdJump() {
  if (birdY !== 0) {
    birdY -= 90;
    bird.style.top = birdY + "px";
  }
}

function checkCollision() {
  const birdRect = bird.getBoundingClientRect();

  columns.forEach((column) => {
    const bottomRect = column.bottom.getBoundingClientRect();
    const topRect = column.top.getBoundingClientRect();

    if (
      birdRect.left < bottomRect.right &&
      birdRect.right > bottomRect.left &&
      birdRect.top < bottomRect.bottom &&
      birdRect.bottom > bottomRect.top &&
      !lose
    ) {
      lose = true;
      gameEnd();
    }

    if (
      birdRect.left < topRect.right &&
      birdRect.right > topRect.left &&
      birdRect.top < topRect.bottom &&
      birdRect.bottom > topRect.top &&
      !lose
    ) {
      lose = true;
      gameEnd();
    }
  });
}

function gameEnd() {
  console.log("lose");
  clearInterval(fallInterval);
  clearInterval(moveInterval);
  clearInterval(generateColumn);
  menu.style.display = "flex";
  playBtn.style.display = "none";
  restartBtn.style.display = "block";
  gameScore2.style.display = "block";
  if (activeListener) {
    document.removeEventListener("click", birdJump);
    activeListener = false;
  }
}
