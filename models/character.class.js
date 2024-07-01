class Character extends MovableObject{

    CHARACTER_IMAGES_WALKING = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png'
    ]
    walkingSpeed = 100;
    currentImage = 0;


    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_IMAGES_WALKING);
        this.animateCharacter();
    }


    animateCharacter(){
        setInterval(() => {
            let mod = this.currentImage % this.CHARACTER_IMAGES_WALKING.length;
            let path = this.CHARACTER_IMAGES_WALKING[mod];
            this.img = this.imageCache[path];
            this.currentImage++;
        },this.walkingSpeed);
    }


    jump(){

    }
}
