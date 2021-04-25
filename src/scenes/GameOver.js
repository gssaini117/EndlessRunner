class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {

    }

    create() {


        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('Play');
        }
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start('Menu');
        }
    }
}