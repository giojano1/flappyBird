const bird = document.querySelector(".bird");
const columnBottom = document.querySelector(".columnBottom");
let positionY = 0;
let positionX = 50;
let speed = 4;
let columnX = 0;
let columnSpeed = 2;
let lose = false;
bird.style.left = positionX + "px";

function fall() {
  positionY += speed;
  bird.style.top = positionY + "px";
  if (positionY >= 460) {
    gameEnd();
  }

  checkCollision();
}
const fallInterval = setInterval(fall, 20);

function movecolumn() {
  columnX += columnSpeed;
  columnBottom.style.right = columnX + "px";
  score();
  checkCollision();
}

function checkCollision() {
  const fallingRect = bird.getBoundingClientRect();
  const movingRect = columnBottom.getBoundingClientRect();

  if (
    fallingRect.left < movingRect.right &&
    fallingRect.right > movingRect.left &&
    fallingRect.top < movingRect.bottom &&
    fallingRect.bottom > movingRect.top &&
    !lose
  ) {
    lose = true;
    gameEnd();
  }
}

const moveInterval = setInterval(movecolumn, 20);

document.addEventListener("keydown", function (event) {
  if (event.key === "a") {
    if (positionY !== 0) {
      positionY -= 100;
      bird.style.top = positionY + "px";
    }
  }
});

function score() {
  if (columnX == 380) {
    console.log("zaaa");
  }
}
function gameEnd() {
  console.log("lose");
  clearInterval(fallInterval);
  clearInterval(moveInterval);
}
