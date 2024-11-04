class Chicken extends MovableObject {
	CHICKEN_IMAGES_WALKING = [
		'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
		'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
		'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
	];

	IMAGES_DYING = [
		'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
	];

	SOUNDS_CHICKEN_CHIRP =[
		'assets/audio/chicken_chirp_1.mp3',
		'assets/audio/chicken_chirp_2.mp3',
		'assets/audio/chicken_chirp_3.mp3',
		'assets/audio/chicken_chirp_4.mp3',
		'assets/audio/chicken_chirp_5.mp3',
		'assets/audio/chicken_chirp_6.mp3',
	];


	/**
	 * Constructor for the Chicken class.
	 * Sets the initial position and image for the chicken, loads the walking and dying images, loads the sounds, plays a random sound, randomizes the first picture, animates the chicken's walking, and moves the chicken to the left.
	 */
	constructor() {
		super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
		this.height = 70;
		this.width = 50;
		this.x = this.getRandomInt(200, 2200);
		this.y = this.getRandomInt(350, 360);
		this.loadImages(this.CHICKEN_IMAGES_WALKING);
		this.loadImages(this.IMAGES_DYING);
		this.loadSounds(this.SOUNDS_CHICKEN_CHIRP, 0.1);
		this.playRandomSound(this.SOUNDS_CHICKEN_CHIRP);
		this.playSound(this.chicken_chirp, this.getRandomFloat(200, 5000));
		this.randomizeFirstPictures();
		this.animate(this.CHICKEN_IMAGES_WALKING);
		this.moveLeftInterval();
	}
	

}
