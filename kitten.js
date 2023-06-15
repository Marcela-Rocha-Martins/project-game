class Kitten {
  constructor(playfield, gameplay) {
    this.playfield = playfield;
    this.gameplay = gameplay;
    this.score = 0;
    this.lives = 3;
    this.left = 80;
    this.initialTop = 400;
    this.top = this.initialTop;
    this.width = 110;
    this.initialHeight = 95;
    this.height = this.initialHeight;
    this.crounchedHeight = 65;
    
    this.element = document.createElement("div");
    this.element.className = "kitten";
    this.playfield.appendChild(this.element);
    
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.runningKittenAnim = "url('/assets/kitten and items/catset_assets/run.gif')";
    this.jumpingKittenAnim = "url('/assets/kitten and items/catset_assets/jump.gif')";
    this.fallingKittenAnim = "url('/assets/kitten and items/catset_assets/fall.gif')";
    this.crounchKittenAnim = "url('/assets/kitten and items/catset_assets/crounch.gif";
    this.element.style.backgroundImage = this.runningKittenAnim;
    this.element.style.backgroundSize = 'cover';
    this.element.style.backgroundRepeat = 'no-repeat';

    this.isCrouching = false;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpSpeed = 3.4;
    this.jumpHeight = 100;


    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");

    this.checkJumpInterval = setInterval(() => this.controlMovement(), 20); 

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        if (!this.isJumping && !this.isFalling && !this.isCrouching) {
          this.isJumping = true;
          this.element.style.backgroundImage = this.jumpingKittenAnim;  
        }
      } else if (event.key === "ArrowDown") {
        if (!this.isCrouching && !this.isJumping && !this.isFalling) {
          this.isCrouching = true;
          this.element.style.backgroundImage = this.crounchKittenAnim;  
          this.height = this.crounchedHeight;
          this.top = this.initialTop + (this.initialHeight - this.crounchedHeight); // Adjust the top position when crouching
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
      this.top -= this.jumpSpeed;
      this.element.style.top = this.top + "px";
    } 
    if (this.top <= this.initialTop - this.jumpHeight){
      this.isJumping = false;
      this.isFalling = true;
      this.element.style.backgroundImage = this.fallingKittenAnim;

    } else if (this.top >= this.initialTop && this.isFalling) {
      this.top = this.initialTop
      this.isFalling = false;
      this.element.style.backgroundImage = this.runningKittenAnim;
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





