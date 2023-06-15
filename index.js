window.onload = function() {
    const playfield = document.querySelector(".playfield");
    const gameInfo = document.getElementById("game-info");
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const introScreen = document.getElementById("intro");
    let gameplay = null; // Variável para rastrear se há um jogo em andamento
  
    startButton.addEventListener("click", function() {
      if (!gameplay) { // Verifica se não há um jogo em andamento
        introScreen.style.display = 'none';
        gameInfo.style.display = 'block';
        playfield.style.display = 'flex';
        gameplay = new Gameplay(playfield);
      }
    });

    restartButton.addEventListener("click", function () {
        // Call the restartGame 
        gameplay.restartGame();
      });
  
    };
