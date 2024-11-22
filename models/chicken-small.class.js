class ChickenSmall extends MovableObject {
	CHICKEN_IMAGES_WALKING = [
		"assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
		"assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
		"assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
	];

	IMAGES_DYING = [
		'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
	];
	offset = {
		...this.offset,
		top: 5
	}
	
	static chickenSmallCount = 0;

/**
 * Initializes a new instance of the ChickenSmall class.
 * Loads the initial image, sets the size and random position,
 * loads walking and dying images, loads the small chicken chirp sound,
 * randomizes the first picture, starts playing the chirp sound,
 * initiates the walking animation, and sets up the leftward movement interval.
 */
	constructor() {
		super().loadImage("assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
		ChickenSmall.chickenSmallCount++;
		this.height = 50;
		this.width = 30;
		this.x = this.getRandomInt(200, 2200);
		this.y = this.getRandomInt(370, 380);
		this.loadImages(this.CHICKEN_IMAGES_WALKING);
		this.loadImages(this.IMAGES_DYING);
		this.randomizeFirstPictures();
		this.animate(this.CHICKEN_IMAGES_WALKING, 100);
		this.moveLeftInterval();
		soundBar.playSoundLoop('chickenSmallChirp', 5000, this);
	}
}
