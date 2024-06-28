class MovableObject {
    height = 250;
    width = 100;
    x = 120;
    y = 180;
    img;
    imageCache = [];

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEachH(path => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        })
    }

    moveRight(){
        this.x +=20;
        console.log('Moving right');
    }

    moveLeft(){
        console.log('Moving left');
    }
}