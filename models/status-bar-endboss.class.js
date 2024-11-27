class StatusBarEndboss extends StatusBar {
	IMAGES = [
		"assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
		"assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
		"assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
		"assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
		"assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
		"assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
	];

	x = 480;
	y = 0;
	width = 200;
	height = 60


	/**
	 * Constructor for StatusBarEndboss class.
	 * 
	 * Loads all required images for the endboss status bar and sets the initial
	 * percentage to 100.
	 */
	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.setPercentage(100);
	}
}
