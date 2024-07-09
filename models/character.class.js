class Character extends MovableObject{

    CHARACTER_IMAGES_WALKING = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    world;


    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_IMAGES_WALKING);
        this.animateCharacter();
    }


    animateCharacter(){
        setInterval(() => {
            if (this.world.keyboard.RIGHT){
                this.x += this.speed * 50;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT){
                this.x -= this.speed * 50;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        },1000/60);
        
        // walking animation
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                let mod = this.currentImage % this.CHARACTER_IMAGES_WALKING.length;
                let path = this.CHARACTER_IMAGES_WALKING[mod];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50)
    }



    jump(){

    }
}
