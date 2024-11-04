class World {
	character = new Character();
	statusBarHealth = new StatusBarHealth();
	statusBarCoins = new StatusBarCoins();
	statusBarBottles = new StatusBarBottles();
	statusBarEndboss = new StatusBarEndboss();
	throwableObjects = [];
	level = level1;
	canvas;
	ctx;
	keyboard;
	camera_x = -100;
	isPaused = false;
	animationFrameId;

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.run();
	}

	setWorld() {
		this.character.world = this;
	}

	run() {
		this.adjustClouds();
		setInterval(() => this.checkCollisions(), 200);
		setInterval(() => this.checkThrowObjects(), 100);
		setInterval(() => this.removeObjWhenOutOfWorld(), 1000);
		setInterval(() => this.createNewClouds(), 5000);
		setInterval(() => this.createNewBottles(), 2000);
		setInterval(() => this.createNewCoins(), 2000);
	}

	checkCollisions() {
		if (!this.isPaused) {
		this.level.endboss.forEach((endboss) => {
			if (
				this.character.isColliding(endboss) &&
				!this.character.isAboveGround(100) &&
				!godmode
			) {
				this.character.hit();
				this.statusBarHealth.setPercentage(this.character.energy);
			}
		});
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy) && this.character.isFalling) {
				enemy.enemyDie(enemy);
				this.character.playRandomSound(this.character.CHARACTER_KILLING_ENEMY_SOUNDS);
				this.character.jump();
			} else if (this.character.isColliding(enemy) && !godmode) {
				this.character.hit();
				this.statusBarHealth.setPercentage(this.character.energy);
			}
		});
		this.level.coins.forEach((coin) => {
			if (this.character.isColliding(coin)) {
				coin.collectCoin(coin);
			}
		});
		this.level.bottles.forEach((bottle) => {
			if (this.character.isColliding(bottle)) {
				bottle.collectBottle(bottle);
			}
		});

		this.throwableObjects.forEach((bottle) => {
			let endboss = this.level.endboss[0];
			if (endboss.isColliding(bottle)) {
				endboss.hit();
				this.throwableObjects[
					this.throwableObjects.indexOf(bottle)
				].bottleSplash();
				setTimeout(() => {
					this.throwableObjects.splice(
						this.throwableObjects.indexOf(bottle),
						1
					);
				}, 100);
			}
		});
	}
}

	checkThrowObjects() {
		if (this.keyboard.D) {
			if (world.statusBarBottles.amount > 0) {
				let bottle = new ThrowableObject(
					this.character.x + 50,
					this.character.y + 100
				);
				this.throwableObjects.push(bottle);
				world.statusBarBottles.decreaseAmount();
			}
		}
	}

	adjustClouds() {
		for (let i = 0; i < this.level.clouds.length; i++)
			this.level.clouds[i].makeBackgroundCloudSmaller(i);
	}
	draw() {
		if (!this.isPaused) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.translate(this.camera_x, 0);
			this.addObjectsToMap(this.level.backgroundObjects);
			this.addObjectsToMap(this.level.enemies);
			this.addObjectsToMap(this.level.endboss);
			this.addObjectsToMap(this.level.clouds);
			this.addObjectsToMap(this.throwableObjects);
			this.addObjectsToMap(this.level.coins);
			this.addObjectsToMap(this.level.bottles);
			this.ctx.translate(-this.camera_x, 0);
			this.addToMap(this.statusBarHealth);
			this.addToMap(this.statusBarCoins);
			this.addToMap(this.statusBarBottles);
			this.addToMap(this.statusBarEndboss);
			this.ctx.translate(this.camera_x, 0);

			this.addToMap(this.character);
			this.ctx.translate(-this.camera_x, 0);

			this.animationFrameId = requestAnimationFrame(() => this.draw());
		}
	}

	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	pause() {
		//TODO: stop all intervals

		this.isPaused = true;
		gameRunning = false;
		cancelAnimationFrame(this.animationFrameId);
	}

	// Function to resume the animation
	resume() {
		gameRunning = true;
		this.isPaused = false;
		this.animationFrameId = requestAnimationFrame(() => this.draw());
	}

	/**
	 * Adds an object or an array of objects to the map. If the object is an array,
	 * it recursively calls itself for each object in the array. If the object is not
	 * an array, it draws the object's image on the canvas using the provided context.
	 *
	 * @param {Object|Array} obj - The object or array of objects to be added to the map.
	 */
	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}

		mo.draw(this.ctx);
		mo.drawFrame(this.ctx);

		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}

	createNewClouds() {
		if (world.level.clouds.length < 5) {
			let newCloud = new Cloud();
			newCloud.x = 2250 + newCloud.width;
			world.level.clouds.push(newCloud);
		}
	}

	createNewBottles() {
		if (
			world.level.bottles.length < 5 &&
			world.level.bottles.length <= 10
		) {
			world.level.bottles.push(new Bottle());
		}
	}

	createNewCoins() {
		if (world.level.coins.length < 5 && world.level.coins.length <= 10) {
			world.level.coins.push(new Coin());
		}
	}

	checkIsOutOfWorld(obj) {
		return obj.x + obj.width < -1438;
	}

	removeObjWhenOutOfWorld() {
		world.level.clouds.forEach((cloud) => {
			if (this.checkIsOutOfWorld(cloud)) {
				world.level.clouds.splice(world.level.clouds.indexOf(cloud), 1);
			}
		});

		world.level.enemies.forEach((enemy) => {
			if (this.checkIsOutOfWorld(enemy)) {
				world.level.enemies.splice(
					world.level.enemies.indexOf(enemy),
					1
				);
			}
		});
	}
}

window.addEventListener("keydown", (event) => {
	if (!world.isPaused) {
		if (event.key === "ArrowLeft") keyboard.LEFT = true;
		if (event.key === "ArrowRight") keyboard.RIGHT = true;
		if (event.key === "d") keyboard.D = true;
		if (event.key === " ") keyboard.SPACE = true;
	}
});

window.addEventListener("keyup", (event) => {
	if (!world.isPaused) {
		if (event.key === "ArrowLeft") keyboard.LEFT = false;
		if (event.key === "ArrowRight") keyboard.RIGHT = false;
		if (event.key === "d") keyboard.D = false;
		if (event.key === " ") keyboard.SPACE = false;
	}
});

window.addEventListener("touchstart", (event) => {
	if (!world.isPaused) {
		if (event.target.id === "btnLeft") keyboard.LEFT = true;
		if (event.target.id === "btnRight") keyboard.RIGHT = true;
		if (event.target.id === "btnJump") keyboard.SPACE = true;
		if (event.target.id === "btnThrow") keyboard.D = true;
	}
});

window.addEventListener("touchend", (event) => {
	if (!world.isPaused) {
		if (event.target.id === "btnLeft") keyboard.LEFT = false;
		if (event.target.id === "btnRight") keyboard.RIGHT = false;
		if (event.target.id === "btnJump") keyboard.SPACE = false;
		if (event.target.id === "btnThrow") keyboard.D = false;
	}
});

window.addEventListener("touchcancel", (event) => {
	if (!world.isPaused) {
		if (event.target.id === "btnLeft") keyboard.LEFT = false;
		if (event.target.id === "btnRight") keyboard.RIGHT = false;
		if (event.target.id === "btnJump") keyboard.SPACE = false;
		if (event.target.id === "btnThrow") keyboard.D = false;
	}
});