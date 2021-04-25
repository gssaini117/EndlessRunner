//Obstacle prefabs
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, lane, movespeed) {
        super(scene, x, y, texture, frame);

        //Procedural fields.
        this.lane = lane; //Which lane it exists in.
        this.movement_Speed = movespeed; //Horizontal scroll speed.
        this.Scene = scene;

        //Hard-coded fields.
        //None atm.

        //Flipping specific sprites
        if(texture == 'Zombie_Chibi' ||
            texture == 'Zombie_Scary') 
        {
            this.flipX = true;
        }

        //Adding object to scene.
        scene.add.existing(this);
    }


    update(speed) {
        //Continuously move to the left.
        if(!this.scene.GameOver) {
            this.x -= speed;
        }
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

}