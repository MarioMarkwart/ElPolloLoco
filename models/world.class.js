class World{
    character = new Character;
    enemies = [
        new Chicken,
        new Chicken,
        new Chicken
    ];

    clouds = [
        new Cloud,
        new Cloud,
    ];

    backgroundObjects = [
        new BackgroundObject('../assets/img/5_background/layers/air.png'),
        new BackgroundObject('../assets/img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('../assets/img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('../assets/img/5_background/layers/1_first_layer/1.png'),
    ];

    canvas;
    ctx;


    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.backgroundObjects.forEach(backgroundObject => this.addToMap(backgroundObject));
        this.enemies.forEach(enemy =>  this.addToMap(enemy))
        this.clouds.forEach(cloud => this.addToMap(cloud))

        this.addToMap(this.character)

        requestAnimationFrame(() => this.draw());
    }


    addToMap(moObj){
        this.ctx.drawImage(moObj.img, moObj.x, moObj.y, moObj.width, moObj.height);
    }
}

