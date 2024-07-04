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
        this.addToMap(this.backgroundObjects);
        this.addToMap(this.enemies);
        this.addToMap(this.clouds);
        this.addToMap(this.character)

        requestAnimationFrame(() => this.draw());
    }

    
    /**
     * Adds an object or an array of objects to the map. If the object is an array,
     * it recursively calls itself for each object in the array. If the object is not
     * an array, it draws the object's image on the canvas using the provided context.
     *
     * @param {Object|Array} obj - The object or array of objects to be added to the map.
     */
    addToMap(obj){
        Array.isArray(obj)
        ? obj.forEach(o => this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height))
        : this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
}

