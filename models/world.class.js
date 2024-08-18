class World{
    character = new Character();
    endboss = new Endboss();
    statusBarHealth = new StatusBarHealth(40, 0);
    statusBarCoins = new StatusBarCoins(40, 40);
    statusBarBottles = new StatusBarBottles(40, 80);
    statusBarEndboss = new StatusBarEndboss(480, 0);
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        },200)
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy)
            }
        });
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)){
                coin.collectCoin(coin);
            }
        })
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)){
                bottle.collectBottle(bottle);
        }
        });

        this.throwableObjects.forEach((bottle) => {
            if(this.endboss.isColliding(bottle)){
                this.endboss.hit();
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            }
        });
    }

    checkThrowObjects(){
        if (this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwableObjects.push(bottle)
        }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles)
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }


    /**
     * Adds an object or an array of objects to the map. If the object is an array,
     * it recursively calls itself for each object in the array. If the object is not
     * an array, it draws the object's image on the canvas using the provided context.
     *
     * @param {Object|Array} obj - The object or array of objects to be added to the map.
     */
    addToMap(mo){
        if (mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx)
        mo.drawFrame(this.ctx);

        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();

        
    }
}

