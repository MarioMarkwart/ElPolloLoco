class DrawableObject {
	height = 250;
	width = 100;
	img;
	imageCache = {};
	currentImage = 0;
	setCurrentImage = false;
	intervalIds = [];
	offset = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	};


	/**
	 * Sets a stoppable interval for executing the given function at the specified time interval.
	 * Stops any previously set intervals before starting the new one and tracks the interval ID.
	 *
	 * @param {Function} fn - The function to be executed at each interval.
	 * @param {number} time - The time interval in milliseconds for executing the function.
	 */
	setStoppableInterval(fn, time) {
		this.stopIntervals();
		let id = setInterval(fn, time)
		this.intervalIds.push(id)
	}


	/**
	 * Stops all intervals set by setStoppableInterval by clearing them and resetting the interval ID array.
	 */
	stopIntervals(){
		this.intervalIds.forEach((intervalId) => {
			clearInterval(intervalId);
		})
		this.intervalIds = [];
	}


	/**
	 * Generates a random integer between the specified minimum and maximum values.
	 *
	 * @param {number} min - The minimum value (inclusive).
	 * @param {number} max - The maximum value (exclusive).
	 * @returns {number} A random integer between min (inclusive) and max (exclusive).
	 */
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}


	/**
	 * Generates a random float between the specified minimum and maximum values.
	 *
	 * @param {number} min - The minimum value (inclusive).
	 * @param {number} max - The maximum value (exclusive).
	 * @returns {number} A random float between min (inclusive) and max (exclusive).
	 */
	getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}


	/**
	 * Randomizes the first picture of the object.
	 *
	 * This function picks a random number between 0 and the total number of images in the object's image cache.
	 * This number is then assigned to the currentImage property of the object, which is used to determine which image
	 * to display.
	 *
	 * Note: This function should be called after all images have been loaded, otherwise it may not work correctly.
	 */
	randomizeFirstPictures() {
		this.currentImage = this.getRandomInt(0, Object.keys(this.imageCache).length);
	}


	/**
	 * Plays an animation from a given array of images.
	 *
	 * This function takes an array of image paths as a parameter and plays the animation by
	 * loading each image in the array in sequence. The animation is played in an infinite loop,
	 * so the last image in the array is followed by the first image, and so on.
	 *
	 * The currentImage property of the object is used to keep track of which image is currently
	 * being displayed.
	 *
	 * @param {Array.<string>} images - An array of paths to the images to be used in the animation.
	 */
	playAnimation(images) {
		let mod = this.currentImage % images.length;
		let path = images[mod];
		this.img = this.imageCache[path];
		this.currentImage++;
	}


	/**
	 * Animates the object with the given array of images.
	 *
	 * @param {Array.<string>} imageArr - An array of paths to the images to be used in the animation.
	 * @param {number} [duration=200] - The duration of the animation in milliseconds.
	 */
	animate(imageArr, duration = 200) {
		this.intervalIds.forEach((intervalId) => {
			clearInterval(intervalId);
		})
		this.intervalIds.push(setInterval(() => {
			this.playAnimation(imageArr);
			}, duration));
	}


	/**
	 * Stops the current animation by clearing all active intervals.
	 *
	 * This function iterates through all interval IDs stored in the intervalIds array,
	 * clears each interval, and effectively halts any ongoing animations. This ensures
	 * that no further animation frames are executed until a new animation is started.
	 */
	stopAnimation(){
		this.intervalIds.forEach((intervalId) => {
			clearInterval(intervalId);
		})
	}


	/**
	 * Loads an image from the given path and assigns it to the object's img property.
	 *
	 * @param {string} path - The path to the image to be loaded.
	 */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * Loads multiple images and caches them for future use.
	 *
	 * This function iterates through an array of image paths, creating new Image objects for each path.
	 * Each image is then cached in the imageCache object using its path as the key. The total number
	 * of images is incremented for every image processed. If the game is not currently running, an
	 * onload event listener is added to each image to update the total number of loaded images and
	 * the percentage of images loaded. It also updates the loading screen image based on the current
	 * loading progress.
	 *
	 * @param {Array.<string>} arr - An array of paths to the images to be loaded.
	 */
	loadImages(arr) {
		arr.forEach((path) => {
			totalImages++
			const img = new Image();
			img.src = path;
			this.imageCache[path] = img;
			if (!gameRunning){
				img.onload = function() {
					totalImagesLoaded++;
					totalImagesLoadedPercent = Math.round(100 * (totalImagesLoaded / totalImages) / 10) * 10;		  
					setLoadingScreenImage();
				}
			}
		});
	}


	/**
	 * Draws the object's image on the given canvas context.
	 *
	 * This function renders the object's current image at its specified
	 * coordinates (x, y) and scales it to the object's width and height.
	 *
	 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context 
	 * where the image should be drawn.
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	//FIXME: DELETE!
	/**
	 * Draws a blue frame around the object on the given canvas context.
	 *
	 * This function renders a blue, 3px wide frame around the object's image
	 * at its specified coordinates (x, y) and scales it to the object's width
	 * and height. This is only done for instances of Character, Chicken, ChickenSmall,
	 * and Endboss.
	 *
	 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
	 * where the frame should be drawn.
	 */
	drawFrame(ctx) {
		// if (
		// 	this instanceof Chicken ||
		// 	this instanceof ChickenSmall ||
		// 	this instanceof Character ||
		// 	this instanceof Endboss ||
		// 	this instanceof Coin ||
		// 	this instanceof Bottle
		// ) {
		// 	ctx.beginPath();
		// 	ctx.lineWidth = 3;
		// 	ctx.strokeStyle = "blue";
		// 	ctx.rect(this.x, this.y, this.width, this.height);
		// 	ctx.stroke();
		// }
		if (
			this instanceof Chicken ||
			this instanceof ChickenSmall ||
			this instanceof Character ||
			this instanceof Endboss ||
			this instanceof Coin ||
			this instanceof Bottle
		) {
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = "green";
			ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.top);
			ctx.stroke();
		}

		// this.x + this.width - this.offsetWidth > mo.x &&
		//   this.y + this.height - this.offsetHeight > mo.y &&
		//   this.x < mo.x + mo.width - mo.offsetWidth &&
		//   this.y < mo.y + mo.height - mo.offsetHeight
	}
}
