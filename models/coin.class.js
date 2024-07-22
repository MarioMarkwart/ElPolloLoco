class Coin extends MovableObject {

    COINS_IMAGES = [
        '../assets/img/8_coin/coin_1.png',
        '../assets/img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage('../assets/img/8_coin/coin_1.png');
        this.loadImages(this.COINS_IMAGES);
        this.x = this.getRandomInt(200, 2200);
        this.y = this.getRandomInt(200, 350);
        this.width = 70;
        this.height = 70;
        this.randomizeFirstPictures();
        this.animate(this.COINS_IMAGES, this.getRandomInt(200,300));
    };


    animate(imageArr, duration = 200) {
        setInterval(() => {
            this.playAnimation(imageArr);
        }, duration);
    }
}