class Gameplay {
  constructor(playfield) {
    this.playfield = playfield;
    this.gameEndScreen = document.getElementById("game-over");
    this.gameIsOver = false;
    this.kitten = new Kitten(this.playfield, this);
    this.itemList = [Snacks, AngryLady, Vacuum];
    this.itemsOnScreen = [];

    this.itemsInterval = setInterval(() => {
      this.createItem();
      }, 3000);
  
  }
  
    createItem() {
      let randomIndex = Math.floor(this.itemList.length * Math.random());  
      let newListItemOnScreen = new this.itemList[randomIndex](this.playfield, this.kitten, this.top, this.itemsOnScreen);
      this.itemsOnScreen.push(newListItemOnScreen);
      // console.log(this.itemsOnScreen);
      }

    gameOver() {
        clearInterval(this.itemsInterval);
          for (let i = 0; i < this.itemsOnScreen.length; i++) {
          this.itemsOnScreen[i].destroy();
        }
        
        this.kitten.destroy(); 
        this.playfield.style.display = "none";
        this.gameEndScreen.style.display = "block";
      }

    restartGame() {
        location.reload();
      }
  }