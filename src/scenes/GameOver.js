class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        // load background
        this.load.image('gameoverBackground', './assets/Menu_Gameover.png');
    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'gameoverBackground'
        ).setOrigin(0, 0).setDepth(0);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Sound config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};

        this.Gameover = this.sound.add('Sfx_Death');
        this.Gameover_Config = {mute: false, volume: 0.5, loop: false, delay: 0};

        //======================================================================
        // Gui
        //======================================================================
        this.Text_Box = this.add.rectangle(game.config.width/2, 0, 
            game.config.width, 
            game.config.height/14, 
            0xF6DF7A
        ).setOrigin(0.5, 0).setDepth(9);
        let textConfig = {
            fontFamily: 'Courier',
            backgroundColor: '#F6DF7A',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            padding: {
            top: 5,
            },
        }

        let Text = 'Final score: ' + score;
        if(newHighScore) {
            Text += '\t New Highscore!';
            highScore = score;
            newHighScore = false;
        }
        else {
            Text += '\t High Score: ' + highScore;
        }
        this.Text_Stats = this.add.text(
            this.Text_Box.x,
            this.Text_Box.y, 
            Text, 
            textConfig
        ).setDepth(10).setOrigin(0.5, 0);

        this.Gameover.play(this.Gameover_Config);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.Select.play(this.Select_Config);
            this.Gameover.stop();
            this.scene.start('Play');
        }
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.Select.play(this.Select_Config);
            this.Gameover.stop();
            this.scene.start('Menu');
        }
    }
}