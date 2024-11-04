class StatusBarHealth extends StatusBar {
	IMAGES = [
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
	];

	y = 0;


	/**
	 * Constructor for StatusBarHealth.
	 * Calls the superclass constructor and loads the images in the IMAGES array.
	 * Initializes the percentage to 100.
	 */
	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.setPercentage(100);
	}
}
