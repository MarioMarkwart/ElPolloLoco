class BackgroundObject extends MovableObject {

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 0;
        this.width = canvas.width
        this.height = canvas.height
    }
}