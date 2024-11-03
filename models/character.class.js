class Character extends MovableObject {
	x = 120;
	y = 180;
	lastMovement;
	energy = 100;

	CHARACTER_IMAGES_WALKING = [
		'assets/img/2_character_pepe/2_walk/W-21.png',
		'assets/img/2_character_pepe/2_walk/W-22.png',
		'assets/img/2_character_pepe/2_walk/W-23.png',
		'assets/img/2_character_pepe/2_walk/W-24.png',
		'assets/img/2_character_pepe/2_walk/W-25.png',
		'assets/img/2_character_pepe/2_walk/W-26.png',
	];

	CHARACTER_IMAGES_JUMPING = [
		'assets/img/2_character_pepe/3_jump/J-31.png',
		'assets/img/2_character_pepe/3_jump/J-32.png',
		'assets/img/2_character_pepe/3_jump/J-33.png',
		'assets/img/2_character_pepe/3_jump/J-34.png',
		'assets/img/2_character_pepe/3_jump/J-35.png',
		'assets/img/2_character_pepe/3_jump/J-36.png',
		'assets/img/2_character_pepe/3_jump/J-37.png',
		'assets/img/2_character_pepe/3_jump/J-38.png',
		'assets/img/2_character_pepe/3_jump/J-39.png',
	];

	CHARACTER_IMAGES_HURT = [
		'assets/img/2_character_pepe/4_hurt/H-41.png',
		'assets/img/2_character_pepe/4_hurt/H-42.png',
		'assets/img/2_character_pepe/4_hurt/H-43.png',
	];

	CHARACTER_IMAGES_DEAD = [
		'assets/img/2_character_pepe/5_dead/D-51.png',
		'assets/img/2_character_pepe/5_dead/D-52.png',
		'assets/img/2_character_pepe/5_dead/D-53.png',
		'assets/img/2_character_pepe/5_dead/D-54.png',
		'assets/img/2_character_pepe/5_dead/D-55.png',
		'assets/img/2_character_pepe/5_dead/D-56.png',
		'assets/img/2_character_pepe/5_dead/D-57.png',
	];

	CHARACTER_IMAGES_IDLE = [
		'assets/img/2_character_pepe/1_idle/idle/I-1.png',
		'assets/img/2_character_pepe/1_idle/idle/I-2.png',
		'assets/img/2_character_pepe/1_idle/idle/I-3.png',
		'assets/img/2_character_pepe/1_idle/idle/I-4.png',
		'assets/img/2_character_pepe/1_idle/idle/I-5.png',
		'assets/img/2_character_pepe/1_idle/idle/I-6.png',
		'assets/img/2_character_pepe/1_idle/idle/I-7.png',
		'assets/img/2_character_pepe/1_idle/idle/I-8.png',
		'assets/img/2_character_pepe/1_idle/idle/I-9.png',
		'assets/img/2_character_pepe/1_idle/idle/I-10.png'
	]

	CHARACTER_IMAGES_LONG_IDLE = [
		'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
		'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
	]
	
	CHARACTER_WALKING_SOUND = 'assets/audio/character_walk.mp3';

	CHARACTER_JUMPING_SOUNDS = [
		'assets/audio/character_jump_0.mp3',
		'assets/audio/character_jump_1.mp3',
	];

	CHARACTER_WON_SOUND = [
		'assets/audio/character_won.mp3'
	];

	CHARACTER_HURT_SOUNDS = [
		'assets/audio/pepe_hurt_0.mp3',
		'assets/audio/pepe_hurt_1.mp3',
	]

	CHARACTER_DEAD_SOUND = [
		'assets/audio/pepe_dead.mp3'
	]

	CHARACTER_KILLING_ENEMY_SOUNDS = [
		'assets/audio/character_enemy_kill_0.mp3',
		'assets/audio/character_enemy_kill_1.mp3',
	]

	world;
	constructor() {
		super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.CHARACTER_IMAGES_WALKING);
		this.loadImages(this.CHARACTER_IMAGES_JUMPING);
		this.loadImages(this.CHARACTER_IMAGES_HURT);
		this.loadImages(this.CHARACTER_IMAGES_DEAD);
		this.loadImages(this.CHARACTER_IMAGES_IDLE);
		this.loadImages(this.CHARACTER_IMAGES_LONG_IDLE);
		this.loadSound(this.CHARACTER_WALKING_SOUND);
		this.loadSounds(this.CHARACTER_JUMPING_SOUNDS, 0.3);
		this.loadSounds(this.CHARACTER_HURT_SOUNDS, 0.5);
		this.loadSounds(this.CHARACTER_KILLING_ENEMY_SOUNDS, 0.5);
		this.loadSounds(this.CHARACTER_WON_SOUND, 0.5);
		this.loadSounds(this.CHARACTER_DEAD_SOUND, 0.5);
		this.animateCharacter();
		this.applyGravity();
	}

	playWinSound() {
		this.playSound(this.CHARACTER_WON_SOUND, .2);
		this.jump();
	}

	playLostSound() {
		this.playSound(this.CHARACTER_DEAD_SOUND, .2);
	}

	animateCharacter() {
		setInterval(() => {
			if (!world.isPaused) {
				if (
					this.world.keyboard.RIGHT &&
					this.x < this.world.level.level_end_x_max
				) {
					this.moveRight();
					this.playSound(this.CHARACTER_WALKING_SOUND);
				}
				if (this.world.keyboard.LEFT && this.x > -1300) {
					this.moveLeft();
					this.playSound(this.CHARACTER_WALKING_SOUND);
				}
				if (this.world.keyboard.SPACE && !this.isAboveGround()) {
					this.currentImage = 0;
					this.jump();
					this.playRandomSound(this.CHARACTER_JUMPING_SOUNDS);
				}
			}
			this.world.camera_x = -this.x + 100;
		}, 1000 / 60);

		// animations
		setInterval(() => {
			if(!world.isPaused) {
				
				if (this.isDead()) {
					this.playAnimation(this.CHARACTER_IMAGES_DEAD);
					this.stopSound(this.CHARACTER_WALKING_SOUND);
				this.stopAllSounds(this.CHARACTER_HURT_SOUNDS);
				this.stopAllSounds(this.CHARACTER_JUMPING_SOUNDS);
				youLost();
			} else if (this.isHurt()) {
				this.playAnimation(this.CHARACTER_IMAGES_HURT);
				this.playRandomSound(this.CHARACTER_HURT_SOUNDS);
				this.lastMovement = Date.now();
			} else if (this.isAboveGround()) {
				this.lastMovement = Date.now();
				this.playAnimation(this.CHARACTER_IMAGES_JUMPING);
			} else {
				if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
					this.playAnimation(this.CHARACTER_IMAGES_WALKING);
					this.lastMovement = Date.now();
				}
				else if (this.world.keyboard.D) {
					this.lastMovement = Date.now();
				} else {
					if (this.lastMovement < Date.now() - 2500){
						this.playAnimation(this.CHARACTER_IMAGES_LONG_IDLE);
					}
					else if(this.lastMovement < Date.now()){
						this.playAnimation(this.CHARACTER_IMAGES_IDLE);
					}
					this.stopSound(this.CHARACTER_WALKING_SOUND);
				}
			}
		}
		}, 125);
	}
}
