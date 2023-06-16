class Kitten {
  constructor(playfield, gameplay) {
    this.playfield = playfield; 
    this.gameplay = gameplay; 
    this.score = 0; 
    this.scoreLifeCounter = 0; 
    this.lives = 3; // Number of lives
    this.left = 80; // Initial left position
    this.initialTop = 400; // Initial top position
    this.top = this.initialTop; // Current top position
    this.width = 110; // Width of the kitten
    this.initialHeight = 95; // Initial height of the kitten
    this.height = this.initialHeight; // Current height of the kitten
    this.crounchedHeight = 65; // Height of the kitten when crouched
    this.updateSpeed = 20; // Update speed for control

    // Create kitten element and set initial styles
    this.element = document.createElement("div");
    this.element.className = "kitten";
    this.playfield.appendChild(this.element);
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    // Set initial background image and create audio elements
    this.runningKittenAnim = "url('/assets/kitten-items/catset_assets/run.gif')";
    this.jumpingKittenAnim = "url('/assets/kitten-items/catset_assets/jump.gif')";
    this.fallingKittenAnim = "url('/assets/kitten-items/catset_assets/fall.gif')";
    this.crounchKittenAnim = "url('/assets/kitten-items/catset_assets/crounch.gif";
    this.element.style.backgroundImage = this.runningKittenAnim;
    this.element.style.backgroundSize = 'cover';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.jumpSound = new Audio("/assets/sounds/jump.mp3");
    this.damageSound = new Audio("/assets/sounds/hurt.mp3");
    this.snackSound = new Audio("/assets/sounds/snack.mp3");

    // Initialize state variables
    this.isCrouching = false;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpSpeed = 7;
    this.jumpHeight = 250;
    this.jumpDurationInSeconds = 0.7;
    this.jumpCycleLength = this.jumpDurationInSeconds * (1000 / this.updateSpeed);
    this.jumpMaxHeight = 190;
    this.jumpMomentum = this.jumpCycleLength;
    this.jumpAcceleration = (2 * this.jumpMaxHeight) / (this.jumpCycleLength * this.jumpCycleLength);

    // Get score and lives display elements
    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");

    // Event listeners for keyboard input
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" || event.key == " ") {
        // Jumping action
        if (!this.isJumping && !this.isFalling && !this.isCrouching) {
          this.isJumping = true;
          this.jumpSound.play();
          this.element.style.backgroundImage = this.jumpingKittenAnim;
        }
      } else if (event.key === "ArrowDown") {
        // Crouching action
        if (!this.isCrouching && !this.isJumping && !this.isFalling) {
          this.isCrouching = true;
          this.element.style.backgroundImage = this.crounchKittenAnim;
          this.height = this.crounchedHeight;
          this.top = this.initialTop + (this.initialHeight - this.crounchedHeight);
          this.element.style.top = this.top + "px";
          this.element.style.height = this.height + "px";
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      // Revert crouching when key is released
      if (event.key === "ArrowDown" && !this.isJumping && !this.isFalling) {
        this.isCrouching = false;
        this.element.style.backgroundImage = this.runningKittenAnim;
        this.height = this.initialHeight;
        this.top = this.initialTop;
        this.element.style.top = this.top + "px";
        this.element.style.height = this.height + "px";
      }
    });

    // Interval for checking kitten movement
    this.checkJumpInterval = setInterval(() => this.controlMovement(), this.updateSpeed);
  }

  controlMovement() {
    // Handle kitten movement during jumping and falling states
    if (this.isJumping) {
      this.top -= this.jumpMomentum * this.jumpAcceleration;
      this.element.style.top = this.top + "px";
      --this.jumpMomentum;
    } else if (this.jumpMomentum == 0) {
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
    // Check collision between the kitten and an item
    const kittenRect = this.element.getBoundingClientRect();
    const itemRect = item.element.getBoundingClientRect();

    if (
      kittenRect.left < itemRect.right - 25 &&
      kittenRect.right > itemRect.left + 25 &&
      kittenRect.top < itemRect.bottom - 5 &&
      kittenRect.bottom > itemRect.top + 25
    ) {
      return true; // Collision occurred
    } else {
      return false; // No collision
    }
  }

  changingScore() {
    // Increase score and check for increasing lives
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
    // Increase the number of lives
    ++this.lives;
    this.livesDisplay.textContent = "lives: " + this.lives;
  }

  decreaseLives() {
    // Decrease the number of lives and handle game over condition
    --this.lives;
    this.livesDisplay.textContent = "lives: " + this.lives;
    this.damageSound.play();

    if (this.lives === 0) {
      this.gameplay.gameIsOver = true;
      this.gameplay.gameOver();
    }
  }

  destroy() {
    // Remove the kitten element from the playfield
    this.element.remove();
  }
}





