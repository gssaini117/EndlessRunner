class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    preload() {
        // load background
        this.load.image('creditsBackground', './assets/Menu_Credits.png');
    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'creditsBackground'
        ).setOrigin(0, 0).setDepth(0);


        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start('Menu');
        }
    }
}