class Kitten {
  constructor(playfield, gameplay) {
    this.playfield = playfield;
    this.gameplay = gameplay;
    this.score = 0;
    this.lives = 3;
    this.left = 40;
    this.top = 250;
    this.width = 20;
    this.height = 20;
    
    this.element = document.createElement("div");
    this.element.className = "kitten";
    this.playfield.appendChild(this.element);
    
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.background = "orange";

    this.isCrouching = false;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpSpeed = 1.2;

    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");

    this.checkJumpInterval = setInterval(() => this.controlMovement(), 20); 

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        if (!this.isJumping && !this.isFalling) {
          this.isJumping = true;
        }
      } else if (event.key === "ArrowDown") {
        if (!this.isCrouching) {
          this.isCrouching = true;
          this.top += this.height / 2; // Adjust the top position when crouching
          this.element.style.top = this.top + "px";
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowDown") {
        this.isCrouching = false;
        this.top -= this.height / 2; // Adjust the top position when crouching
        this.element.style.top = this.top + "px";
      }
    });
  }
    controlMovement() {
    if (this.isJumping) {
      this.top -= this.jumpSpeed;
      this.element.style.top = this.top + "px";
    } 
    if (this.top <= 220){
      this.isJumping = false;
      this.isFalling = true;

    } else if (this.top >= 250) {
      this.isFalling = false;
    }
    if (this.isFalling) {
      this.top +=  this.jumpSpeed;
      this.element.style.top = this.top + "px";
    }
  }

   checkCollidesWith(item) {
    const kittenRect = this.element.getBoundingClientRect();
    const itemRect = item.element.getBoundingClientRect();
  
    if (
      kittenRect.left < itemRect.right &&
      kittenRect.right > itemRect.left &&
      kittenRect.top < itemRect.bottom &&
      kittenRect.bottom > itemRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

    changingScore() {
      this.score += 1;
      this.scoreDisplay.textContent = "Score: " + this.score;
    }
  
    decreaseLives() {
        -- this.lives;
        this.livesDisplay.textContent = "Lives: " + this.lives;

        if (this.lives === 0) {
          this.gameplay.gameIsOver = true;
          this.gameplay.gameOver();
        }  
    }

    destroy() {
      this.element.remove();
    }
  }





