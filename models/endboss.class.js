class Endboss extends MovableObject {
	width = 200;
	height = 300;
	x = 2300; //2300
	y = 150;
	health = 100;

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

	SOUNDS_HIT = [
		"assets/audio/bottle_hit.mp3",
		"assets/audio/bottle_hit_2.mp3",
	];

	constructor() {
		super().loadImage("assets/img/4_enemie_boss_chicken/1_walk/G1.png");
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_HIT);
		this.loadSounds(this.SOUNDS_HIT);
		this.animate(this.IMAGES_WALKING);
	}


	hit() {
		this.playSound(
			this.SOUNDS_HIT[this.getRandomInt(0, this.SOUNDS_HIT.length)]
		);
		this.animate(this.IMAGES_HIT);

		setTimeout(() => {
			this.animate((this.IMAGES_WALKING));
		}, 1000);

		world.statusBarEndboss.setPercentage((this.health -= 5));
		console.log(this.health);
	}

	checkIfEndbossIsDead() {
		if (this.health <= 0) {
			world.statusBarEndboss.setPercentage(0);
			this.die();
		}
	}
}
