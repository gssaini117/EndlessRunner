//Player prefabs
class Player extends phaser.gameObjects {
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
            this.lane < 3) 
        {
            this.lane++;
        }
        if(Phaser.Input.Keyboard.JustDown(keyS) &&
            this.lane > 1) 
        {
            this.lane--;
        }

        //Updating the player's Y matches the lane they're in.
        this.y = this.lane //multiply by the lane sizes;

    }

    //Returns true if this is intersecting with obj2.
    //Returns false if this is NOT intersecting with obj2.
    //Object 2 is assumed to always be the player.
    checkCollision(obj2) {
        //Getting x distance apart.
        let distX = Math.abs(this.x - obj2.x);

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