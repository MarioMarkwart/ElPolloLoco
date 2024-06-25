class Cloud extends MovableObject {
    width = 500;
    height = 300;
    y = 0;

    constructor() {
        super().loadImage(cloudImages[(Math.floor(Math.random() * 3))]);
        this.x = Math.random() * 200;;
    }
}