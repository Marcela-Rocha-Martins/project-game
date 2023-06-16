window.onload = function() {
        const playfield = document.querySelector(".playfield");
        const gameInfo = document.getElementById("game-info");
        const startButton = document.getElementById("start-button");
        const restartButton = document.getElementById("restart-button");
        const introScreen = document.getElementById("intro");
        let gameplay = null; //  track if there is a game in progress

    startButton.addEventListener("click", function() {
        if (!gameplay) { // Checks if there is no game in progress
            introScreen.style.display = 'none'; // Hides the intro screen
            gameInfo.style.display = 'block'; // Shows the game info
            playfield.style.display = 'flex'; // Shows the playfield
            gameplay = new Gameplay(playfield); // Starts a new game
        }
        });

        restartButton.addEventListener("click", function() {
        gameplay.restartGame(); // Calls the restartGame method on the gameplay object
  });
};

