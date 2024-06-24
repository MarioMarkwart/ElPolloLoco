class MovableObject {
    height = 250;
    width = 100;
    x = 120;
    y = 200;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        this.x +=20;
        console.log('Moving right');
    }

    moveLeft(){
        console.log('Moving left');
    }
}