class ChickenSmall extends MovableObject{

    CHICKEN_IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.height = 50;
        this.width = 30;
        this.x = this.getRandomInt(200, 2200);
        this.y = this.getRandomInt(370, 380 )
        this.loadImages(this.CHICKEN_IMAGES_WALKING);
        this.randomizeFirstPictures();

        this.animate(this.CHICKEN_IMAGES_WALKING);
    }
}