class Cloud extends MovableObject {
    width = 700;
    height = 300;
    y = 0;

    count = 0;

    constructor() {
        super().loadImage(IMAGES_CLOUD[(Math.floor(Math.random() * 3))]);
        this.x = Math.random() * 200;
        this.count++;
        this.setBackgroundClouds();
        this.animateCloud();

    }

    animateCloud(){
        let pixelMovement = Math.random() * (.5 - .15) + .15
        setInterval(() => {
            this.x -= pixelMovement;
        }, 1000/60); 

    }

    setBackgroundClouds(){
        console.log('Made cloud smaller')
    }
}