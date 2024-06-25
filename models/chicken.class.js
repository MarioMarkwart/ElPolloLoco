class Chicken extends MovableObject{

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.height = 70;
        this.width = 50;
        this.x = Math.floor(Math.random() * 500) + 200;
        this.y = 360 + (Math.random() * 10 - 10);
    }

}