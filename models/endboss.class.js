class Endboss extends MovableObject {
	width = 200;
	height = 300;
	x = 2300; //2300
	y = 150;
	energy = 100;

	IMAGES_WALKING = [
		"assets/img/4_enemie_boss_chicken/2_alert/G5.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G6.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G7.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G8.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G9.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G10.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G11.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G12.png",
	];

	IMAGES_HIT = [
		"assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
		"assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
		"assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
	];

	IMAGES_DEAD = [
		"assets/img/4_enemie_boss_chicken/5_dead/G24.png",
		"assets/img/4_enemie_boss_chicken/5_dead/G25.png",
		"assets/img/4_enemie_boss_chicken/5_dead/G26.png"
	]

	SOUNDS_HIT = [
		"assets/audio/bottle_hit.mp3",
		"assets/audio/bottle_hit_2.mp3",
	];

	constructor() {
		super().loadImage("assets/img/4_enemie_boss_chicken/1_walk/G1.png");
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_HIT);
		this.loadImages(this.IMAGES_DEAD);
		this.loadSounds(this.SOUNDS_HIT);
		this.animate(this.IMAGES_WALKING);
	}


	hit() {
		world.statusBarEndboss.setPercentage((this.energy -= 5));
		this.playSound(
			this.SOUNDS_HIT[this.getRandomInt(0, this.SOUNDS_HIT.length)]
		);
		this.animate(this.IMAGES_HIT);

		if (this.checkIfEndbossIsDead()){
			this.animate(this.IMAGES_DEAD);
			setTimeout(() => {
				youWon();
			},1000)
		}else{
			console.log('endboss is not dead');
			setTimeout(() => {
			this.animate((this.IMAGES_WALKING));
		}, 1000);
		}
	}
 
	checkIfEndbossIsDead() {
		return this.energy <= 0;
	}

}
