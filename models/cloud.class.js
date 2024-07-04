class Cloud extends MovableObject {
    width = 700;
    height = 300;
    y = 0;


    count = 0;

    constructor() {
        super().loadImage(IMAGES_CLOUD[(Math.floor(Math.random() * 3))]);
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