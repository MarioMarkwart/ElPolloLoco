class ThrowableObject extends MovableObject {
	throwingAnimationId = null;
	moveToInterval = null;

	IMAGES_BOTTLE_ROTATION = [
		"assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
		"assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
		"assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
		"assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
	];

	IMAGES_BOTTLE_SPLASH = [
		"assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
		"assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
		"assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
		"assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
		"assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
		"assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
	];


	/**
	 * Creates a new ThrowableObject at the given x and y coordinates.
	 * @param {number} x - The x coordinate to create the object at.
	 * @param {number} y - The y coordinate to create the object at.
	 */

	constructor(x, y) {
		super();
		this.loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
		this.loadImages(this.IMAGES_BOTTLE_ROTATION);
		this.loadImages(this.IMAGES_BOTTLE_SPLASH);
		this.x = x;
		this.y = y;
		this.height = 60;
		this.width = 50;
		this.throw(x, y);
	}


	/**
	 * Animates the bottle rotation and makes the bottle move up and to the left or right.
	 * Depending on the character's direction, the bottle will move to the left or to the right.
	 * The bottle will also apply gravity, so it will eventually fall down.
	 */
	throw() {
		this.throwingAnimationId = this.animate(
			this.IMAGES_BOTTLE_ROTATION, 50);
		this.speedY = 10;
		this.applyGravity();
		if (world.character.otherDirection) {
			this.throwToLeft();
		} else
			this.throwToRight();
	}


	/**
	 * Throws the bottle to the left.
	 * 
	 * This function makes the bottle move to the left by decreasing its x position by 10 every 25 milliseconds.
	 * It also checks if the bottle has hit the ground by calling the checkIfBottleHitsTheGround function.
	 */
	throwToLeft(){
		this.moveToInterval = setInterval(() => {
			this.x -= 10;
			this.checkIfBottleHitsTheGround();
		}, 25);
	}

	/**
	 * Throws the bottle to the right.
	 * 
	 * This function makes the bottle move to the right by increasing its x position by 10 every 25 milliseconds.
	 * It also checks if the bottle has hit the ground by calling the checkIfBottleHitsTheGround function.
	 */
	throwToRight(){
		this.moveToInterval = setInterval(() => {
			this.x += 10;
			this.checkIfBottleHitsTheGround();
		}, 25);
	}


	/**
	 * Checks if the bottle has hit the ground.
	 * 
	 * If the bottle has hit the ground, the bottle's speedY is set to 0, the bottleSplash function is called, and the interval
	 * that is moving the bottle is cleared. The bottleSplash function animates the bottle splash and then makes the bottle
	 * invisible. This is done to make it look like the bottle has hit the ground and splashed into the ground.
	 */
	checkIfBottleHitsTheGround() {
		if (this.y > 360) {
			this.speedY = 0;
			this.bottleSplash();
			clearInterval(this.moveToInterval);
			setTimeout(() => world.throwableObjects.splice(world.throwableObjects.indexOf(this), 1), 200); 
		}
	}


	/**
	 * Animates the bottle splash and then makes the bottle invisible.
	 * 
	 * This function is called when the bottle hits the ground. It first clears the interval that is animating the bottle's
	 * throwing animation. Then, it animates the bottle splash by calling the animate function with the bottle splash
	 * images and a delay of 50 milliseconds between each frame. After the animation is complete, the bottle's height and
	 * width are set to 0, effectively making it invisible.
	 */
	bottleSplash() {
		clearInterval(this.throwingAnimationId);
		this.animate(this.IMAGES_BOTTLE_SPLASH, 50);
		setTimeout(() => {
			this.height = 0;
			this.width = 0;
		}, 100);
	}
}
