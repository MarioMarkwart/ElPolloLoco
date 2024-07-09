class BackgroundObject extends MovableObject {

    constructor(imagePath, x=0) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = canvas.width
        this.height = canvas.height
    }
}