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


	/**
	 * Initializes a new World object.
	 * 
	 * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
	 * @param {Keyboard} keyboard - The Keyboard object to handle user input.
	 */
	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.initialRun();
	}


	/**
	 * Sets the world property of the character to this World object.
	 */
	setWorld() {
		this.character.world = this;
	}


	/**
	 * Initializes the game with the necessary intervals for checking collisions, checking and removing
	 * throw objects, removing objects when they are out of the world, creating new clouds, bottles and coins.
	 * This method is called once at the beginning of the game.
	 */
	initialRun() {
		this.adjustClouds();
		setInterval(() => this.checkCollisions(), 100);
		setInterval(() => this.checkThrowObjects(), 100);
		setInterval(() => this.removeObjWhenOutOfWorld(), 1000);
		setInterval(() => this.createNewClouds(), 5000);
		setInterval(() => this.createNewBottles(), 2000);
		setInterval(() => this.createNewCoins(), 2000);
	}


    /**
     * Checks for collisions between the character and various objects in the game world,
     * including enemies, coins, bottles, and the endboss. If a collision is detected, 
     * appropriate actions are taken such as damaging the character, collecting items, 
     * or defeating enemies. The function is only executed when the game is not paused.
     */
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
					soundBar.playSound('characterKill');
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

			this.throwableObjects.forEach((to) => {
				let endboss = this.level.endboss[0];
				if (endboss.isColliding(to)) {
					endboss.hit();
					this.throwableObjects[this.throwableObjects.indexOf(to)].bottleSplash();
					setTimeout(() => {
						this.throwableObjects.splice(this.throwableObjects.indexOf(to),1);
					}, 100);
				}
			});
		}
	}


	/**
	 * Checks if the player is pressing the throw key (D) and if the player has
	 * bottles to throw. If both conditions are true, a new bottle is created and
	 * added to the world's array of throwable objects. The bottle's position is
	 * set to the player's position with an offset of 50 pixels to the right and
	 * 100 pixels down. The player's amount of bottles is then decreased by 1.
	 */
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


	/**
	 * Adjusts the clouds in the world to make them appear smaller and thus
	 * creating a parallax effect with the background.
	 * 
	 * @param {number} i - The index of the cloud in the array.
	 */
	adjustClouds() {
		for (let i = 0; i < this.level.clouds.length; i++)
			this.level.clouds[i].makeBackgroundCloudSmaller(i);
	}


	/**
	 * Draws the world to the canvas.
	 * 
	 * This function is responsible for drawing all objects in the world to the
	 * canvas. It first clears the canvas, then translates the canvas to the
	 * position of the camera. After that, it adds all objects to the map by
	 * looping over the arrays of objects and calling the draw method of each
	 * object. The objects are then translated back to their original position.
	 * Finally, it requests the next frame to be drawn.
	 * 
	 * @returns {void}
	 */
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


	/**
	 * Adds all objects in the given array to the map.
	 * 
	 * This function loops over the given array of objects and calls the
	 * addToMap method for each object.
	 * 
	 * @param {Array.<MovableObject>} objects - The array of objects to be added
	 * to the map.
	 * @returns {void}
	 */
	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}


	/**
	 * Stops the game by pausing the animation and setting the gameRunning
	 * variable to false.
	 *
	 * @returns {void}
	 */
	pause() {
		this.isPaused = true;
		gameRunning = false;
		cancelAnimationFrame(this.animationFrameId);
	}


	/**
	 * Resumes the game by continuing the animation and setting the gameRunning
	 * variable to true.
	 *
	 * @returns {void}
	 */
	resume() {
		gameRunning = true;
		this.isPaused = false;
		this.animationFrameId = requestAnimationFrame(() => this.draw());
		changeButtons()
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
		// mo.drawFrame(this.ctx);

		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}


	/**
	 * Flips the given MovableObject horizontally.
	 *
	 * This function changes the canvas context so that any subsequent drawing
	 * operations will be mirrored horizontally. The object's x position is also
	 * negated so that the object appears to be flipped.
	 *
	 * The original canvas state is saved before the transformation is applied and
	 * restored after the transformation is reversed.
	 *
	 * @param {MovableObject} mo - The object to be flipped.
	 */
	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}


	/**
	 * Reverses the effect of flipImage by negating the x position of the MovableObject
	 * again and restoring the original canvas state.
	 *
	 * @param {MovableObject} mo - The object to be flipped back.
	 */
	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}


	/**
	 * Creates new clouds and adds them to the world level if the current number of clouds is less than 5.
	 *
	 * This function checks the number of clouds currently in the world level and, if there are fewer than 5,
	 * it creates a new Cloud instance. The new cloud is positioned off-screen to the right and then added to the
	 * list of clouds in the world level.
	 */
	createNewClouds() {
		if (world.level.clouds.length < 5) {
			let newCloud = new Cloud();
			newCloud.x = 2250 + newCloud.width;
			world.level.clouds.push(newCloud);
		}
	}


	/**
	 * Creates new bottles and adds them to the world level if the current number of bottles is less than 5
	 * and there are fewer than 10 bottles in total.
	 *
	 * This function checks the number of bottles currently in the world level and, if there are fewer than 5
	 * and fewer than 10 in total, it creates a new Bottle instance. The new bottle is then added to the list
	 * of bottles in the world level.
	 */
	createNewBottles() {
		if (
			world.level.bottles.length < 5 &&
			world.level.bottles.length <= 10
		) {
			world.level.bottles.push(new Bottle());
		}
	}


	/**
	 * Creates new coins and adds them to the world level if the current number of coins is less than 5
	 * and there are fewer than 10 coins in total.
	 *
	 * This function checks the number of coins currently in the world level and, if there are fewer than 5
	 * and fewer than 10 in total, it creates a new Coin instance. The new coin is then added to the list
	 * of coins in the world level.
	 */
	createNewCoins() {
		if (world.level.coins.length < 5 && world.level.coins.length <= 10) {
			world.level.coins.push(new Coin());
		}
	}


	/**
	 * Checks if an object is out of the world bounds.
	 *
	 * This function determines whether the given object's rightmost edge has passed
	 * the minimum x-coordinate of the world, indicating that it is out of the world.
	 *
	 * @param {Object} obj - The object to check.
	 * @returns {boolean} - True if the object is out of the world bounds, false otherwise.
	 */
	checkIsOutOfWorld(obj) {
		return obj.x + obj.width < -1438;
	}


	/**
	 * Removes objects from the world that are out of bounds.
	 *
	 * This function iterates over clouds and enemies in the world level.
	 * For each object, it checks if the object is out of the world bounds
	 * using the checkIsOutOfWorld function. If an object is determined to
	 * be out of bounds, it is removed from the corresponding array in
	 * the world level.
	 */
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