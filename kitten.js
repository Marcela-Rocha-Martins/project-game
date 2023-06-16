class Kitten {
  constructor(playfield, gameplay) {
    this.playfield = playfield;
    this.gameplay = gameplay;
    this.score = 0;
    this.scoreLifeCounter = 0;
    this.lives = 3;
    this.left = 80;
    this.initialTop = 400;
    this.top = this.initialTop;
    this.width = 110;
    this.initialHeight = 95;
    this.height = this.initialHeight;
    this.crounchedHeight = 65;
    this.updateSpeed = 20;

    this.element = document.createElement("div");
    this.element.className = "kitten";
    this.playfield.appendChild(this.element);

    // Set initial background image and create audio elements
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.runningKittenAnim =
      "url('/assets/kitten-items/catset_assets/run.gif')";
    this.jumpingKittenAnim =
      "url('/assets/kitten-items/catset_assets/jump.gif')";
    this.fallingKittenAnim =
      "url('/assets/kitten-items/catset_assets/fall.gif')";
    this.crounchKittenAnim =
      "url('/assets/kitten-items/catset_assets/crounch.gif";
    this.element.style.backgroundImage = this.runningKittenAnim;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundRepeat = "no-repeat";
    this.jumpSound = new Audio("/assets/sounds/jump.mp3");
    this.damageSound = new Audio("/assets/sounds/hurt.mp3");
    this.snackSound = new Audio("/assets/sounds/snack.mp3");

    // initial state of the kitten and movenment limits
    this.isCrouching = false;
    this.isJumping = false;
    this.isFalling = false;

    //jump settings
    this.jumpSpeed = 7;
    this.jumpHeight = 250;
    this.jumpDurationInSeconds = 0.7;

    // calculates the number of update cycles required to complete a jump based on the jump duration and the update speed. Converts the duration to milliseconds and divides it by the update speed to obtain the number of cycles.
    this.jumpCycleLength =
      this.jumpDurationInSeconds * (1000 / this.updateSpeed);
    this.jumpMaxHeight = 190;

    //defines the initial momentum of the jump, which corresponds to the number of cycles required to reach the maximum height. It is initially set to the value of jumpCycleLength.
    this.jumpMomentum = this.jumpCycleLength;

    //calculates the acceleration of the jump based on the maximum height and the number of cycles. Determines how the kitten's position should be updated in each cycle to simulate a smooth jump.
    this.jumpAcceleration =
      (2 * this.jumpMaxHeight) / (this.jumpCycleLength * this.jumpCycleLength);

    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");

    this.checkJumpInterval = setInterval(
      () => this.controlMovement(),
      this.updateSpeed
    );

    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      if (event.key === "ArrowUp" || event.key == " ") {
        if (!this.isJumping && !this.isFalling && !this.isCrouching) {
          this.isJumping = true;
          this.jumpSound.play();
          this.element.style.backgroundImage = this.jumpingKittenAnim;
        }
      } else if (event.key === "ArrowDown") {
        if (!this.isCrouching && !this.isJumping && !this.isFalling) {
          this.isCrouching = true;
          this.element.style.backgroundImage = this.crounchKittenAnim;
          this.height = this.crounchedHeight;
          this.top =
            this.initialTop + (this.initialHeight - this.crounchedHeight); // Adjust the top position when crouching
          this.element.style.top = this.top + "px";
          this.element.style.height = this.height + "px";
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowDown" && !this.isJumping && !this.isFalling) {
        this.isCrouching = false;
        this.element.style.backgroundImage = this.runningKittenAnim;
        this.height = this.initialHeight;
        this.top = this.initialTop; // Adjust the top position when crouching
        this.element.style.top = this.top + "px";
        this.element.style.height = this.height + "px";
      }
    });
  }
    controlMovement() {
    if (this.isJumping) {
      this.top -= this.jumpMomentum * this.jumpAcceleration;
      this.element.style.top = this.top + "px";
      --this.jumpMomentum;
    }
    if (this.jumpMomentum == 0) {
      this.isJumping = false;
      this.isFalling = true;
      this.element.style.backgroundImage = this.fallingKittenAnim;
    } else if (this.top >= this.initialTop && this.isFalling) {
      this.jumpMomentum = this.jumpCycleLength;
      this.top = this.initialTop;
      this.isFalling = false;
      this.element.style.top = this.top + "px";
      this.element.style.backgroundImage = this.runningKittenAnim;
    }
    if (this.isFalling) {
      ++this.jumpMomentum;
      this.top += this.jumpMomentum * this.jumpAcceleration;
      this.element.style.top = this.top + "px";
    }
  }

  checkCollidesWith(item) {
    const kittenRect = this.element.getBoundingClientRect();
    const itemRect = item.element.getBoundingClientRect();

    if (
      kittenRect.left < itemRect.right - 25 &&
      kittenRect.right > itemRect.left + 25 &&
      kittenRect.top < itemRect.bottom - 5 &&
      kittenRect.bottom > itemRect.top + 25
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  changingScore() {
    this.score += 1;
    ++this.scoreLifeCounter;
    if (this.scoreLifeCounter == 5) {
      this.scoreLifeCounter = 0;
      this.increaseLives();
    }
    this.scoreDisplay.textContent = "score: " + this.score;
    this.snackSound.play();
  }

  increaseLives() {
    ++this.lives;
    this.livesDisplay.textContent = "lives: " + this.lives;
  }

  decreaseLives() {
    --this.lives;
    this.livesDisplay.textContent = "lives: " + this.lives;
    this.damageSound.play();

    if (this.lives === 0) {
      this.gameplay.gameIsOver = true;
      this.gameplay.gameOver();
    }
  }

  destroy() {
    this.element.remove();
  }
}
