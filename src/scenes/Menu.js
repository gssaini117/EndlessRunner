class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        // load background
        this.load.image('menuBackground', './assets/menu_Main.png');

    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'menuBackground'
        ).setOrigin(0, 0).setDepth(0);

        // show menu text

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.SPACE);
    }

    update() {
         if (Phaser.Input.Keyboard.JustDown(keySpace)) {
             this.scene.start('playScene');
         }
    }
}