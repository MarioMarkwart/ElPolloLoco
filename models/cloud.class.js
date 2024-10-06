class Cloud extends MovableObject {
	width = 700;
	height = 300;
	y = 0;

	IMAGES_CLOUD = [
		"assets/img/5_background/layers/4_clouds/1.png",
		"assets/img/5_background/layers/4_clouds/2.png",
		"assets/img/5_background/layers/4_clouds/full.png",
	];
	static speeds = [];

	constructor() {
		super().loadImage(this.IMAGES_CLOUD[this.getRandomInt(0, 3)]);
		this.x = this.getRandomInt(0, 2250 + this.width);
		this.animateCloud();

		setInterval(() => {
			this.removeObjWhenOutOfWorld();
		}),200;
	}

	animateCloud() {
		this.moveLeftInterval()
	}

	makeBackgroundCloudSmaller() {
		let times = this.getRandomFloat(0.5, 1);
		this.width = this.width * times
		this.height = this.height * times
		if (times <= 0.7) {this.y = this.y + 10; console.log('times <= 0,7', times <= 0.7);}
	}
}