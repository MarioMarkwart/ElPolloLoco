class Character extends MovableObject {
	x = 120;
	y = 180;
	lastMovement;
	energy = 100;
	offset = {
		...this.offset,
		left: 40,
		right: 35,
		top: 100,
		bottom: 10
	};

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

	world;


	/**
	 * Constructor of the Character.
	 * Loads all the images and sounds and starts the animation and gravity.
	 */
	constructor() {
		super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.CHARACTER_IMAGES_WALKING);
		this.loadImages(this.CHARACTER_IMAGES_JUMPING);
		this.loadImages(this.CHARACTER_IMAGES_HURT);
		this.loadImages(this.CHARACTER_IMAGES_DEAD);
		this.loadImages(this.CHARACTER_IMAGES_IDLE);
		this.loadImages(this.CHARACTER_IMAGES_LONG_IDLE);
		this.initialAnimation();
		this.characterMovements();
		this.animateCharacter();
		this.applyGravity();
	}


	/**
	 * Plays the sound when the character wins the level and makes the character jump
	 */
	playWinSound() {
		soundBar.playSound('characterWon');
		if(!this.isAboveGround()) this.jump();
	}


	/**
	 * Plays the sound when the character loses a life and makes the character die
	 */
	playLostSound() {
		soundBar.playSound('characterLost');	
	}


	/**
	 * Plays the idle animation of the character until one of the following keys are pressed:
	 * - Right arrow
	 * - Left arrow
	 * - Space bar
	 * - D key
	 * 
	 * The animation is played every 125 milliseconds.
	 */
	initialAnimation() {
		let initialAnimationInterval = setInterval(() => {
			this.playAnimation(this.CHARACTER_IMAGES_IDLE);
			if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D) {	
				clearInterval(initialAnimationInterval);	
			}
		},125);
	}

	/**
	 * This function is called every 60th of a second. It moves the character if the right, left, space or D key is pressed.
	 * If the game is paused, no movement is checked.
	 */
	characterMovements(){
		setInterval(() => {
			if (!world.isPaused) {
				this.checkMovementRight();
				this.checkMovementLeft();
				this.checkJump();
				this.checkThrow();
			}
			this.world.camera_x = -this.x + 100;
		}, 1000 / 60);
	}


	/**
	 * Animates the character based on its state. If the character is dead, it plays the dead animation.
	 * If the character is hurt, it plays the hurt animation. If the character is jumping, it plays the
	 * jump animation. If the character is not in any of these states, it plays the idle, running, or
	 * throwing animation based on the character's movement state.
	 * 
	 * The animation is played every 125 milliseconds. If the game is paused, no animation is played.
	 */
	animateCharacter() {
		setInterval(() => {
			if (!world.isPaused) {
				if (this.isDead()) this.charIsDead();
				else if (this.isHurt()) this.charIsHurt();
				else if (this.isAboveGround()) this.charIsJumping();
				else {
					this.setCharaterAnimationState();
				}
			}
		}, 125);
	}


	/**
	 * Checks if the right arrow key is pressed and the character is within the level's boundary.
	 * 
	 * If the right key is pressed and the character's x position is less than the maximum level x boundary,
	 * the character moves right and plays the walking sound effect.
	 */
	checkMovementRight(){
		if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x_max) {
			this.moveRight();
			soundBar.playSound('characterWalk');
		}
	}


	/**
	 * Checks if the left arrow key is pressed and the character is within the level's boundary.
	 * 
	 * If the left key is pressed and the character's x position is greater than the minimum level x boundary,
	 * the character moves left and plays the walking sound effect.
	 */
	checkMovementLeft(){
		if (this.world.keyboard.LEFT && this.x > -1300) {
			this.moveLeft();
			soundBar.playSound('characterWalk');
		}
	}


	/**
	 * Checks if the space key is pressed and the character is not above the ground.
	 * 
	 * If the space key is pressed and the character is not above the ground, the character jumps
	 * and plays the jump sound effect. The character's current image is also reset to 0.
	 */

	checkJump(){
		if (this.world.keyboard.SPACE && !this.isAboveGround()) {
			this.currentImage = 0;
			this.jump();
			soundBar.playSound('characterJump');
		}
	}


	/**
	 * Called when the character's health reaches 0. Plays the dead animation, stops the walking sound effect,
	 * and calls the youLost() function to end the game.
	 */
	charIsDead(){
		this.playAnimation(this.CHARACTER_IMAGES_DEAD);
		soundBar.stopSound('characterWalk');
		youLost();
	}


	/**
	 * Plays the hurt animation and sound effect when the character is hit by an enemy.
	 * 
	 * The hurt animation is played and the characterHurt sound effect is played.
	 * The character's last movement is also recorded.
	 */
	charIsHurt(){
		this.playAnimation(this.CHARACTER_IMAGES_HURT);
		soundBar.playSound('characterHurt');
		this.lastMovement = Date.now();
	}


	/**
	 * Updates the character's animation and last movement time when jumping.
	 * 
	 * When the character is jumping, this function is called. It updates the character's
	 * last movement time to the current time, and plays the jumping animation.
	 */
	charIsJumping(){
		this.lastMovement = Date.now();
		this.playAnimation(this.CHARACTER_IMAGES_JUMPING);
	}


	/**
	 * Updates the character's last movement time when the throw key (D) is pressed.
	 * 
	 * When the throw key is pressed, this function is called. It updates the character's
	 * last movement time to the current time.
	 */
	checkThrow(){
		if (this.world.keyboard.D) {
			this.lastMovement = Date.now();
		}
	}


	/**
	 * Sets the character's animation state based on the user's input.
	 * 
	 * If the user is pressing the right or left arrow key, the character's animation
	 * is set to walking. If the user is not pressing any movement keys, the character's
	 * animation is set to idle or long idle depending on how long it has been since the
	 * user last pressed a movement key. The characterWalk sound effect is also stopped.
	 */
	setCharaterAnimationState(){
		if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
			this.playAnimation(this.CHARACTER_IMAGES_WALKING);
			this.lastMovement = Date.now();
		}
		else if (this.lastMovement < Date.now() - 2500) {
			this.playAnimation(this.CHARACTER_IMAGES_LONG_IDLE);
		} else if (this.lastMovement < Date.now()) {
			this.playAnimation(this.CHARACTER_IMAGES_IDLE);
		}
		soundBar.stopSound('characterWalk');
	}
}
