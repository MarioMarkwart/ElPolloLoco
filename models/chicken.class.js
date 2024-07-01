class Chicken extends MovableObject{

    CHICKEN_IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png'
    ]

    walkingSpeed = 1000;
    currentImage = 0;

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.height = 70;
        this.width = 50;
        this.x = Math.floor(Math.random() * 500) + 200;
        this.y = 360 + (Math.random() * 10 - 10);

        // this.animateChicken();
    }

    animateChicken(){
        setInterval(() => {
            let mod =  this.currentImage % this.CHICKEN_IMAGES_WALKING.length;
            let path = this.CHICKEN_IMAGES_WALKING[mod];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
}