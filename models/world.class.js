class World{
    character = new Character;
    enemies = [
        new Chicken,
        new Chicken,
        new Chicken
    ];

    clouds = [
        new Cloud,
        new Cloud
    ];

    backgroundObjects = [
        new BackgroundObject('../assets/img/5_background/layers/air.png'),
        new BackgroundObject('../assets/img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('../assets/img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('../assets/img/5_background/layers/1_first_layer/1.png'),
    ];

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
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
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

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
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

