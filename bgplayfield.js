class Gamebg {
  constructor(playfield, background, speed, zIndex) {
    this.playfield = playfield; 
    this.zIndex = zIndex; // Z-index of the game background
    this.background = background; 
    this.element1left = 0; 
    this.element2left = this.playfield.clientWidth;
    this.speed = speed; 

    this.holder = document.createElement("div");
    this.holder.className = "holder"; 
    this.holder.style.zIndex = `${this.zIndex}`; // Set the z-index of the holder div
    this.playfield.appendChild(this.holder); 

    this.element1 = document.createElement("div"); 
    this.element1.className = "gamebg";
    this.element1.style.left = `${this.element1left}px`; 
    this.element1.style.backgroundImage = this.background; 
    this.holder.appendChild(this.element1); 

    this.element2 = document.createElement("div"); 
    this.element2.className = "gamebg"; 
    this.element2.style.left = `${this.element2left}px`; 
    this.element2.style.backgroundImage = this.background; 
    this.holder.appendChild(this.element2); 

    this.moveInterval = setInterval(() => this.update(), 1 * speed); 
  }

  update() {
    this.element1left -= 1; // Decrease 1px from the left position of element 1 (moving it to the left)
    this.element1.style.left = `${this.element1left}px`; 

    this.element2left -= 1; // Decrease 1px from the left position of element 2 (moving it to the left)
    this.element2.style.left = `${this.element2left}px`; 

    if (this.element1left <= this.playfield.clientWidth * -1) {
      // If element 1 goes beyond the left boundary of the playfield
      this.element1left = this.playfield.clientWidth; 
    }

    if (this.element2left <= this.playfield.clientWidth * -1) {
      // If element 2 goes beyond the left boundary of the playfield
      this.element2left = this.playfield.clientWidth; 
    }
  }
}
    
  
