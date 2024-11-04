class Level {
	enemies;
	clouds;
	backgroundObjects;
	coins;
	bottles;
	level_end_x_min = -1438;
	level_end_x_max = 2250;
	endboss;

/**
 * Constructs a new Level instance with the specified elements.
 *
 * @param {Array} enemies - An array of enemy objects in the level.
 * @param {Object} endboss - The endboss object for the level.
 * @param {Array} coins - An array of coin objects in the level.
 * @param {Array} bottles - An array of bottle objects in the level.
 * @param {Array} clouds - An array of cloud objects in the level.
 * @param {Array} backgroundObjects - An array of background objects in the level.
 */
	constructor(enemies, endboss, coins, bottles, clouds, backgroundObjects) {
		this.enemies = enemies;
		this.coins = coins;
		this.bottles = bottles;
		this.clouds = clouds;
		this.endboss = endboss;
		this.backgroundObjects = backgroundObjects;
	}
}
