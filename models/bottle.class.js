class Bottle extends MovableObject {
	BOTTLE_IMAGES = [
		"assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
		"assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
	];


	/**
	 * Constructor for Bottle class.
	 * Initializes bottle with random image, x and y coordinates and size.
	 * Loads bottle collect sound and hit sounds.
	 */
	constructor() {
		super();
		this.loadImage(
			this.BOTTLE_IMAGES[this.getRandomInt(0, this.BOTTLE_IMAGES.length)]
		);
		this.loadImages(this.BOTTLE_IMAGES);
		this.x = this.getRandomInt(-1238, 2250);
		this.y = this.getRandomInt(350, 360);
		this.height = 80;
		this.width = 80;
	}


	/**
	 * Collects a bottle, if the status bar bottle amount is less than 5.
	 * Removes the bottle from the level, plays the bottle collect sound and
	 * increases the status bar bottle amount.
	 *
	 * @param {Bottle} bottle - The bottle to be collected.
	 */
	collectBottle(bottle) {
		if (world.statusBarBottles.amount < 5){
			world.level.bottles.splice(world.level.bottles.indexOf(bottle), 1);
			world.soundBar.playSound('bottleCollect');
			world.statusBarBottles.increaseAmount();
		}
	}
}
