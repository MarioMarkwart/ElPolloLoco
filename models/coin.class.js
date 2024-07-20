class Coin extends DrawableObject {

    constructor() {
        super();
        this.loadImage('../assets/img/8_coin/coin_1.png');
        this.x = this.getRandomInt(200, 2200);
        this.y = this.getRandomInt(200, 350);
        this.width = 70;
        this.height = 70;
    }


}