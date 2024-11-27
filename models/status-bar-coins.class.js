class StatusBarCoins extends StatusBar {
	IMAGES = [
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
		"assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
	];

	y = 40;

	/**
	 * Constructor for StatusBarCoins.
	 * Calls the superclass constructor, loads the images for the status bar,
	 * and sets the amount of the status bar to the current amount.
	 */
	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.setAmount(this.amount);
	}
}
