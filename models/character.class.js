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
    walking_sound = '../assets/audio/character_walk.mp3';

    jumping_sounds = [
        '../assets/audio/character_jump_0.mp3',
        '../assets/audio/character_jump_1.mp3',
        '../assets/audio/character_jump_2.mp3',
        '../assets/audio/character_jump_3.mp3',
        '../assets/audio/character_jump_4.mp3',
        '../assets/audio/character_jump_5.mp3',
        '../assets/audio/character_jump_6.mp3',
        '../assets/audio/character_jump_7.mp3',
        '../assets/audio/character_jump_8.mp3',
        '../assets/audio/character_jump_9.mp3',
        '../assets/audio/character_jump_10.mp3',
        '../assets/audio/character_jump_11.mp3',
        '../assets/audio/character_jump_12.mp3',
        '../assets/audio/character_jump_13.mp3',
        '../assets/audio/character_jump_14.mp3'
    ];

    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_IMAGES_WALKING);
        this.loadImages(this.CHARACTER_IMAGES_JUMPING);
        this.loadImages(this.CHARACTER_IMAGES_HURT);
        this.loadImages(this.CHARACTER_IMAGES_DEAD)
        this.loadSound(this.walking_sound);
        this.loadSounds(this.jumping_sounds);
        this.setJumpingSoundVolume(.3)
        this.animateCharacter();
        this.applyGravity();
    }

    setJumpingSoundVolume(vol){
        this.jumping_sounds.forEach(sound =>{
            this.soundCache[sound].volume = vol;
        }
     )
    }
    
    playRandomJumpingSound(){
        let sound = this.soundCache[this.jumping_sounds[this.getRandomInt(0, this.jumping_sounds.length)]];
        console.log("SOUND: ", sound);
        sound.play();
        // this.getRandomInt(0, Array.from(this.jumping_sounds).length)
    }

    stopAllJumpingSounds(){
        this.jumping_sounds.forEach(sound =>{
            this.soundCache[sound].pause();
        })
    }

    animateCharacter(){
        setInterval(() => {
            if (this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.playSound(this.walking_sound);
            }
            if (this.world.keyboard.LEFT && this.x > -1300){
                this.moveLeft();
                this.playSound(this.walking_sound);
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump(12);
                this.playRandomJumpingSound();
            }

            this.world.camera_x = -this.x + 100;
        },1000/60);

        // walking and jumping animation
        setInterval(() => {
            if (this.isDead()){
                this.playAnimation(this.CHARACTER_IMAGES_DEAD);
                this.stopSound(this.walking_sound)
                this.stopAllJumpingSounds();
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
                    this.stopSound(this.walking_sound)
                )
            }
        }, 50)
    }
}
