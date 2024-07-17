class ThrowableObject extends MovableObject {

    constructor(x, y){
        super();
        this.loadImage('../assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(x, y)
    }

    throw(){
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        },25)
    }
}