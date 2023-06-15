class Gameplay {
  constructor(playfield) {
    this.playfield = playfield;
    this.gameEndScreen = document.getElementById("game-over");
    this.gameIsOver = false;
    this.kitten = new Kitten(this.playfield, this);
    this.itemList = [Drone, Vacuum];
    this.itemsOnScreen = [];
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg0.png')", 30, 1);
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg1.png')", 20, 2);
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg2.png')", 10, 3);
    this.gameBg = new Gamebg(this.playfield, "url('/assets/playfield/bg3.png')", 1, 4);

    this.itemsInterval = setInterval(() => {
      this.createItem();
      }, 3000);

    this.itemsInterval = setInterval(() => {
      let newListItemOnScreen = new Snacks(this.playfield, this.kitten, this.top, this.itemsOnScreen);
      this.itemsOnScreen.push(newListItemOnScreen);
      }, 4300);
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
        this.gameEndScreen.style.display = "flex";
      }

    restartGame() {
        location.reload();
      }
  }