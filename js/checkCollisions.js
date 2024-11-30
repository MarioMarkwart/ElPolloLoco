/**
 * Checks for collisions between the character and various game objects
 * including the endboss, enemies, coins, bottles, and flying bottles.
 * world method only executes if the game is not paused and the character
 * is not invincible.
 */
function checkCollisions() {
    if (!world.isPaused && !world.character.invincible) {
        checkCollisionWithEndboss();
        checkCollisionWithEnemies();
        checkCollisionWithCoin();
        checkCollisionWithBottle();
        checkCollisionWithFlyingBottle();
    }
}


/**
 * Checks for collisions between the character and the endboss.
 * If the character is not above the ground and is not in godmode,
 * and the character is colliding with the endboss, the character
 * is hit and its health is reduced. The health is then updated
 * on the status bar.
 */
function checkCollisionWithEndboss() {
    world.level.endboss.forEach((endboss) => {
        if (
            world.character.isColliding(endboss) &&
            !world.character.isAboveGround(100) &&
            !godmode
        ) {
            world.character.hit(20);
            world.statusBarHealth.setPercentage(world.character.energy);
        }
    });
}


/**
 * Checks for collisions between the character and enemies.
 * If the character is colliding with an enemy and is falling,
 * the enemy is killed and the character jumps. If the character
 * is colliding with an enemy and is not in godmode, the character
 * is hit and its health is reduced. The health is then updated
 * on the status bar.
 */
function checkCollisionWithEnemies(){
    world.level.enemies.forEach((enemy) => {
        if (world.character.isColliding(enemy) && world.character.isFalling) {
            enemy.enemyDie(enemy);
            soundBar.playSound('characterKill');
            world.character.jump();
        } else if (world.character.isColliding(enemy) && !godmode) {
            world.character.hit(10);
            world.statusBarHealth.setPercentage(world.character.energy);
        }
    });
}


/**
 * Checks for collisions between the character and coins.
 * If the character is colliding with a coin, the coin is collected
 * and the character's score is increased by 10.
 */
function checkCollisionWithCoin(){
    world.level.coins.forEach((coin) => {
        if (world.character.isColliding(coin)) {
            coin.collectCoin(coin);
        }
    });
}


/**
 * Checks for collisions between the character and bottles.
 * If the character is colliding with a bottle, the bottle is collected
 * and the character's health is increased by 10. The health is then
 * updated on the status bar.
 */
function checkCollisionWithBottle(){
    world.level.bottles.forEach((bottle) => {
        if (world.character.isColliding(bottle)) {
            bottle.collectBottle(bottle);
        }
    });
}


/**
 * Checks for collisions between the flying bottles and the endboss.
 * If a collision is detected, the endboss is hit and the bottle splash
 * animation is played. The bottle is removed from the world's array
 * of throwable objects after a short delay.
 */
function checkCollisionWithFlyingBottle(){
    world.throwableObjects.forEach((to) => {
        let endboss = world.level.endboss[0];
        if (endboss.isColliding(to)) {
            endboss.hit();
            world.throwableObjects[world.throwableObjects.indexOf(to)].bottleSplash();
            setTimeout(() => {
                world.throwableObjects.splice(world.throwableObjects.indexOf(to),1);
            }, 100);
        }
    });
}