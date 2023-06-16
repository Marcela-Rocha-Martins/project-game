# Cat X Machine Game

Cat X Machine is a simple web-based game where you control a cat character and try to avoid machines while collecting snacks to gain lives. Use the keyboard to control the cat's jump and crouch movements.

## How to Play

- Press ARROW UP or SPACE to make the cat jump.
- Press ARROW DOWN to make the cat crouch.
- Avoid the machines and obstacles.
- Collect snacks to gain lives.

## Screens

### Start Screen

The start screen provides an introduction to the game and instructions for controlling the cat. To start the game, click the "START" button.

### Game Screen

The game screen displays the current score and number of lives remaining. The playfield is where the cat character and obstacles are located.

### Game Over Screen

When the game ends, either by running out of lives or colliding with an obstacle, the game over screen is displayed. It shows a cat image and a "Restart" button to play the game again.

## Technologies Used

The game utilizes HTML, CSS, and JavaScript. The following scripts are included:

- items.js: Contains the logic for game items and their behavior.
- kitten.js: Defines the Kitten class responsible for the cat character's actions.
- bg-playfield.js: Manages the background and playfield of the game.
- gameplay.js: Handles the overall gameplay, including score tracking and game over conditions.
- index.js: The main entry point of the game.

External library:

- FontAwesome is included for additional icons.

## Kitten Class

The `Kitten` class represents the cat character in the game. It manages the cat's position, movement, animations, collision detection, and interaction with other game elements.

### Properties

- playfield: The playfield element where the kitten is placed.
- gameplay: The gameplay object associated with the kitten.
- score: The current score of the kitten.
- scoreLifeCounter: Counter used to track score-based events.
- lives: The number of lives remaining for the kitten.
- left: The initial left position of the kitten.
- initialTop: The initial top position of the kitten.
- top: The current top position of the kitten.
- width: The width of the kitten.
- initialHeight: The initial height of the kitten.
- height: The current height of the kitten.
- crounchedHeight: The height of the kitten when crouching.
- updateSpeed: The speed at which the kitten's movement is updated.
- element: The HTML element representing the kitten.
- runningKittenAnim: The URL of the running animation for the kitten.
- jumpingKittenAnim: The URL of the jumping animation for the kitten.
- fallingKittenAnim: The URL of the falling animation for the kitten.
- crounchKittenAnim: The URL of the crouching animation for the kitten.
- jumpSound: The audio element for the jump sound effect.
- damageSound: The audio element for the damage sound effect.
- snackSound: The audio element for the snack sound effect.
- isCrouching: A flag indicating whether the kitten is currently crouching.
- isJumping: A flag indicating whether the kitten is currently jumping.
- isFalling: A flag indicating whether the kitten is currently falling.
- jumpSpeed: The speed at which the kitten jumps.
- jumpHeight: The maximum height the kitten can jump.
- jumpDurationInSeconds: The duration of the jump animation in seconds.
- jumpCycleLength: The length of a single jump cycle in milliseconds.
- jumpMaxHeight: The maximum height the kitten can reach during a jump.
- jumpMomentum: The momentum of the kitten's jump.
- jumpAcceleration: The acceleration of the kitten's jump.
- scoreDisplay: The HTML element displaying the score.
- livesDisplay: The HTML element displaying the remaining lives.
- checkJumpInterval: The interval used to check and control the kitten's movement.

### Methods

> controlMovement(): Controls the kitten's movement based on its current state (jumping, falling, or crouching).
> checkCollidesWith(item): Checks if the kitten collides with a given item.
> changingScore(): Increases the score and updates the score display.
> increaseLives(): Increases the number of lives for the kitten and updates the lives display.
> decreaseLives(): Decreases the number of lives for the kitten, plays the damage sound effect, and checks if the game is over.
> destroy(): Removes the kitten element from the DOM.

## Item Class

The `Item` class represents a game item in the game, such as an obstacle or a snack. It manages the item's position, movement, collision detection, and interaction with other game elements.

### Properties

- playfield: The playfield element where the item is placed.
- width: The width of the item.
- height: The height of the item.
- left: The left position of the item.
- top: The top position of the item.
- kitten: The kitten object in the game.
- itemsOnScreen: The array of items currently on the screen.
- element: The HTML element representing the item.
- moveInterval: The interval for updating the item's movement.

### Methods

> constructor(playfield, kitten, top, itemsOnScreen): Initializes the item with the provided parameters, creates the HTML element, and adds it to the playfield.
> update(): Updates the item's movement and checks for collisions with the kitten.
> move(): Moves the item to the left and handles destroying the item if it goes off the screen.
> collisionsGameActions(): Checks for collisions with the kitten and performs corresponding actions based on the item type.
> destroy(): Clears the move interval and removes the item's HTML element from the playfield.

Note: The Vacuum, Snacks, and Drone classes inherit from the Item class.

## Vacuum Class

The `Vacuum` class extends the `Item` class and represents a vacuum obstacle in the game.

### Properties

- playfield: The playfield element where the vacuum is placed.
- width: The width of the vacuum.
- height: The height of the vacuum.
- left: The left position of the vacuum.
- top: The top position of the vacuum.
- kitten: The kitten object in the game.
- itemsOnScreen: The array of items currently on the screen.
- element: The HTML element representing the vacuum.

### Methods

> constructor(playfield, kitten, top, itemsOnScreen, element)
> Initializes the vacuum with the provided parameters, creates the HTML element with the vacuum image, and adds it to the playfield.

> update()
> Updates the vacuum's movement and checks for collisions with the kitten by calling the parent's update() method.

## Snacks Class

The `Snacks` class extends the `Item` class and represents a snack in the game.

### Properties

- playfield: The playfield element where the snack is placed.
- width: The width of the snack.
- height: The height of the snack.
- left: The left position of the snack.
- top: The top position of the snack.
- kitten: The kitten object in the game.
- itemsOnScreen: The array of items currently on the screen.
- element: The HTML element representing the snack.

### Methods

> constructor(playfield, kitten, top, itemsOnScreen, element)
> Initializes the snack with the provided parameters, creates the HTML element with the snack image, and adds it to the playfield.

> update()
> Updates the snack's movement and checks for collisions with the kitten by calling the parent's update() method.

## Drone Class

The `Drone` class extends the `Item` class and represents a drone obstacle in the game.

### Properties

[Include the provided Drone class code here]

### Methods

[Include the provided Drone class code here]

## Gamebg Class

The `Gamebg` class manages the game's background and playfield.

### Properties

- playfield: The HTML element representing the game playfield.
- zIndex: The z-index of the background elements.
- background: The background image for the playfield.
- element1left: The initial left position of the first background element.
- element2left: The initial left position of the second background element.
- speed: The speed at which the background elements move.

### Methods

> update(): Updates the position of the background elements and resets their positions when necessary.

## Usage

To use the provided code, follow these steps:

1. Clone the repository: `git clone https://github.com/Marcela-Rocha-Martins/project-game1`
2. Open the `index.html` file in a web browser.
3. Follow the on-screen instructions to play the game.
