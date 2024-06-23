class MovableObject {
    x;
    y;
    img;

    constructor(x, y, img){
        this.x = x;
        this.y = y;
        this.img = img;
    }
    moveRight(){
        console.log('Moving right');
        this.x += 10;
        ctx.drawImage(this.img, this.x, this.y, 50, 150);
    }
}