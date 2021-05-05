class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        // load background
        this.load.image('menuBackground', './assets/menu_Main.png');

        // load audio
        this.load.audio('Music_Play', './assets/ZombieLimboTrack.mp3');
        this.load.audio('Sfx_Select', './assets/select.mp3');
        this.load.audio('Sfx_Zombie', './assets/zombie.mp3');
        this.load.audio('Sfx_Death', './assets/game_over.mp3');
    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'menuBackground'
        ).setOrigin(0, 0).setDepth(0);

        //Sound config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
         if (Phaser.Input.Keyboard.JustDown(keySpace)) {
             this.Select.play(this.Select_Config);
             this.scene.start('Play');
         }
         if (Phaser.Input.Keyboard.JustDown(keyH)) {
            this.Select.play(this.Select_Config);
             this.scene.start('HowTo');
         }
         if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.Select.play(this.Select_Config);
             this.scene.start('Credits');
         }
    }
}