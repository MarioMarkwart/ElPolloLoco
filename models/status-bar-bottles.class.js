class StatusBarBottles extends DrawableObject {

    IMAGES = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ]

    amount = 0;
    x;
    y;

    constructor(x, y){
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 180;
        this.height = 50;
        this.setAmount(0);
    }


    setAmount(amount){
        this.amount = amount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]

    }


    resolveImageIndex(){
        if(this.amount == 0){ return 0;
        }else if(this.amount == 1){ return 1;
        }else if(this.amount == 2){ return 2;
        }else if(this.amount == 3){ return 3;
        }else if(this.amount == 4){ return 4;
        }else { return 5; }
    }
}