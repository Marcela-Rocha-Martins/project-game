class Gameplay {
  constructor(playfield) {
    this.playfield = playfield; 
    this.gameEndScreen = document.getElementById("game-over"); 
    this.gameIsOver = false; 
    this.kitten = new Kitten(this.playfield, this);
    this.itemList = [Drone, Vacuum]; // Array of item classes
    this.itemsOnScreen = []; // Array to store the items on the screen
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg0.png')", 30, 1); 
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg1.png')", 20, 2); 
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg2.png')", 10, 3); 
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg3.png')", 1, 4); 
    this.soundtrack = new Audio("/assets/sounds/silver-sparkles-150619.mp3"); 
    this.gameOverSound = new Audio("/assets/sounds/game-over.mp3"); 
    this.soundtrack.loop = true; // Set the soundtrack to loop
    this.soundtrack.play(); 

    this.itemsInterval = setInterval(() => {
      this.createItem(); // Call the createItem() method at regular intervals
    }, 3000);

    this.itemsInterval = setInterval(() => {
      let newListItemOnScreen = new Snacks(this.playfield, this.kitten, this.top, this.itemsOnScreen); // Create a new Snacks instance
      this.itemsOnScreen.push(newListItemOnScreen); // Add the new item to the itemsOnScreen array
    }, 4300);
  }

  createItem() {
    let randomIndex = Math.floor(this.itemList.length * Math.random()); // Get a random index from the itemList array
    let newListItemOnScreen = new this.itemList[randomIndex](this.playfield, this.kitten, this.top, this.itemsOnScreen); // Create a new item instance using the random index
    this.itemsOnScreen.push(newListItemOnScreen); // Add the new item to the itemsOnScreen array
    // console.log(this.itemsOnScreen);
  }

  gameOver() {
    this.soundtrack.pause(); // Pause the soundtrack
    this.gameOverSound.play(); // Play the game over sound
    clearInterval(this.itemsInterval); // Clear the interval for creating items

    for (let i = 0; i < this.itemsOnScreen.length; i++) {
      this.itemsOnScreen[i].destroy(); // Destroy each item on the screen
    }

    this.kitten.destroy(); // Destroy the kitten
    this.playfield.style.display = "none"; // Hide the playfield
    this.gameEndScreen.style.display = "flex"; // Show the game over screen
  }

  restartGame() {
    location.reload(); // Reload the page to restart the game
  }
}
