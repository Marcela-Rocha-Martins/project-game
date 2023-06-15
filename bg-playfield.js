class Gamebg {
  constructor(playfield, background, speed, zIndex) {
    this.playfield = playfield;
    this.zIndex = zIndex;
    this.background = background;
    this.element1left = 0 
    this.element2left = this.playfield.clientWidth;
    this.speed = speed;

    this.holder = document.createElement("div");
    this.holder.className = "holder";
    this.holder.style.zIndex = `${this.zIndex}`;
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
   
    this.moveInterval = setInterval(() => this.update(), 1 * speed); // its calling the this.move() function every 20 miliseconds
  }
  update() { 

      this.element1left -= 1; // decreasing 1px to the left --- moving the object
      this.element1.style.left = `${this.element1left}px`;    

      this.element2left -=1;
      this.element2.style.left = `${this.element2left}px`;

      if (this.element1left <= this.playfield.clientWidth * -1) {
        this.element1left = this.playfield.clientWidth;
      } 

      if (this.element2left <= this.playfield.clientWidth * -1) {
        this.element2left = this.playfield.clientWidth;
      } 
      
      }

    }
    
  
