class Bottle extends DrawableObject{

    BOTTLE_IMAGES = [
        '../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    constructor(){
        super();
        this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        // this.loadImages(this.BOTTLE_IMAGES)
        this.x = this.getRandomInt(200, 2000);
        this.y = this.getRandomInt(350, 360);
        this.height = 80;
        this.width = 80;   
    }
}