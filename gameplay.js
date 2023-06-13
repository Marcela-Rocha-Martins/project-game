class Gameplay {
  constructor(playfield, kitten, obstacle1, obstacle2, score, lives, gameIsOver) {
    this.playfield = playfield;
    this.kitten = kitten;
    this.obstacle1 = obstacle1;
    this.obstacle2 = obstacle2;
    this.score = score;
    this.lives = lives;
    this.gameIsOver = gameIsOver;
    this.isPaused = false;
    this.pauseOverlay = null;
    this.pauseButton = null;
  }

  start() {
    this.gameLoop();
  }

  createPauseOverlay() {
    this.pauseOverlay = document.createElement("div");
    this.pauseOverlay.id = "pause-overlay";
    this.pauseOverlay.innerHTML = `<img src="pause-image.png" alt="Pause">`;
    this.playfield.appendChild(this.pauseOverlay);
    this.pauseButton.textContent = "Resume";
  }

  removePauseOverlay() {
    this.playfield.removeChild(this.pauseOverlay);
    this.pauseOverlay = null;
    this.pauseButton.textContent = "Pause";
  }

  gameLoop() {
    if (this.gameIsOver || this.isPaused) {
      return;
    }

    this.gameUpdate();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  gameUpdate() {
    if (this.kitten.collidesWith(this.obstacle1) || this.kitten.collidesWith(this.obstacle2)) {
      this.lives--;
      this.updateLivesDisplay();

      if (this.lives <= 0) {
        this.gameOver();
        return;
      }
    }

    document.getElementById("score-display").textContent = "Score: " + this.score;
    document.getElementById("lives-display").textContent = "Lives: " + this.lives;

    if (this.kitten.collidesWith(this.obstacle1)) {
      this.score += 1;
      this.obstacle1.resetPosition();
    }

    if (this.kitten.collidesWith(this.obstacle2)) {
      this.score += 1;
      this.obstacle2.resetPosition();
    }

    if (this.kitten.collidesWith(colectable)) {
      this.lives += 1;
      colectable.resetPosition();
    }

    if (this.kitten.hitsBounds()) {
      this.lives -= 1;
      this.kitten.resetPosition();

      if (this.lives <= 0) {
        this.gameOver();
      }
    }
  }

  pause() {
    this.isPaused = true;
    this.createPauseOverlay();
    // Freeze game elements and animations
  }

  resume() {
    this.isPaused = false;
    this.removePauseOverlay();
    // Resume game elements and animations
  }

  updateLivesDisplay() {
    document.getElementById("lives-display").textContent = "Lives: " + this.lives;
  }

  gameOver() {
    this.gameIsOver = true;
    // Game over logic
  }
}

window.onload = function () {
  const playfield = document.querySelector(".playfield");
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  let kitten = null;
  let obstacle1 = null;
  let obstacle2 = null;
  let obstacleInterval1 = null;
  let obstacleInterval2 = null;

  startButton.addEventListener("click", function () {
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

    obstacle2 = new Obstacle2(playfield, kitten);

    kitten = new Kitten(playfield);

    const gameplay = new Gameplay(playfield, kitten, obstacle1, obstacle2, 0, 3, false);
    gameplay.start();

    obstacleInterval1 = setInterval(function () {
      obstacle1.move();
    }, 1000);

    obstacleInterval2 = setInterval(function () {
      obstacle2.move();
    }, 800);
  });

  pauseButton.addEventListener("click", function () {
    if (gameplay.isPaused) {
      gameplay.resume();
    } else {
      gameplay.pause();
    }
  });
};

window.onload = function () {
  const playfield = document.querySelector(".playfield");
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  let kitten = null;
  let obstacle1 = null;
  let obstacle2 = null;
  let obstacleInterval1 = null;
  let obstacleInterval2 = null;

  startButton.addEventListener("click", function () {
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
    }, 3000); // Create a new obstacle 1 every 4 seconds

    obstacle2 = new Obstacle2(playfield, kitten);

    obstacleInterval2 = setInterval(() => {
      obstacle2 = new Obstacle2(playfield, kitten);
    }, 7000); // Create a new obstacle 2 every 6 seconds

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

    pauseButton.addEventListener("click", function () {
      if (game && !game.gameIsOver) {
        if (!game.isPaused) {
          game.pause();
        } else {
          game.resume();
        }
      }
    });
  });
};