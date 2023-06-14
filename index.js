window.onload = function() {
    const playfield = document.querySelector(".playfield");
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let gameplay = null; // Variável para rastrear se há um jogo em andamento
  
    startButton.addEventListener("click", function() {
      if (!gameplay) { // Verifica se não há um jogo em andamento
        gameplay = new Gameplay(playfield);
      }
    });

    restartButton.addEventListener("click", function () {
        // Call the restartGame 
        gameplay.restartGame();
      });
  
    };
