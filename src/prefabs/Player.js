//Player prefabs
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //Procedural fields.
        //none atm.

        //Class fields
        this.lane = 2; //Starting lane
        this.DEATH_THRESHHOLD = 50 + this.width/2; //Max left pos.

        //Adding object to scene.
        scene.add.existing(this);
    }


    update() {
        //Detecting inputs.
        if(Phaser.Input.Keyboard.JustDown(keyW) &&
            this.lane > 1) 
        {   
            this.lane--
            console.log("W has been pressed");
            console.log(this.lane);
        }
        if(Phaser.Input.Keyboard.JustDown(keyS) &&
            this.lane < 3) 
        {
            this.lane++;
            console.log("S has been pressed");
            console.log(this.lane);
        }

        //Updating the player's Y matches the lane they're in.
        // Lane 1: y = 200
        // Lane 2: y = 325
        // Lane 3: y = 450
        this.y = 200 + ((this.lane - 1) * 125); //multiply by the lane sizes;
        this.setDepth(this.lane);
    }

    //Returns true if this is intersecting with obj2.
    //Returns false if this is NOT intersecting with obj2.
    //Object 2 is assumed to always be the player.
    checkCollision(obj2) {
        //Getting x distance apart.
        let distX = Math.abs(this.x - obj2.x) + 80;

        //If the distance apart is less than their hitbox AND
        //  the 2 objects are in the same lane.
        if(distX < (this.width + obj2.width)/2 &&
            this.lane == obj2.lane)
        {
            return true;
        }
        return false;
    }

    //Returns true if too far to the left.
    //Returns false otherwise.
    checkDied() {
        if(this.x < DEATH_THRESHHOLD) {
            return true;
        }
        return false;
    }

}