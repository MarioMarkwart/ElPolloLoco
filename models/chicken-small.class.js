class ChickenSmall extends MovableObject{

    CHICKEN_IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    chicken_small_chirp = '../assets/audio/chicken_small_chirp.mp3';

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.height = 50;
        this.width = 30;
        this.x = this.getRandomInt(200, 2200);
        this.y = this.getRandomInt(370, 380 )
        this.loadImages(this.CHICKEN_IMAGES_WALKING);
        this.loadSound(this.chicken_small_chirp, 0.02);
        this.randomizeFirstPictures();
        this.playSound(this.chicken_small_chirp, this.getRandomFloat(0.5, 1.5));
        this.animate(this.CHICKEN_IMAGES_WALKING);
    }
}