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

        //Sound config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};

        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu');
        }
    }
}