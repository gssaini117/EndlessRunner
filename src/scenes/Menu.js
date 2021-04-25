class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {

    }

    update() {
        this.scene.start('Play'); 
    }
}