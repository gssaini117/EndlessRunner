// Play scene
class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    preload() {
        //Loading image/tile sprites.
        this.load.image('Background1', './assets/background1.png');
        this.load.image('Background2', './assets/background2.png');
        this.load.image('Crate', './assets/obstacle_Crate.png');
        this.load.image('Bin', './assets/obstacle_Bin.png');
        this.load.image('Blockade', './assets/obstacle_Blockade.png');

        //Loading spritesheets.
        this.load.spritesheet('Player', './assets/player.png',
            {frameWidth: 128, frameHeight: 256, startFrame: 0, endFrame: 5}
        );
        this.load.spritesheet('Zombie_Chibi', './assets/zombie_Chibi.png',
            {frameWidth: 128, frameHeight: 256, startFrame: 0, endFrame: 5}
        );
        this.load.spritesheet('Zombie_Scary', './assets/zombie_Scary.png',
            {frameWidth: 128, frameHeight: 256, startFrame: 0, endFrame: 7}
        );
        this.load.spritesheet('Zombie_Hand', './assets/zombie_Hand.png',
            {frameWidth: 128, frameHeight: 256, startFrame: 0, endFrame: 5}
        );
    }

    create() {
        //======================================================================
        // Asset Setup
        //======================================================================
        //Background config
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'starfield'
        ).setOrigin(0, 0).setDepth(0);

        //Animation config
        this.anims.create({ //Player
            key: 'Player_Loop', frameRate: 6, repeat: -1,
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
        this.Obstacles = new phaser.GameObjects.Group(this);
        // Spawning obstacles.
        this.SpawnCooldown = false; // Can't spawn obstacles if true.
        this.BASE_SPAWN_RATE = 2; //Fixed base spawn delay in seconds.

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
        this.Text_Box = this.add.rectangle(game.config.width/8, 5, 
            game.config.width/2, 
            game.config.height/16, 
            0xF6DF7A
        ).setOrigin(0.5, 0).setDepth(9);
        let textConfig = {
            fontFamily: 'Courier',
            backgroundColor: '#F6DF7A',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            padding: {
            top: 10,
            bottom: 10,
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
            this, game.config.width/6, game.config.height/4, 'Player', 0,
        ).setDepth(5).setOrigin(0.5, 0.5).play('Player_Loop');
    }

    update() {
        //======================================================================
        // Updating stats
        //======================================================================
        //Updating background.
        this.background.tilePositionX -= 4;

        //Updating time ui.
        this.Text_Stats.setText("Time survived: " + this.Time + " seconds");
        
        //Updating timer.
        if(!this.TimeCooldown) {
            this.TimeCooldown = true;
            setTimeout(() => { //Delaying score update.
                this.Time += 1;
                this.TimeCooldown = true;
            }, 1000);
        }

        //Spawning obstacle.
        if(!this.SpawnCooldown) {
            this.SpawnCooldown = true;
            setTimeout(() => { //Delaying spawn.
                this.spawnObstacle();
            }, this.BASE_SPAWN_RATE);
        }

        //======================================================================
        // Collision
        //======================================================================
        var Temp = this; //Scene reference as 'this' != scene inside a forEach.
        
        //Updating obstacle positions + checking collisions.
        this.Obstacles.getChildren().forEach(function(Obstacle) {
            Obstacle.update(); //Update

            if(Obstacle.checkCollision(Temp.Player)) { //Collision
                console.log('Player has been hit!');
                Temp.Monsters.remove(Obstacle, true, true);
            }
        });

        //======================================================================
        // Flag Check
        //======================================================================
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
            case 1: // Blockade
                texture = 'Blockade';
            case 2: // Bin
                texture = 'Bin';
            case 3: // Chibi
                texture = 'Zombie_Chibi';
                AnimationID = 'Chibi_Loop';
                isAnimated = true;  
            case 4: // Scary
                texture = 'Zombie_Scary';
                AnimationID = 'Scary_Loop';
                isAnimated = true;  
            case 5: // Hand
                texture = 'Zombie_Hand';
                AnimationID = 'Hand_Loop';
                isAnimated = true;  
        }
        //Creation
        let obstacle = new Obstacle (this, game.config.width*1.2, 
            game.config.height / 2,
            texture, 0, lane,
            4
        ).setOrigin(0.5, 1).setDepth(lane);

        if(isAnimated) { //Checking for animation
            obstacle.play(AnimationID);
        }

        this.Obstacles.add(obstacle); //Spawning in.
        this.SpawnCooldown = false; //Updating cooldown.
    }
}