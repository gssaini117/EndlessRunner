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
            newHighScore = false;
        }
        this.Text_Stats = this.add.text(
            this.Text_Box.x,
            this.Text_Box.y, 
            Text, 
            textConfig
        ).setDepth(10).setOrigin(0.5, 0);
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