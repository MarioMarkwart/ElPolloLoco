class Endboss extends MovableObject {
	width = 200;
	height = 300;
	x = 770; //2300
	y = 150;
	energy = 100;
	hadFirstContact = false;
	nearToCharacter = false;
	gotHit = false;
	behaviour = 'ALERT'

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
		this.setBehaviour();
		this.checkIfFirstContact();
	}

	setBehaviour(){
		setInterval(() => {
			if(this.behaviour === 'DEAD'){
				this.playAnimation(this.IMAGES_DEAD);
			} else if(this.behaviour === 'HIT'){
				this.playAnimation(this.IMAGES_HIT);
			} else if(this.behaviour === 'ATTACK'){
				this.playAnimation(this.IMAGES_ATTACK);
			} else if(this.behaviour === 'WALK'){
				this.playAnimation(this.IMAGES_WALK);
			} else if(this.behaviour === 'ALERT'){
				this.playAnimation(this.IMAGES_ALERT);
			}
		},200)
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
		this.behaviour = 'ATTACK';
		setTimeout(() => {
			this.behaviour = 'ALERT';
			this.runAfterFirstContact();
		}, 1500);
	}

	runAfterFirstContact() {
		setInterval(() => {
			if (this.checkDistanceToCharacter()) this.nearToCharacter = true;
			else this.nearToCharacter = false;
		}, 100);
		this.attack();
	}

	attack() {
		console.warn("attack");
		setInterval(() => {
			if (this.checkIfEndbossIsDead()){
				this.behaviour = 'DEAD';
			}
			else if (this.gotHit){
				this.behaviour = 'HIT';
			}
			else if (this.nearToCharacter) {
				this.behaviour = 'ATTACK';

			} else {
				this.endbossMove();
			}
		}, 100);
	}

	endbossMove() {
		this.behaviour = "WALK";
		if (world.character.x > this.x) {
			this.otherDirection = true;
			this.x += 5;
		} else {
			this.otherDirection = false;
			this.x -= 5;
		}
	}

	hit() {
		world.statusBarEndboss.setPercentage((this.energy -= 10));
		if (!this.checkIfEndbossIsDead()) {
			this.gotHit = true
			this.behaviour = 'HIT';
			this.playSound(
				this.SOUNDS_HIT[this.getRandomInt(0, this.SOUNDS_HIT.length)]
			);
			setTimeout(() => {
				this.gotHit = false;
			}, 1000);
		} else {
			this.behaviour = 'DEAD'
			setTimeout(() => { youWon();}, 500);
		}
	}

	checkDistanceToCharacter() {
		return Math.abs(world.character.x - this.x) <= 100;
	}
}
