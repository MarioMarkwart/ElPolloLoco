class Endboss extends MovableObject {
	width = 200;
	height = 300;
	x = 770; //2300
	y = 150;
	energy = 100;
	hadFirstContact = false;
	nearToCharacter = false;
	attackInterval;

	IMAGES_WALK = [
		"assets/img/4_enemie_boss_chicken/1_walk/G1.png",
		"assets/img/4_enemie_boss_chicken/1_walk/G2.png",
		"assets/img/4_enemie_boss_chicken/1_walk/G3.png",
		"assets/img/4_enemie_boss_chicken/1_walk/G4.png",
	];

	IMAGES_ALERT = [
		"assets/img/4_enemie_boss_chicken/2_alert/G5.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G6.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G7.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G8.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G9.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G10.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G11.png",
		"assets/img/4_enemie_boss_chicken/2_alert/G12.png",
	];

	IMAGES_ATTACK = [
		"assets/img/4_enemie_boss_chicken/3_attack/G13.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G14.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G15.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G16.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G17.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G18.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G19.png",
		"assets/img/4_enemie_boss_chicken/3_attack/G20.png",
	];

	IMAGES_HIT = [
		"assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
		"assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
		"assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
	];

	IMAGES_DEAD = [
		"assets/img/4_enemie_boss_chicken/5_dead/G24.png",
		"assets/img/4_enemie_boss_chicken/5_dead/G25.png",
		"assets/img/4_enemie_boss_chicken/5_dead/G26.png",
	];

	SOUNDS_HIT = [
		"assets/audio/bottle_hit.mp3",
		"assets/audio/bottle_hit_2.mp3",
	];

	constructor() {
		super().loadImage("assets/img/4_enemie_boss_chicken/1_walk/G1.png");
		this.loadImages(this.IMAGES_WALK);
		this.loadImages(this.IMAGES_ALERT);
		this.loadImages(this.IMAGES_ATTACK);
		this.loadImages(this.IMAGES_HIT);
		this.loadImages(this.IMAGES_DEAD);
		this.loadSounds(this.SOUNDS_HIT);
		this.animate(this.IMAGES_ALERT);
		this.checkIfFirstContact();
	}

	hit() {
		if (!this.checkIfEndbossIsDead()) {
			world.statusBarEndboss.setPercentage((this.energy -= 10));
			this.animate(this.IMAGES_HIT);
			this.playSound(
				this.SOUNDS_HIT[this.getRandomInt(0, this.SOUNDS_HIT.length)]
			);
			setTimeout(() => {
				this.animate(this.IMAGES_ALERT);
				if (this.hadFirstContact) this.attack();
			}, 1000);
		} else {
			this.animate(this.IMAGES_DEAD);
			setTimeout(() => {
				youWon();
			}, 500);
		}
	}

	checkIfEndbossIsDead() {
		return this.energy <= 0;
	}

	checkIfFirstContact() {
		let firstContactInterval = setInterval(() => {
			if (this.x - world.character.x <= 420) {
				console.log("HELP! ENDBOSS!!!");
				clearInterval(firstContactInterval);
				this.atFirstContact();
			}
		}, 1000);
	}

	atFirstContact() {
		this.hadFirstContact = true;
		this.animate(this.IMAGES_ATTACK);
		setTimeout(() => {
			this.playAnimation(this.IMAGES_ALERT);
			this.runAfterFirstContact();
		}, 2500);
	}

	runAfterFirstContact() {
		setInterval(() => {
			if (this.checkDistanceToCharacter()) this.nearToCharacter = true;
			else this.nearToCharacter = false;
		}, 100);
		this.attack();
	}

	endbossMove() {
		if (world.character.x > this.x) {
			this.otherDirection = true;
			this.x += 5;
		} else {
			this.otherDirection = false;
			this.x -= 5;
		}
		this.playAnimation(this.IMAGES_WALK);
	}

	attack() {
		console.warn("attack");
		this.stopIntervals();

		if (this.nearToCharacter) {
			setTimeout(() => {
				this.playAnimation(this.IMAGES_ATTACK);
			}, 200);
		} else {
			setInterval(() => {
				this.endbossMove();
			}, 75);
		}
	}

	checkDistanceToCharacter() {
		return Math.abs(world.character.x - this.x) <= 100;
	}
}
