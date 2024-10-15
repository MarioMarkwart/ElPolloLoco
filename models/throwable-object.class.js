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

	throwToLeft(){
		this.moveToInterval = setInterval(() => {
			this.x -= 10;
			this.checkIfBottleHitsTheGround();
		}, 25);
	}

	throwToRight(){
		this.moveToInterval = setInterval(() => {
			this.x += 10;
			this.checkIfBottleHitsTheGround();
		}, 25);
	}
	
	checkIfBottleHitsTheGround() {
		if (this.y > 360) {
			this.speedY = 0;
			this.bottleSplash();
			clearInterval(this.moveToInterval);
		}
	}

	bottleSplash() {
		clearInterval(this.throwingAnimationId);
		this.animate(this.IMAGES_BOTTLE_SPLASH, 50);
		setTimeout(() => {
			this.height = 0;
			this.width = 0;
		}, 100);
	}
}
