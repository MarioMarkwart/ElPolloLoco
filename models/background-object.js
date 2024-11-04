class BackgroundObject extends MovableObject {


    /**
     * Creates a new BackgroundObject.
     *
     * @param {string} imagePath - the path to the image for this background
     * @param {number} [x=0] - the x-coordinate of this background
     */
    constructor(imagePath, x=0) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}