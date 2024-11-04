class Cloud extends MovableObject {
	width = 700;
	height = 300;
	y = 0;

	IMAGES_CLOUD = [
		"assets/img/5_background/layers/4_clouds/1.png",
		"assets/img/5_background/layers/4_clouds/2.png",
		"assets/img/5_background/layers/4_clouds/full.png",
	];


	/**
	 * Initializes a new Cloud instance by loading a random cloud image,
	 * setting a random initial x-coordinate, and starting the cloud animation.
	 * The cloud's width is added to the maximum x-value to ensure it starts
	 * off-screen and moves into view.
	 */
	constructor() {
		super().loadImage(this.IMAGES_CLOUD[this.getRandomInt(0, 3)]);
		this.x = this.getRandomInt(0, 2250 + this.width);
		this.animateCloud();

	}


	/**
	 * Animates the cloud by moving it to the left using a set interval.
	 * This function leverages the moveLeftInterval method to continuously
	 * update the cloud's position on the x-axis.
	 */
	animateCloud() {
		this.moveLeftInterval()
	}


	/**
	 * Makes the cloud object smaller by scaling down its width and height
	 * by a random factor between 0.5 and 1. Additionally, if the scaling
	 * factor is less than or equal to 0.7, the cloud's y-coordinate is
	 * increased by 10 pixels.
	 */
	makeBackgroundCloudSmaller() {
		let times = this.getRandomFloat(0.5, 1);
		this.width = this.width * times
		this.height = this.height * times
		if (times <= 0.7) {this.y = this.y + 10;}
	}
}