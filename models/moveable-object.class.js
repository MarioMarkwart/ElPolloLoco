class MovableObject extends DrawableObject{
    speed = .15;
    otherDirection = false;
    speedY = 0;
    acceleration = .5;
    energy = 100;
    lastHit = 0;


    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/60);
    }


    isAboveGround(){
        if (this instanceof ThrowableObject) return true;
        return this.y < 180;
    }


    playAnimation(images){
        let mod = this.currentImage % images.length;
        let path = images[mod];
        this.img = this.imageCache[path];
        this.currentImage++;
    };


    moveLeftInterval() {
        let pixelMovement = Math.random() * (1 - this.speed) + this.speed;
        setInterval(() => {
            this.x -= pixelMovement;
        }, 1000/60); 
    }


    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    randomizeFirstPictures() {
        this.currentImage = this.getRandomInt(0,  Object.keys(this.imageCache).length);
    }


    moveLeft(){
        this.x -= this.speed * 50;
        this.otherDirection = true;
    }


    moveRight(){
        this.x += this.speed * 50;
        this.otherDirection = false;
    }


    jump(height){
        this.speedY = height;
    }


    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    hit(){
        if (this.energy > 0) {
            this.lastHit = new Date().getTime(); 
            this.energy -= 5;
        }
        console.log("energy: " + this.energy);
    }


    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }


    isDead(){
        return this.energy == 0;
    }

    animate(imageArr) {
        this.moveLeftInterval();
        setInterval(() => {
            this.playAnimation(imageArr);
        }, 200);
    }
}