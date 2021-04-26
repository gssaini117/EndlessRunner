class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        // load background
        this.load.image('menuBackground', './assets/Menu_Main.png');
    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'menuBackground'
        ).setOrigin(0, 0).setDepth(0);

        // show menu text

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
         if (Phaser.Input.Keyboard.JustDown(keySpace)) {
             this.scene.start('Play');
         }
         if (Phaser.Input.Keyboard.JustDown(keyH)) {
             this.scene.start('HowTo');
         }
         if (Phaser.Input.Keyboard.JustDown(keyC)) {
             this.scene.start('Credits');
         }
    }
}