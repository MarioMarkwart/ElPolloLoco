class StatusBarCoins extends StatusBar {
	IMAGES = [
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
	];

	y = 40

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.setAmount(this.amount);
	}
}
