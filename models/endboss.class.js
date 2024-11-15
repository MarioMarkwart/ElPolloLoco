class Endboss extends MovableObject {
	width = 200;
	height = 300;
	x = 570; //2300
	y = 150;
	energy = 100;
	hadFirstContact = false;
	nearToCharacter = false;
	gotHit = false;
	behaviour = "ALERT";

	offset = {
		...this.offset,
		top:40,
	};

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

	/**
	 * Initializes the Endboss object by loading initial images and sounds,
	 * setting the default behavior, and checking for the first contact
	 * with the character. It sets up all necessary resources for the Endboss
	 * to perform animations based on its behavior and interactions.
	 */
	constructor() {
		super().loadImage("assets/img/4_enemie_boss_chicken/1_walk/G1.png");
		this.loadImages(this.IMAGES_WALK);
		this.loadImages(this.IMAGES_ALERT);
		this.loadImages(this.IMAGES_ATTACK);
		this.loadImages(this.IMAGES_HIT);
		this.loadImages(this.IMAGES_DEAD);
		this.setBehaviour();
		this.checkIfFirstContact();
	}


	/**
	 * Sets the Endboss' behavior in an interval of 200ms. Depending on the
	 * current behavior, the Endboss will perform a different animation. The
	 * behavior can be changed by calling the setBehaviour() method.
	 */
	setBehaviour() {
		setInterval(() => {
			if (this.behaviour === "DEAD") {
				this.playAnimation(this.IMAGES_DEAD);
			} else if (this.behaviour === "HIT") {
				this.playAnimation(this.IMAGES_HIT);
			} else if (this.behaviour === "ATTACK") {
				this.playAnimation(this.IMAGES_ATTACK);
			} else if (this.behaviour === "WALK") {
				this.playAnimation(this.IMAGES_WALK);
			} else if (this.behaviour === "ALERT") {
				this.playAnimation(this.IMAGES_ALERT);
			}
		}, 200);
	}


	/**
	 * Checks every 1 second if the Endboss is within 420 pixels of the Character.
	 * If the Endboss is within range, it will log a message to the console and call
	 * the atFirstContact() method to react to the Character's presence.
	 */
	checkIfFirstContact() {
		let firstContactInterval = setInterval(() => {
			if (this.x - world.character.x <= 420) {
				console.log("HELP! ENDBOSS!!!");
				clearInterval(firstContactInterval);
				this.atFirstContact();
			}
		}, 1000);
	}


	/**
	 * Sets the Endboss's behavior to ATTACK and then switches to ALERT after 1.5 seconds.
	 * This method is called after the Endboss first comes into contact with the Character.
	 */
	atFirstContact() {
		this.hadFirstContact = true;
		this.behaviour = "ATTACK";
		setTimeout(() => {
			this.behaviour = "ALERT";
			this.runAfterFirstContact();
		}, 1500);
	}


	/**
	 * Continuously checks if the Endboss is near the Character and updates
	 * the `nearToCharacter` flag. If the Endboss is near, it sets the flag
	 * to true, otherwise to false. Also initiates the Endboss's attack
	 * behavior.
	 */
	runAfterFirstContact() {
		setInterval(() => {
			if (this.checkDistanceToCharacter()) this.nearToCharacter = true;
			else this.nearToCharacter = false;
		}, 100);
		this.attack();
	}


	/**
	 * Checks every 100ms if the Endboss is dead, got hit, near the Character, or
	 * should move. If the Endboss is dead, it sets its behavior to DEAD. If it
	 * was hit, it will set its behavior to HIT. If it is near the Character, it
	 * will set its behavior to ATTACK. If none of these conditions are true, it
	 * will call the endbossMove() method to move the Endboss.
	 */
	attack() {
		setInterval(() => {
			if (!world.isPaused) {
				if (this.isDead()) this.behaviour = "DEAD";
				else if (this.gotHit) this.behaviour = "HIT";
				else if (this.nearToCharacter) this.behaviour = "ATTACK";
				else this.endbossMove();
			}
		}, 100);
	}


	/**
	 * Moves the Endboss in the direction of the Character by 5 pixels each frame.
	 * If the Endboss is to the left of the Character, it moves right, and vice versa.
	 * It also sets the Endboss' behaviour to WALK and updates its direction flag.
	 */

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


	/**
	 * Reduces the Endboss's energy by 10 and updates the endboss's status bar.
	 * If the Endboss is not dead, sets the behaviour to "HIT", plays a random hit sound,
	 * and resets the hit status after a delay. If the Endboss is dead, sets the behaviour to
	 * "DEAD" and triggers the victory condition after a delay.
	 */
	hit() {
		world.statusBarEndboss.setPercentage((this.energy -= 10));
		if (!this.isDead()) {
			this.gotHit = true;
			this.behaviour = "HIT";
			soundBar.playSound('endbossHit');
			setTimeout(() => this.gotHit = false, 1000);
		} else {
			this.behaviour = "DEAD";
			setTimeout(() => youWon(), 500);
		}
		soundBar.stopSound('bottleHit')
	}


	/**
	 * Returns true if the Endboss is within 100 pixels of the Character, and false otherwise.
	 * This is used to determine if the Endboss should move towards the Character or not.
	 */
	checkDistanceToCharacter() {
		return Math.abs(world.character.x - this.x) <= 50;
	}
}
