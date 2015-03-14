function Lesson1(game) {
	this.game = game;
	this.media = this.game.media;
	this.life = new Life(this.media);
	this.counter = 0;
	this.maxCounter = 20;
	this.drawing = true;
}

Lesson1.prototype.draw = function(ctx) {
	ctx.font = "25px bit";
	ctx.fillStyle = "#59470E";
	ctx.textAlign="center";
	ctx.fillText("LESSON1", 320/2, 65);
	ctx.font = "16px bit";
	/*
	 *	 * Only cut potatoes should be fried.
	 *		 * You'll be penalized if you frie something else.
	 *			 * If it happens 3 times you'll be fired.
	 *				 *
	 */
	ctx.fillText("Only cut potatoes should", 320/2, 170);
	ctx.fillText("be fried.", 320/2, 190);
	ctx.fillText("You'll be penalized if you", 320/2, 210);
	ctx.fillText("fry something else.", 320/2, 230);
	ctx.fillText("If it happens 3 times you'll", 320/2, 250);
	ctx.fillText("be fired.", 320/2, 270);
	if (this.drawing) {
		this.life.draw(ctx);
	}

	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillText("00:00", 320/2, 35);


}

Lesson1.prototype.update = function() {
	this.counter++;
	if (this.counter > this.maxCounter) {
		this.counter = 0;
		if (this.drawing) {
			this.drawing = false;
		}
		else {
			this.drawing = true;
		}
	}
}



