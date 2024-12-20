let level1;

/**
 * Initializes the level1 object with the specified elements.
 *
 * @param {Array} enemies - An array of enemy objects in the level.
 * @param {Object} endboss - The endboss object for the level.
 * @param {Array} coins - An array of coin objects in the level.
 * @param {Array} bottles - An array of bottle objects in the level.
 * @param {Array} clouds - An array of cloud objects in the level.
 * @param {Array} backgroundObjects - An array of background objects in the level.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new ChickenSmall(),
            new Chicken(),
            new ChickenSmall(),
            new Chicken(),
            new ChickenSmall(),
            new Chicken(),
            new ChickenSmall(),
        ],
        [
            new Endboss()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],
        [
            new BackgroundObject('assets/img/5_background/layers/air.png',-1438),
            new BackgroundObject('assets/img/5_background/layers/air.png',-719),
            new BackgroundObject('assets/img/5_background/layers/air.png'),
            new BackgroundObject('assets/img/5_background/layers/air.png',719),
            new BackgroundObject('assets/img/5_background/layers/air.png',1438),
            new BackgroundObject('assets/img/5_background/layers/air.png',2157),

            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png',-1438),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png',-719),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png'),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png',719),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png',1438),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png',2157),

            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png',-1438),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png',-719),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png'),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png',719),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png',1438),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png',2157),

            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', -1438),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png'),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 1438),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 2157),
        ],
    );
}