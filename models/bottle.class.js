class Bottle extends MovableObject {

    BOTTLE_IMAGES = [
        '../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    BOTTLE_SOUND = '../assets/audio/bottle_collect.mp3';

    constructor(){
        super();
        this.loadImage(this.BOTTLE_IMAGES[this.getRandomInt(0, this.BOTTLE_IMAGES.length)])
        this.loadImages(this.BOTTLE_IMAGES)
        this.x = this.getRandomInt(200, 2000);
        this.y = this.getRandomInt(350, 360);
        this.height = 80;
        this.width = 80;
        this.loadSound(this.BOTTLE_SOUND,.2);
    }

    collectBottle(bottle){
        world.level.bottles.splice(world.level.bottles.indexOf(bottle), 1);
        this.playSound(this.BOTTLE_SOUND);
    }

}