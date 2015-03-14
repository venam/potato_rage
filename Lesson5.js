function Lesson5(game) {
	this.game = game;
	this.media = game.media;
	this.handPos = {
		x: 145,
		y: 145
	};
	this.numberOfKetchups = 0;
	this.counter = 0;
	this.maxCounter = 80;

	this.currentImg = 0;
	this.life = new Life(this.media);
	this.ketchup = new Ketchup(this, this.media);
	this.ketchup.x = 320/2;
	this.ketchup.y = 115;
	this.ketchup.setSpeed(1);
	this.state    = 0; /* 
						  state 0 wait sometime then switch to press hand
						  state 1 touch 3 times
						  state 3 lift hand and let cocroach fly away
						  state 4 back to state 0 
						*/
}

Lesson5.prototype.draw = function(ctx) {
	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillText("LESSON5", 320/2, 65);
	ctx.font = "16px bit";
	ctx.fillText("To take the ketchup, or", 320/2, 290);
	ctx.fillText("the mustard, touch it.", 320/2, 310);

	ctx.fillStyle = "#fdd704";
	ctx.font = "20px bit";
	ctx.fillText("M", 50, 20);
	ctx.font = "16px bit";
	ctx.fillText(0, 50, 37);
	ctx.font = "20px bit";
	ctx.fillStyle = "#a72a17";
	ctx.fillText("K", 20, 20);
	ctx.font = "16px bit";
	ctx.fillText(this.numberOfKetchups, 20, 37);

	this.ketchup.draw(ctx);

	ctx.drawImage( this.media.handSprites[this.currentImg].image,
			this.media.handSprites[this.currentImg].sx, //position on the image
			this.media.handSprites[this.currentImg].sy, //position on the image
			this.media.handSprites[this.currentImg].sw, //image width on the image
			this.media.handSprites[this.currentImg].sh, //image height on the image
			Math.floor(this.handPos.x), //position x on canvas
			Math.floor(this.handPos.y), //position y on canvas
			this.media.handSprites[this.currentImg].sw, //width on canvas
			this.media.handSprites[this.currentImg].sh //height on canvas
	);
ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillText("00:00", 320/2, 35);
	this.life.draw(ctx);
}

Lesson5.prototype.update = function() {
	if (this.state == 0) {
		this.doWait();
	}
	else if (this.state == 1) {
		this.doTouch();
	}
	else if (this.state == 2) {
		this.doWait2();
	}
	this.ketchup.update();
}

Lesson5.prototype.doWait = function() {
	this.counter++;
	this.numberOfKetchups = 0;
	if (this.counter == this.maxCounter) {
		this.state   = 1;
		this.counter = 0;
		this.currentImg = 1;
		this.maxCounter = 25;
	}
}


Lesson5.prototype.doWait2 = function() {
	this.counter++;
	if (this.counter >= this.maxCounter) {
		this.currentImg = 0;
		this.ketchup.reset();
		this.ketchup.x = 320/2;
		this.ketchup.y = 115;
		this.ketchup.setSpeed(1);
		this.maxCounter = 80;

		this.counter = 0;
		this.state   = 0;
	}
}

Lesson5.prototype.doTouch = function() {
	this.counter++;
	if (this.counter == this.maxCounter) {
		this.currentImg = 0;
		this.state = 2;
		this.ketchup.take();
		this.maxCounter = 90;
	}
}


