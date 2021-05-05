/*
Zombie Limbo: 5/4/21

Collaborators:
Gurkirat Saini
Ethan Erh
Mengya Qiu

Creative Tilt:
We made our own art, music, and sounds to fit the theme of the game.
We also added a high-score functionality.
*/

let config = {
    type: Phaser.AUTO,
    width: 1024 , //Same as background dimensions.
    height: 576, //Same as background dimensions.
    scene: [Menu, Play, HowTo, Credits, GameOver],
    scale: {
      parent: 'mygame',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  }

let game = new Phaser.Game(config);

let score = 0;
let highScore = 0;
let newHighScore = false;

// reserve keyboard vars
let keyW, keyS, keySpace, keyC, keyH, keyEsc;