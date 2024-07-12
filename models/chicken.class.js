class Chicken extends MovableObject{

    CHICKEN_IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    walkingSpeed = 1000;

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.height = 70;
        this.width = 50;
        this.x = this.getRandomInt(200, 500);
        this.y = this.getRandomInt(350, 360)
        this.loadImages(this.CHICKEN_IMAGES_WALKING);
        this.animateChicken();
    }

    animateChicken(){
        this.moveLeftInterval();
        setInterval(() => {
            this.playAnimation(this.CHICKEN_IMAGES_WALKING);
        }, 200);
    }
}