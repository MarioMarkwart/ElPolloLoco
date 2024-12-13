class StatusBarHealth extends StatusBar {
	IMAGES = [
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/5.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/10.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/15.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/25.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/30.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/35.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/45.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/50.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/55.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/65.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/70.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/75.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/85.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/90.png",
		"assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/95.png",
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
