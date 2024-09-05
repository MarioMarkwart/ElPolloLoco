class MovableObject extends DrawableObject {
	speed = 0.15;
	otherDirection = false;
	speedY = 0;
	acceleration = 0.5;
	energy = 100;
	lastHit = 0;
	soundCache = {};
	isFalling = false;

	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
				if(this.speedY < 0) this.isFalling = true;
			}else{
				this.isFalling = false;
			}
		}, 1000 / 60);
	}

	isAboveGround() {
		if (this instanceof ThrowableObject) return true;
		return this.y < 180;
	}

	moveLeftInterval() {
		let pixelMovement = Math.random() * (1 - this.speed) + this.speed;
		this.intervalIds.push(setInterval(() => {
			this.x -= pixelMovement;
		}, 1000 / 60));
	}

	moveLeft() {
		this.x -= this.speed * 50;
		this.otherDirection = true;
	}

	moveRight() {
		this.x += this.speed * 50;
		this.otherDirection = false;
	}

	jump(height) {
		this.speedY = height;
	}

	isColliding(mo) {
		return (
			this.x + this.width > mo.x &&
			this.y + this.height > mo.y &&
			this.x < mo.x &&
			this.y < mo.y + mo.height
		);
	}

	hit() {
		if (this.energy > 0) {
			this.lastHit = new Date().getTime();
			this.energy -= 5;
		}
	}

	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit;
		return timePassed < 500;
	}

	isDead() {
		return this.energy == 0;
	}

	loadSound(path, vol = 1) {
		const sound = new Audio();
		sound.src = path;
		this.soundCache[path] = sound;

		this.setSoundVolume(path, vol);
	}

	loadSounds(arr, vol = 1) {
		arr.forEach((path) => {
			const sound = new Audio();
			sound.src = path;
			this.soundCache[path] = sound;
			this.setSoundVolume(path, vol);
		});
	}

	setSoundVolume(path, vol) {
		this.soundCache[path].volume = vol;
	}

	playSound(path, delay = 0) {
		this.soundCache[path].play();

		// setTimeout(() => {
		//     this.soundCache[path].play();
		// }, delay) //FIXME: set to 'delay' when inserted Title-Screen - will work after user interacted with the page
	}

	stopSound(path) {
		this.soundCache[path].pause();
	}

	checkIsOutOfWorld(){
		return this.x + this.width < -1438;
	}

	removeObjWhenOutOfWorld(){
		if (this.checkIsOutOfWorld()) {
			if (this instanceof Cloud) world.level.clouds.splice(world.level.clouds.indexOf(this), 1);
			else if (this instanceof Chicken || this instanceof ChickenSmall) world.level.enemies.splice(world.level.enemies.indexOf(this), 1);
		}
	}
}
