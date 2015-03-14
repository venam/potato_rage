function Lesson3(game) {
	this.game = game;
	this.media = this.game.media;
	this.handPos = {
		x: 81,
		y: 145
	};
	this.counter = 0;
	this.maxCounter = 60;
	this.currentImg = 0;
	this.life = new Life(this.media);
	this.potato = new Potato(this.game);
	this.potato.x = 320/2;
	this.potato.y = 120;
	this.potato.peeled = true;
	this.potato.setSpeed(2);
	this.state    = 0; /* 
						  state 0 wait sometime then switch to press hand
						  state 1 move the hand from left to right
						  state 3 lift hand and peel potato
						  state 4 back to state 0 
						*/
}

Lesson3.prototype.draw = function(ctx) {
	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillText("LESSON3", 320/2, 65);
	ctx.font = "16px bit";
	ctx.fillText("To cut potatoes draw a ", 320/2, 290);
	ctx.fillText("line in any direction", 320/2, 310);
	ctx.fillText("over them.", 320/2, 330);
	this.potato.draw(ctx);


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

Lesson3.prototype.update = function() {
	if (this.state == 0) {
		this.doWait();
	}
	else if (this.state == 1) {
		this.doDrawLine();
	}
	else if (this.state == 2) {
		this.doWait2();
	}
	this.potato.update();
}

Lesson3.prototype.doWait = function() {
	this.counter++;
	if (this.counter == this.maxCounter) {
		this.state   = 1;
		this.counter = 0;
		this.currentImg = 1;
	}
}


Lesson3.prototype.doWait2 = function() {
	this.counter++;
	if (this.counter >= this.maxCounter) {
		this.currentImg = 0;
		this.potato.x = 320/2;
		this.potato.y = 120;
		this.handPos.x = 81;
		this.handPos.y = 145;
		this.potato.cut = false;
		this.potato.reachedEnd = false;
		this.potato.isCutting = false;
		this.potato.setSpeed(2);
		this.counter = 0;
		this.state   = 0;
	}
}

Lesson3.prototype.doDrawLine = function() {
	this.handPos.x+=4;
	if (this.handPos.x>=220) {
		this.potato.tryCut();
		this.currentImg = 0;
		this.state = 2;
	}
}


