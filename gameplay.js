class Gameplay {
  constructor(
    playfield,
    kitten,
    obstacle1,
    obstacle2,
    score,
    lives,
    gameIsOver
  ) {
    this.playfield = playfield;
    this.kitten = kitten;
    this.obstacle1 = obstacle1;
    this.obstacle2 = obstacle2;
    this.score = score;
    this.lives = lives;
    this.gameIsOver = gameIsOver;
  }

  start() {
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.gameUpdate();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  gameUpdate() {
    // Call update() on kitten to update its position
    // this.kitten.update();
  }
}

window.onload = function () {
  const startButton = document.getElementById("start-button");
  let kitten = null;
  let obstacle1 = null;
  let obstacle2 = null;
  let obstacleInterval1 = null;
  let obstacleInterval2 = null;

  startButton.addEventListener("click", function () {
    const playfield = document.querySelector(".playfield");

    if (kitten) {
      kitten.destroy();
    }

    if (obstacle1) {
      obstacle1.destroy();
    }

    if (obstacle2) {
      obstacle2.destroy();
    }

    obstacle1 = new Obstacle1(playfield, kitten);

    obstacleInterval1 = setInterval(() => {
      obstacle1 = new Obstacle1(playfield, kitten);
    }, 3000); // Cria um novo obstáculo 1 a cada 4 segundos

    obstacle2 = new Obstacle2(playfield, kitten);

    obstacleInterval2 = setInterval(() => {
      obstacle2 = new Obstacle2(playfield, kitten);
    }, 7000); // Cria um novo obstáculo 2 a cada 6 segundos

    kitten = new Kitten(playfield);

    const score = 0;
    const lives = 3;
    const gameIsOver = false;

    const game = new Gameplay(
      playfield,
      kitten,
      obstacle1,
      obstacle2,
      score,
      lives,
      gameIsOver
    );

    kitten.resetPosition();
    game.start();
  });
};
