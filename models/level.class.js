class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    level_end_x = 2250;

    constructor(enemies, coins, clouds, backgroundObjects, endboss){
        this.enemies = enemies;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
    }
}