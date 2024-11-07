class Coin extends MovableObject {
	COINS_IMAGES = [
		"assets/img/8_coin/coin_1.png",
		"assets/img/8_coin/coin_2.png",
	];


	/**
	 * Initializes a new instance of the Coin class.
	 * Loads the initial image and animation images, sets random position and size,
	 * randomizes the first picture, starts the animation, and loads the coin sound.
	 */
	constructor() {
		super();
		this.loadImage("assets/img/8_coin/coin_1.png");
		this.loadImages(this.COINS_IMAGES);
		this.x = this.getRandomInt(-1238, 2250);
		this.y = this.getRandomInt(100, 200);
		this.width = 70;
		this.height = 70;
		this.randomizeFirstPictures();
		this.animate(this.COINS_IMAGES, this.getRandomInt(200, 300));
	}


	/**
	 * Collects a coin if the status bar bottle amount is less than 5.
	 * Removes the coin from the world level, increases the status bar coin amount,
	 * and plays the coin collection sound.
	 *
	 * @param {Coin} coin - The coin to be collected.
	 */
	collectCoin(coin) {
		if (world.statusBarBottles.amount < 5){
			world.level.coins.splice(world.level.coins.indexOf(coin), 1);
			world.statusBarCoins.increaseAmount();
			world.soundBar.playSound('coinCollect')
		}
	}
}
