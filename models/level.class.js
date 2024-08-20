class Level {
	enemies;
	clouds;
	backgroundObjects;
	coins;
	bottles;
	level_end_x = 2250;
	endboss;

	constructor(enemies, endboss, coins, bottles, clouds, backgroundObjects) {
		this.enemies = enemies;
		this.coins = coins;
		this.bottles = bottles;
		this.clouds = clouds;
		this.endboss = endboss;
		this.backgroundObjects = backgroundObjects;
	}
}
