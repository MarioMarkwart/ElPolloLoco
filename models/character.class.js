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

    CHARACTER_IMAGES_HURT = [
        '../assets/img/2_character_pepe/4_hurt/H-41.png',
        '../assets/img/2_character_pepe/4_hurt/H-42.png',
        '../assets/img/2_character_pepe/4_hurt/H-43.png',
    ]

    CHARACTER_IMAGES_DEAD = [
        '../assets/img/2_character_pepe/5_dead/D-51.png',
        '../assets/img/2_character_pepe/5_dead/D-52.png',
        '../assets/img/2_character_pepe/5_dead/D-53.png',
        '../assets/img/2_character_pepe/5_dead/D-54.png',
        '../assets/img/2_character_pepe/5_dead/D-55.png',
        '../assets/img/2_character_pepe/5_dead/D-56.png',
        '../assets/img/2_character_pepe/5_dead/D-57.png',
    ]

    world;
    walking_sound = new Audio('../assets/audio/walk.mp3');

    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_IMAGES_WALKING);
        this.loadImages(this.CHARACTER_IMAGES_JUMPING);
        this.loadImages(this.CHARACTER_IMAGES_HURT);
        this.loadImages(this.CHARACTER_IMAGES_DEAD)
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
            if (this.isDead()){
                this.playAnimation(this.CHARACTER_IMAGES_DEAD);
            }
            else if(this.isHurt()){
                this.playAnimation(this.CHARACTER_IMAGES_HURT);
            }
            else if (this.isAboveGround()){
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
