class Endboss extends MovableObject {
    width = 200
    height = 300
    x = 2500;
    y = 150;

    IMAGES_WALKING = [
        '../assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ]


    constructor() {
        super().loadImage('../assets/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}