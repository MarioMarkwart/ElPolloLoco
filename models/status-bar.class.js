class StatusBar extends DrawableObject {
    percentage = 100;
    amount = 0;
	x = 40;
    width = 180;
    height = 50;


    /**
     * Sets the percentage of the status bar.
     *
     * @param {number} percentage - the percentage of the status bar between 0 and 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexPercentage()];
        this.img = this.imageCache[path];
    }


    /**
     * Increases the amount of the status bar by one.
     * If the status bar is an instance of StatusBarCoins and the amount reaches 5,
     * it checks the world's StatusBarBottles amount. If the bottle amount is less than 5,
     * it resets the coin amount to 0 and increases the bottle amount. Otherwise, it calls
     * checkIfBottleAmountDecreased to handle further logic.
     * Finally, it updates the status bar with the new amount.
     */
    increaseAmount() {
		this.amount++;
        if (this instanceof StatusBarCoins){
            if (this.amount == 5) {
                if(world.statusBarBottles.amount < 5){
                    this.amount = 0;
                    world.statusBarBottles.increaseAmount();
                }else{
                    this.checkIfBottleAmountDecreased();
                }
            }
	    }
        this.setAmount(this.amount);
    }


    /**
     * Checks if the amount of the world's StatusBarBottles is less than 5 in intervals of 100ms.
     * If the amount is less than 5, the amount of the world's StatusBarBottles is increased by one,
     * the interval is cleared and the amount of the status bar is set to 0.
     */
    checkIfBottleAmountDecreased(){
        let intv = setInterval(() => {
            if (world.statusBarBottles.amount < 5){ 
                world.statusBarBottles.increaseAmount();
                clearInterval(intv);
                this.setAmount(0);
            }
        },100)
    }


    /**
     * Decreases the amount of the status bar by one.
     *
     * The amount is decreased by one and the setAmount method is called with the decreased amount.
     */
	decreaseAmount() {
		this.amount--;
		this.setAmount(this.amount);
	}


    /**
     * Sets the amount of the status bar and updates the displayed image.
     *
     * This function assigns the provided amount to the status bar's amount property,
     * then determines the appropriate image from the IMAGES array to display based
     * on the new amount. The image is retrieved from the image cache and set as the
     * current image of the status bar.
     *
     * @param {number} amount - The new amount to set for the status bar.
     */
    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES[this.resolveImageIndexAmount()];
        this.img = this.imageCache[path];
    }


    /**
     * Returns the index of the image to display based on the amount property of the status bar.
     *
     * This function returns an integer between 0 and 5, which is used to index into the IMAGES
     * array to retrieve the appropriate image to display for the current amount. The returned
     * value is determined by the following rules:
     *
     * * If amount is 0, return 0.
     * * If amount is 1, return 1.
     * * If amount is 2, return 2.
     * * If amount is 3, return 3.
     * * If amount is 4, return 4.
     * * Otherwise, return 5.
     *
     * @returns {number} The index of the image to display based on the amount property.
     */
    resolveImageIndexAmount() {
		if (this.amount == 0) return 0;
		else if (this.amount == 1) return 1;
		else if (this.amount == 2) return 2;
		else if (this.amount == 3) return 3;
		else if (this.amount == 4) return 4;
		else return 5;
	}


    /**
     * Determines the index of the image to display based on the percentage property of the status bar.
     *
     * This function returns an integer between 0 and 20, which is used to index into the IMAGES
     * array to retrieve the appropriate image to display for the current percentage.
     *
     * @returns {number} The index of the image to display based on the percentage property.
     */
    resolveImageIndexPercentage() {
		if (this.percentage >= 95) return 20;
		else if (this.percentage >= 90) return 19;
		else if (this.percentage >= 85) return 18;
        else if (this.percentage >= 80) return 17;
        else if (this.percentage >= 75) return 16;
        else if (this.percentage >= 70) return 15;
        else if (this.percentage >= 65) return 14;
        else if (this.percentage >= 60) return 13;
        else if (this.percentage >= 55) return 12;
        else if (this.percentage >= 50) return 11;
        else if (this.percentage >= 45) return 10;
        else if (this.percentage >= 40) return 9;
        else if (this.percentage >= 35) return 8;
        else if (this.percentage >= 30) return 7;
        else if (this.percentage >= 25) return 6;
        else if (this.percentage >= 20) return 5;
        else if (this.percentage >= 15) return 4;
        else if (this.percentage >= 10) return 3;
        else if (this.percentage >= 5) return 2;
        else if (this.percentage >= 0) return 1;
        else return 0;
	}
}
