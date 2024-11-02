class StatusBar extends DrawableObject {
    percentage = 100;
    amount = 0;
	x = 40;
    width = 180;
    height = 50;

    amount = 0;
    percentage = 100;
    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexPercentage()];
        this.img = this.imageCache[path];
    }

    increaseAmount() {
		this.amount++;
        if (this instanceof StatusBarCoins){
            if (this.amount == 5) {
                this.amount = 0;
                world.statusBarBottles.increaseAmount();
            }
        }
        this.setAmount(this.amount);
	}

	decreaseAmount() {
		this.amount--;
		this.setAmount(this.amount);
	}

    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES[this.resolveImageIndexAmount()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexAmount() {
		if (this.amount == 0) return 0;
		else if (this.amount == 1) return 1;
		else if (this.amount == 2) return 2;
		else if (this.amount == 3) return 3;
		else if (this.amount == 4) return 4;
		else return 5;
	}

    resolveImageIndexPercentage() {
		if (this.percentage == 100) return 5;
		else if (this.percentage > 80) return 4;
		else if (this.percentage > 60) return 3;
		else if (this.percentage > 40) return 2;
		else if (this.percentage > 20) return 1;
		else return 0;
	}
}
