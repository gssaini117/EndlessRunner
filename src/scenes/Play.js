// Play scene
class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    preload() {
        //Loading image/tile sprites.
        this.load.image('Background1', './assets/Background1.png');
        this.load.image('Background2', './assets/background2.png');
        this.load.image('Crate', './assets/obstacle_Crate.png');
        this.load.image('Bin', './assets/obstacle_Bin.png');
        this.load.image('Blockade', './assets/obstacle_Blockade.png');

        //Loading spritesheets.
        this.load.spritesheet('Player', './assets/player.png',
            {frameWidth: 141.6666666666666, frameHeight: 256, startFrame: 0, endFrame: 5}
        );
        this.load.spritesheet('Zombie_Chibi', './assets/zombie_Chibi.png',
            {frameWidth: 128, frameHeight: 256, startFrame: 0, endFrame: 5}
        );
        this.load.spritesheet('Zombie_Scary', './assets/zombie_Scary.png',
            {frameWidth: 137.5, frameHeight: 256, startFrame: 0, endFrame: 7}
        );
        this.load.spritesheet('Zombie_Hand', './assets/zombie_Hand.png',
            {frameWidth: 256, frameHeight: 256, startFrame: 0, endFrame: 5}
        );
    }

    create() {
        //======================================================================
        // Asset Setup
        //======================================================================
        //Background config
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'Background1'
        ).setOrigin(0, 0).setDepth(0);

        //Animation config
        this.anims.create({ //Player
            key: 'Player_Loop', frameRate: 9, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 0, end: 5, first: 0}),
        });
        this.anims.create({ //Zombie-Chibi
            key: 'Chibi_Loop', frameRate: 6, repeat: -1,
            frames: this.anims.generateFrameNumbers('Zombie_Chibi', { start: 0, end: 5, first: 0}),
        });
        this.anims.create({ //Zombie-Scary
            key: 'Scary_Loop', frameRate: 6, repeat: -1,
            frames: this.anims.generateFrameNumbers('Zombie_Scary', { start: 0, end: 5, first: 0}),
        });
        this.anims.create({ //Zombie-Hand
            key: 'Hand_Loop', frameRate: 6, repeat: -1,
            frames: this.anims.generateFrameNumbers('Zombie_Hand', { start: 0, end: 5, first: 0}),
        });

        //Sound config
        // None yet

        //======================================================================
        // Technical
        //======================================================================
        // Group for storing obstacles.
        this.Obstacles = new Phaser.GameObjects.Group(this);
        // Spawning obstacles.
        this.SpawnCooldown = false; // Can't spawn obstacles if true.
        this.BASE_SPAWN_RATE = 2000; //Fixed base spawn delay in seconds.

        // Timer / Score
        this.Time = 0; // How long the player has survived for.
        this.TimeCooldown = false; // Waits 1s before updating timer if true.

        // Defining keys.
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Flags
        this.GameOver = false; //If the player is defeated.
        this.PlayingGameOver = false; //Playing gameover sequence.

        //======================================================================
        // Gui
        //======================================================================
        //Upper score box
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
        this.Text_Stats = this.add.text(
            this.Text_Box.x,
            this.Text_Box.y, 
            "Time survived: " + this.Time + " seconds", 
            textConfig
        ).setDepth(10).setOrigin(0.5, 0);

        //======================================================================
        // Starting game
        //======================================================================
        this.Player = new Player(
            this, game.config.width/4, 325, 'Player', 0,
        ).setDepth(5).setOrigin(0.5, 0.5).play('Player_Loop');
    }

    update() {
        let gameSpeed = 4 + this.Time / 20;
        //======================================================================
        // Updating stats
        //======================================================================
        
        if(!this.GameOver) {
            //Updating background.
            this.background.tilePositionX += gameSpeed;

            //Updating player
            this.Player.update();

            //Updating time ui.
            this.Text_Stats.setText("Time survived: " + this.Time + " seconds");
            
            //Updating timer.
            if(!this.TimeCooldown) {
                this.TimeCooldown = true;
                setTimeout(() => { //Delaying score update.
                    this.Time++;
                    this.TimeCooldown = false;
                }, 1000);
            }

            //Spawning obstacle.
            if(!this.SpawnCooldown &&
                !this.GameOver    
            ) {
                this.SpawnCooldown = true;
                setTimeout(() => { //Delaying spawn.
                    this.spawnObstacle();
                }, this.BASE_SPAWN_RATE * (1 - gameSpeed/10));
            }
        }

        //======================================================================
        // Collision
        //======================================================================
        var Temp = this; //Scene reference as 'this' != scene inside a forEach.
        
        //Updating obstacle positions + checking collisions.
        this.Obstacles.getChildren().forEach(function(Obstacle) {
            Obstacle.update(gameSpeed); //Update

            if(Obstacle.checkCollision(Temp.Player)) { //Collision
                Temp.GameOver = true;
            }
        });

        //======================================================================
        // Flag Check
        //======================================================================
        if(this.GameOver &&
            !this.PlayingGameOver) 
        {
            this.PlayingGameOver = true;
            if(this.Time > highScore) {
                highScore = this.Time;
                newHighScore = true;
            }
            score = this.Time;
            this.scene.start('GameOver');
        }
    }

    spawnObstacle() {
        //Setup
        let lane = Math.floor(Math.random() * 3) + 1; // 1 to 3
        let texture = '';
        let AnimationID = '';
        let isAnimated = false;

        //Selecting obstacle texture.
        switch(Math.floor(Math.random() * 6)) { // 0 to 5
            case 0: // Crate
                texture = 'Crate';
                break;
            case 1: // Blockade
                texture = 'Blockade';
                break;
            case 2: // Bin
                texture = 'Bin';
                break;
            case 3: // Chibi
                texture = 'Zombie_Chibi';
                AnimationID = 'Chibi_Loop';
                isAnimated = true;  
                break;
            case 4: // Scary
                texture = 'Zombie_Scary';
                AnimationID = 'Scary_Loop';
                isAnimated = true;  
                break;
            case 5: // Hand
                texture = 'Zombie_Hand';
                AnimationID = 'Hand_Loop';
                isAnimated = true;  
                break;
        }
        //Creation
        let obstacle = new Obstacle (this, game.config.width*1.2, 
            200 + ((lane - 1) * 125),
            texture, 0, lane,
            4 + Math.floor(this.Time / 10)
        ).setOrigin(0.5, 0.5).setDepth(lane);

        if(isAnimated) { //Checking for animation
            obstacle.play(AnimationID);
        }

        this.Obstacles.add(obstacle); //Spawning in.
        this.SpawnCooldown = false; //Updating cooldown.
    }
}