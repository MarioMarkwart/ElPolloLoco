class Sounds extends MovableObject{
    sounds = {};
    soundsAreEnabled = true;

constructor(){
    super();
    this.sounds = {
        run: new Audio('../assets/audio/character_walk.mp3'),
        // jump: new Audio('audio/character_jump.mp3'),
        // characterDeath: new Audio('audio/character_death.mp3'),
        // stop: new Audio('audio/stop.mp3'),
        // chicken: new Audio('audio/chicken_death.mp3'),
        chicken: new Audio('../assets/audio/chicken.mp3'),
        coin: new Audio('../assets/audio/coin.mp3'),
        // throw: new Audio('audio/throw_bottle.mp3'),
        // bottle: new Audio('audio/bottle.mp3'),
        // hurt: new Audio('audio/character_hurt.mp3'),
        // endboss: new Audio('audio/endboss_hit.mp3')
    };
    }   

    playSound(soundKey) {
        if (this.soundsAreEnabled) {
            const sound = this.sounds[soundKey];
            if (sound) {
                sound.play();
            }
        }
    }
}

