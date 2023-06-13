class Collectables {
    constructor(){
    this.playfield = playfield;
    this.kitten = kitten;
    this.width = 10;
    this.height = 10;
    this.left = 400; // Initialize the obstacle to the right of the playfield 
    this.top = 250;

    this.element = document.createElement("div");
    this.element.className = "collectable";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.background = "yellow";
    this.playfield.appendChild(this.element);

    this.moveInterval = setInterval(() => this.move(), 50);

    }

        move() {
        this.left -= 3; // Move the obstacle to the left
    
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

        updatePosition() {
        let leftPosition = parseInt(collectable.style.left);
        let topPosition = parseInt(collectable.style.top);
    
        // Mover objeto colecionável
        leftPosition -= 10; // velocidade horizontal
    
        // Verificar colisão com o jogador
        let kitten = document.getElementById('kitten');
        let playerRect = player.getBoundingClientRect();
       let collectableRect = collectable.getBoundingClientRect();
    
        if (
          collectableRect.left < kittenRect.right &&
          collectableRect.right > kitteRect.left &&
          collectableRect.top < kittenRect.bottom &&
          collectableRect.bottom > kittenRect.top
        ) {
          // Ocorreu uma colisão com o jogador
          collectable.remove(); // remover objeto colecionável
          // Atualizar pontuação do jogador
          let score = parseInt(document.getElementById('score-display').textContent);
          score += 10;
          document.getElementById('score-display').textContent = score;
    
          if (score === 50) {
            // O jogador venceu o jogo
            gameWon();
          }
        }
    
        // Atualizar posição do objeto colecionável
        collectable.style.left = left + 'px';
        collectable.style.top = top + 'px';
    
        // Verificar se o objeto colecionável saiu da tela
        if (left + collectableRect.width < 0) {
          collectable.remove(); // remover objeto colecionável
        } else {
          // Continuar atualizando a posição
          requestAnimationFrame(updatePosition);
        }
      }
    
        // Iniciar atualização da posição do objeto colecionável
         updatePosition();

       // Função para quando o jogador vence o jogo
        gameWon () {
        alert('Congrats!');
      }
}




