class Kitten {
  constructor(playfield) {
    this.playfield = playfield;
    this.left = 40;
    this.top = 250;
    this.width = 20;
    this.height = 20;
    this.directionX = 0;
    this.directionY = 0;
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
    this.checkJumpInterval = setInterval(() => this.controlMovement(), 20); 
    this.jumpSpeed = 1.2;

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
      this.top -= 1 * this.jumpSpeed;
      this.element.style.top = this.top + "px";
    } 
    if (this.top <= 220){
      this.isJumping = false;
      this.isFalling = true;

    } else if (this.top >= 250) {
      this.isFalling = false;
    }
    if (this.isFalling) {
      this.top += 1 * this.jumpSpeed;
      this.element.style.top = this.top + "px";
    }
  }

  resetPosition() {
    this.left = 20;
    this.top = 250;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }


  destroy() {
    this.element.remove();
  }

  collidesWith(obstacle) {
    const kittenRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    return (
      kittenRect.left < obstacleRect.right &&
      kittenRect.right > obstacleRect.left &&
      kittenRect.top < obstacleRect.bottom &&
      kittenRect.bottom > obstacleRect.top
    );
  }
}

