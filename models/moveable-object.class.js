class MovableObject {
    height = 250;
    width = 100;

    img;
    imageCache = {};
    currentImage = 0;
    speed = .15;
    otherDirection = false;
    speedY = 0;
    acceleration = .5;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/60);
    }

    isAboveGround(){
        return this.y < 180;
    }
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    playAnimation(images){
        let mod = this.currentImage % images.length;
        let path = images[mod];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    moveLeftInterval(){
        let pixelMovement = Math.random() * (.5 - this.speed) + this.speed;
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
        console.log('jumping');
        this.speedY = height;
    }
    
}