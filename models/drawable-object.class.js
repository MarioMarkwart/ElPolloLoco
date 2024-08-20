class DrawableObject {
	height = 250;
	width = 100;
	img;
	imageCache = {};
	currentImage = 0;

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	randomizeFirstPictures() {
		this.currentImage = this.getRandomInt(
			0,
			Object.keys(this.imageCache).length
		);
	}

	playAnimation(images) {
		let mod = this.currentImage % images.length;
		let path = images[mod];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	animate(imageArr, duration = 200, count = 0) {
		if (count === 0) {
			let intervalId = setInterval(() => {
				this.playAnimation(imageArr);
			}, duration);
			return intervalId;
		} else {
			for (let i = 0; i < count; i++) {
				this.playAnimation(imageArr);
			}
		}
	}

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	loadImages(arr) {
		arr.forEach((path) => {
			const img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	drawFrame(ctx) {
		if (
			this instanceof Chicken ||
			this instanceof ChickenSmall ||
			this instanceof Character ||
			this instanceof Endboss
		) {
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = "blue";
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	}
}
