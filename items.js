class Item {
  constructor(playfield, kitten, top, itemsOnScreen) {
    this.playfield = playfield;
    this.width = 120;
    this.height = 120;
    this.left = 990; // Initialize the obstacle to the right of the playfield
    this.top = top;
    this.kitten = kitten;
    this.itemsOnScreen = itemsOnScreen;

    this.element = document.createElement("div");
    this.element.className = "item";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.playfield.appendChild(this.element);

    this.moveInterval = setInterval(() => this.update(), 3); // It calls the this.update() function every 3 milliseconds
  }

  update() {
    this.move();

    this.collisionsGameActions();
  }

  move() {
    this.left -= 1; // Move the item 1 pixel to the left

    if (this.left <= this.element.clientWidth * -1) {
      this.destroy();
    } else {
      this.element.style.left = `${this.left}px`;
    }
  }

  collisionsGameActions() {
    const collidesChecking = this.kitten.checkCollidesWith(this);

    if (collidesChecking) {
      if (this instanceof Vacuum || this instanceof Drone) {
        // Vacuum and Drone collide with the kitten
        this.kitten.decreaseLives();
        this.destroy();
      } else if (this instanceof Snacks) {
        // Snacks collide with the kitten, increase lives
        this.kitten.changingScore();
        this.destroy();
      }
    }
  }

  destroy() {
    clearInterval(this.moveInterval); // Clear the move update interval
    this.element.remove();
  }
}

class Vacuum extends Item {
  constructor(playfield, kitten, top, itemsOnScreen, element) {
    super(playfield, kitten, 380, itemsOnScreen, element);
    this.img = document.createElement("img");
    this.img.style.width = "100%";
    this.img.style.height = "100%";
    this.img.src = "assets/kittenitems/vacuumcleaner.PNG";
    this.element.appendChild(this.img);
  }

  update() {
    super.update(); // Call the parent's update method
  }
}

class Snacks extends Item {
  constructor(playfield, kitten, top, itemsOnScreen, element) {
    super(playfield, kitten, 430, itemsOnScreen, element);
    this.img = document.createElement("img");
    this.img.style.width = "50%";
    this.img.style.height = "50%";
    this.img.src = "assets/kittenitems/snack.PNG";
    this.element.appendChild(this.img);
   
   }
  update() {
    super.update(); // Call the parent's update method
  }

}

class Drone extends Item {
  constructor(playfield, kitten, top, itemsOnScreen, element) {
    super(playfield, kitten, 290, itemsOnScreen, element);
    this.img = document.createElement("img");
    this.img.style.width = "100%";
    this.img.style.height = "100%";
    this.img.src = "assets/kittenitems/drone.GIF";
    this.element.appendChild(this.img);
  }

  update() {
    super.update(); // Call the parent's update method
  }
}
