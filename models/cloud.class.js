class Cloud extends MovableObject {
    
    cloudImages = [
        '../assets/img/5_background/layers/4_clouds/1.png',
        '../assets/img/5_background/layers/4_clouds/2.png',
        '../assets/img/5_background/layers/4_clouds/full.png',
    ]

    constructor() {
        super().loadImage(this.cloudImages[(Math.floor(Math.random() * 3))]);
        this.width = 500;
        this.height = 300;
        this.x = Math.random() * 200;;
        this.y = 0;
    }
}