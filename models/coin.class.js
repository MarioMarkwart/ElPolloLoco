class Coin extends MovableObject {
	COINS_IMAGES = [
		"assets/img/8_coin/coin_1.png",
		"assets/img/8_coin/coin_2.png",
	];

	COIN_SOUND = "assets/audio/coin.mp3";

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
		this.loadSound(this.COIN_SOUND);
	}

	animate(imageArr, duration = 200) {
		setInterval(() => {
			this.playAnimation(imageArr);
		}, duration);
	}

	collectCoin(coin) {
		if (world.statusBarBottles.amount < 5){
			world.level.coins.splice(world.level.coins.indexOf(coin), 1);
			world.statusBarCoins.increaseAmount();
			this.playSound(this.COIN_SOUND);
		}
	}
}
