class MovableObject {
    height = 250;
    width = 100;
    x = 120;
    y = 180;

    img;
    imageCache = {};
    currentImage = 0;
    speed = .15;
    otherDirection = false;

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

    // moveRight(){
    //     this.x +=20;
    //     console.log('Moving right');
    // }
    
    // moveLeft(){
    //     this.x -=20;
    //     console.log('Moving left');
        
    // };

    moveLeftInterval(){
        let pixelMovement = Math.random() * (.5 - this.speed) + this.speed;
        setInterval(() => {
            this.x -= pixelMovement;
        }, 1000/60); 
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}