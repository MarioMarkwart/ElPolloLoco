class World{
    character = new Character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;


    constructor(canvas, keyboard){
        console.log(canvas.width, canvas.height);
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)){
                    console.log('collision with character: ', enemy);
                };
            })
        },1000)
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character)
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(o => this.addToMap(o));
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

