class StatusBarCoins extends DrawableObject {
	IMAGES = [
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
	];

	amount = 0;
	x;
	y;

	constructor(x, y) {
		super();
		this.loadImages(this.IMAGES);
		this.x = x;
		this.y = y;
		this.width = 180;
		this.height = 50;
		this.setAmount(this.amount);
	}

	increaseAmount() {
		this.amount++;
		this.setAmount(this.amount);
		if (this.amount == 5) {
			this.decreaseAmount();
			world.statusBarBottles.increaseAmount();
		}
	}
	decreaseAmount() {
		this.amount = 0;
		this.setAmount(this.amount);
	}

	setAmount(amount) {
		this.amount = amount;
		let path = this.IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	resolveImageIndex() {
		if (this.amount == 0) return 0;
		else if (this.amount == 1) return 1;
		else if (this.amount == 2) return 2;
		else if (this.amount == 3) return 3;
		else if (this.amount == 4) return 4;
		else return 5;
	}
}
