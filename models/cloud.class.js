class Cloud extends MovableObject {
    width = 700;
    height = 300;
    y = 0;


    IMAGES_CLOUD = [
        '../assets/img/5_background/layers/4_clouds/1.png',
        '../assets/img/5_background/layers/4_clouds/2.png',
        '../assets/img/5_background/layers/4_clouds/full.png',
    ]

    count = 0;

    constructor() {
        super().loadImage(this.IMAGES_CLOUD[(Math.floor(Math.random() * 3))]);
        this.x = this.getRandomInt(0, 200)
        this.count++;
        this.setBackgroundClouds();
        this.animateCloud();

    }

    animateCloud(){
        this.moveLeftInterval();
    }

    setBackgroundClouds(){
        console.log('Made cloud smaller')
    }
}