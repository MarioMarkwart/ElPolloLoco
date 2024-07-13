class Character extends MovableObject{

    x = 120;
    y = 180;


    CHARACTER_IMAGES_WALKING = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    CHARACTER_IMAGES_JUMPING = [
        '../assets/img/2_character_pepe/3_jump/J-31.png',
        '../assets/img/2_character_pepe/3_jump/J-32.png',
        '../assets/img/2_character_pepe/3_jump/J-33.png',
        '../assets/img/2_character_pepe/3_jump/J-34.png',
        '../assets/img/2_character_pepe/3_jump/J-35.png',
        '../assets/img/2_character_pepe/3_jump/J-36.png',
        '../assets/img/2_character_pepe/3_jump/J-37.png',
        '../assets/img/2_character_pepe/3_jump/J-38.png',
        '../assets/img/2_character_pepe/3_jump/J-39.png'
    ]

    world;
    walking_sound = new Audio('../assets/audio/walk.mp3');

    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_IMAGES_WALKING);
        this.loadImages(this.CHARACTER_IMAGES_JUMPING);
        this.animateCharacter();
        this.applyGravity();
    }


    animateCharacter(){
        setInterval(() => {
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -1300){
                this.moveLeft();
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump(12);
            }

            this.world.camera_x = -this.x + 100;
        },1000/60);

        // walking and jumping animation
        setInterval(() => {
            if (this.isAboveGround()){
                this.playAnimation(this.CHARACTER_IMAGES_JUMPING);
            }else{
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.CHARACTER_IMAGES_WALKING);
                }
                else(
                    this.walking_sound.pause()
                )
            }
        }, 50)
    }
}
