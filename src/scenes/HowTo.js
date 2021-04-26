class HowTo extends Phaser.Scene {
    constructor() {
        super("HowTo");
    }

    preload() {
        // load background
        this.load.image('howtoBackground', './assets/Menu_Howto.png');
    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'howtoBackground'
        ).setOrigin(0, 0).setDepth(0);

        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start('Menu');
        }
    }
}