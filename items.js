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
    //this.element.style.background = "black";
    this.element.style.top = `${this.top}px`;
    this.playfield.appendChild(this.element);

    this.moveInterval = setInterval(() => this.update(), 3); // its calling the this.move() function every 20 miliseconds
  }
  update() {
    this.move();

    // If the kitten collides with an item
    this.collisionsGameActions();
  }

  move() {
    this.left -= 1; // decreasing 1px to the left --- moving the object

    if (this.left <= (this.element.clientWidth * -1)) {
      this.destroy();
    } else {
      this.element.style.left = `${this.left}px`;
    }
  }

  collisionsGameActions() {
    const collidesChecking = this.kitten.checkCollidesWith(this);

    if (collidesChecking) {
      if (this instanceof Vacuum || this instanceof Drone) {
        // Vacuum and Drone collidem com o gatinho
        this.kitten.decreaseLives();
        this.destroy();
      } else if (this instanceof Snacks) {
        // Snacks colidem com o gatinho, aumenta as vidas
        this.kitten.changingScore();
        this.destroy();
      }
    } 
  }

  destroy() {
    clearInterval(this.moveInterval); // Limpa o intervalo de atualização de movimento

    //this.gameplay.itemsOnScreen.splice(index, 1); // Remove o item da lista
    this.element.remove();
  }
}
class Vacuum extends Item {
  constructor(playfield, kitten, top, itemsOnScreen, element) {
    super(playfield, kitten, 380, itemsOnScreen, element);
    this.img = document.createElement("img");
    this.img.style.width = "100%";
    this.img.style.height = "100%";
    this.img.src = "/assets/kitten-items/vacuum-cleaner.png"
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
    this.img.style.width = "50%"
    this.img.style.height = "50%"
    this.img.src = "/assets/kitten-items/snack.png"
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
    this.img.style.width = "100%"
    this.img.style.height = "100%"
    this.img.src = "/assets/kitten-items/drone.gif"
    this.element.appendChild(this.img);

  }

  update() {
    super.update(); // Call the parent's update method
  }
}
