class StatusBarBottles extends StatusBar {
	IMAGES = [
		"assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
		"assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
		"assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
		"assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
		"assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
		"assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
	];

	y = 80;

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		// this.setAmount(this.amount);

		godmode ? this.setAmount(1000) : this.setAmount(0)
	}
}
