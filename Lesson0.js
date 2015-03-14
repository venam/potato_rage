function Lesson0() {
	this.counter = 0;
	this.maxCounter = 20;
	this.drawing = true;
}

Lesson0.prototype.draw = function(ctx) {
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.fillText("Welcome new chef!", 320/2, 65);
	ctx.font = "16px bit";
	ctx.fillText("Your job will be to peel ", 320/2, 170);
	ctx.fillText("and cut potatoes non-stop.", 320/2, 190);
	ctx.fillText("Let's see for how long you", 320/2, 210);
	ctx.fillText("will be able to whitstand", 320/2, 230);
	ctx.fillText("our customers' thirst for ", 320/2, 250);
	ctx.fillText("french fries.", 320/2, 270);

	if (this.drawing) {
		ctx.fillStyle = "#E1AA21";
		ctx.font = "40px bit";
		ctx.textAlign="center";
		ctx.fillText("00:00", 320/2, 35);
	}

}

Lesson0.prototype.update = function() {
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



