class World{
    character = new Character;
    enemies = [
        new Chicken,
        new Chicken,
        new Chicken
    ];
    cloud = new Cloud;
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        })
        this.ctx.drawImage(this.cloud.img, this.cloud.x, this.cloud.y, this.cloud.width, this.cloud.height);


        // draw always be called on every frame
        // let self = this;
        // requestAnimationFrame(function(){ self.draw()})

        requestAnimationFrame(() => this.draw());
    }

}

