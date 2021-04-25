let config = {
    type: Phaser.AUTO,
    width: 1024 , //Same as background dimensions.
    height: 576, //Same as background dimensions.
    scene: [Menu, Play],
    scale: {
      parent: 'mygame',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  }

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyW, keyS, keySpace;