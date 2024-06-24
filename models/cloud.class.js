class Cloud extends MovableObject {
    width = 500;
    height = 300;
    y = 0;
    
    cloudImages = [
        '../assets/img/5_background/layers/4_clouds/1.png',
        '../assets/img/5_background/layers/4_clouds/2.png',
        '../assets/img/5_background/layers/4_clouds/full.png',
    ]

    constructor() {
        super().loadImage(this.cloudImages[(Math.floor(Math.random() * 3))]);
        this.x = Math.random() * 200;;
    }
}