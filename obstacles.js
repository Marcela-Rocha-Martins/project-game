class Obstacle1 {
  constructor(playfield, kitten) {
    this.playfield = playfield;
    this.kitten = kitten;
    this.width = 20;
    this.height = 20;
    this.left = 400; // Initialize the obstacle to the right of the playfield
    this.top = 250;

    this.element = document.createElement("div");
    this.element.className = "obstacle1";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.background = "red";
    this.playfield.appendChild(this.element);

    this.moveInterval = setInterval(() => this.move(), 20); // Update the position of the obstacle every 10 milliseconds
  }

  move() {
    this.left -= 1; // Move the obstacle to the left

    if (this.left <= 0) {
      this.destroy();
    } else {
      this.element.style.left = `${this.left}px`;
    }
  }

  destroy() {
    clearInterval(this.moveInterval); // Clear the movement update interval
    this.element.remove(); // Remove the element from the playfield
  }
}

class Obstacle2 {
  constructor(playfield, kitten) {
    this.playfield = playfield;
    this.kitten = kitten;
    this.width = 20;
    this.height = 20;
    this.left = 500; // Initialize the obstacle to the right of the playfield
    this.top = 230;

    this.element = document.createElement("div");
    this.element.className = "obstacle2";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.background = "blue";
    this.playfield.appendChild(this.element);

    this.moveInterval = setInterval(() => this.move(), 10); // Update the position of the obstacle every 10 milliseconds
  }

  move() {
    this.left -= 1; // Move the obstacle to the left

    if (this.left <= 0) {
      // Check if the obstacle has completely exited the playfield
      this.destroy();
    } else {
      this.element.style.left = `${this.left}px`;
    }
  }

  destroy() {
    clearInterval(this.moveInterval); // Clear the movement update interval
    this.element.remove(); // Remove the element from the playfield
  }
}

