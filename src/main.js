// Leon Ng
// Rocket Patrol Redux
// Hours Taken:
// Modifications Implemented:
// Implement the speed increase that happens after 30 seconds in the original game (1)
//      added method in spaceship.js to increase speed
//      after 30 seconds calls method in spaceship.js to increase speed
// TODO: Implement the 'FIRE' UI text from the original game (1)
// TODO: Randomize each spaceship's movement direction at the start of each play (1)
// Allow the player to control the Rocket after it's fired (1)
//      player can use <- -> to move the rocket after firing, rocket now resets at the middle

// TODO: Display the time remaining (in seconds) on the screen (3)
// TODO: Create a new title screen (e.g., new artwork, typography, layout) (3)
// TODO: Implement mouse control for player movement and left mouse click to fire (5)
// TODO: Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;
