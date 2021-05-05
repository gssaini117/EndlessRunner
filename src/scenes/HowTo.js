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

        //Sound config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu');
        }
    }
}