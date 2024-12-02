class MovableObject extends DrawableObject {
	speed = 0.15;
	otherDirection = false;
	speedY = 0;
	acceleration = 0.5;
	energy = 100;
	lastHit = 0;
	soundLoopId = 0;;
	isFalling = false;
	amount = 0;


	/**
	 * Applies gravity to the object.
	 * 
	 * This function is called automatically upon the object's creation. It makes the object fall
	 * down by subtracting its speedY from its y position. The object's speedY is itself decreased
	 * by the acceleration every frame. This will make the object fall down until it hits the ground
	 * (where y = 180). The object's isFalling property is set to true while it is falling and set
	 * to false when it is not.
	 */
	applyGravity() {
		setInterval(() => {
			if ((this.isAboveGround() || this.speedY > 0) && !world.isPaused) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
				if(this.speedY < 0) this.isFalling = true;
			}else{
				this.isFalling = false;
			}
		}, 1000 / 60);
	}


	/**
	 * Checks if the object is above the ground.
	 * 
	 * If the object is of type ThrowableObject, the function returns true, because those objects
	 * are always above the ground. Otherwise, the function returns true if the object's y position
	 * is less than the given height and false otherwise. The default height is 180.
	 * 
	 * @param {number} [height=180] - The height to check against.
	 * @returns {boolean} - True if the object is above the ground, false otherwise.
	 */
	isAboveGround(height = 180) {
		if (this instanceof ThrowableObject) return true;
		return this.y < height;
	}


	/**
	 * Moves the object to the left by a random amount between this.speed and 0.5 every frame.
	 * The object's position is only updated if the world is not paused.
	 * The interval is set to 1000/60 milliseconds, which is 60 frames per second.
	 */
	moveLeftInterval(){
        let pixelMovement = Math.random() * (.5 - this.speed) + this.speed;
        setInterval(() => {
			if(!world.isPaused){
				this.x -= pixelMovement;
			}
        }, 1000/60); 
    }


	/**
	 * Moves the object to the left by 50 times its speed.
	 * The object's direction is changed to left.
	 */
	moveLeft() {
		this.x -= this.speed * 50;
		this.otherDirection = true;
	}


	/**
	 * Moves the object to the right by 50 times its speed.
	 * The object's direction is changed to right.
	 */
	moveRight() {
		this.x += this.speed * 50;
		this.otherDirection = false;
	}


	/**
	 * Changes the object's vertical speed to the given height, causing it to jump.
	 * If no height is given, the object will jump 12 pixels.
	 * @param {number} [height=12] - The height of the jump in pixels.
	 */
	jump(height = 12) {
		this.speedY = height;
	}


	/**
	 * Checks if this object is colliding with another movable object.
	 *
	 * @param {Object} mo - The other movable object to check collision against.
	 * @returns {boolean} True if this object is colliding with the other object, false otherwise.
	 */
	isColliding(mo) {
		return (
			this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
			this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
			this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
			this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
		);
	  }


	/**
	 * Reduces the object's energy by 10.
	 * 
	 * Only does something if the object's energy is greater than 0 and if at least 1 second
	 * has passed since the last hit. The object's lastHit property is set to the current time
	 * and the object's energy is reduced by 10.
	 */
	hit(reduceEnergyAmount) {
		if (this.energy > 0 && this.lastHit < new Date().getTime() - 1000) {
			this.lastHit = new Date().getTime();
			this.energy -= reduceEnergyAmount;
		}
	}


	/**
	 * Checks if the object is currently hurt.
	 *
	 * The object is considered hurt if it has been hit in the last second.
	 *
	 * @returns {boolean} True if the object is hurt, false otherwise.
	 */
	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit;
		return timePassed < 1000;
	}


	/**
	 * Checks if the object is dead.
	 *
	 * The object is considered dead if its energy is 0 or less.
	 *
	 * @returns {boolean} True if the object is dead, false otherwise.
	 */
	isDead() {
		return this.energy <= 0;
	}


	/**
	 * Handles the death of an enemy object.
	 * 
	 * This function stops the enemy's animation, stops all sounds associated with the enemy,
	 * and initiates the dying animation. After a delay, it removes the enemy from the world's
	 * list of enemies.
	 *
	 * @param {Object} enemy - The enemy object that is dying, which contains sound cache and images.
	 */
	enemyDie(enemy) {
		this.stopAnimation();
		this.animate(enemy.IMAGES_DYING);
		clearInterval(enemy.soundLoopId);
		setTimeout(() => {
			world.level.enemies.splice(world.level.enemies.indexOf(this), 1);
		},300)
	}
}