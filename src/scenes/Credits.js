class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    preload() {
        
    }

    create() {


        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start('Menu');
        }
    }
}