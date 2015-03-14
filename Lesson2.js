function Lesson2(game) {
	this.game = game;
	this.media = this.game.media;
	this.handPos = {
		x: -79,
		y: 0
	};
	this.radius = 80;
	this.counter = 0;
	this.maxCounter = 40;
	this.center = {
		x: 160,
		y: 145,
	};
	this.handDown = true;
	this.currentImg = 0;
	this.life = new Life(this.media);
	this.potato = new Potato(this.game);
	this.potato.x = 320/2;
	this.potato.y = 120;
	this.potato.setSpeed(2);
	this.state    = 0; /* 
						  state 0 wait sometime then switch to press hand
						  state 1 rotate the hand
						  state 3 lift hand and peel potato
						  state 4 back to state 0 
						*/
	/*
	 * equation of a circle:
	 * (x-h)^2 + (y-k)^2  = r^2
	 * we have x
	 * (y-k)^2  = r^2 - (x-h)^2
	 * y +-= sqrt(r^2 - (x-h)^2)+k
	 */
}

Lesson2.prototype.draw = function(ctx) {
	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillText("LESSON2", 320/2, 65);
	ctx.font = "16px bit";
	ctx.fillText("To peel potatoes draw a ", 320/2, 290);
	ctx.fillText("circle around them.", 320/2, 310);
	this.potato.draw(ctx);


	ctx.translate(this.center.x,this.center.y);
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
	ctx.translate(-this.center.x,-this.center.y);

	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillText("00:00", 320/2, 35);
	this.life.draw(ctx);
}

Lesson2.prototype.update = function() {
	this.potato.update();
	if (this.state == 0) {
		this.doWait();
	}
	else if (this.state == 1) {
		this.doRotation();
	}
	else if (this.state == 2) {
		this.doWait2();
	}
}

Lesson2.prototype.doWait = function() {
	this.counter++;
	if (this.counter == this.maxCounter) {
		this.state   = 1;
		this.counter = 0;
		this.currentImg = 1;
	}
}


Lesson2.prototype.doWait2 = function() {
	this.counter++;
	if (this.counter == this.maxCounter) {
		this.state   = 0;
		this.counter = 0;
		this.currentImg = 0;
		this.potato.x = 320/2;
		this.potato.y = 120;
		this.potato.peeled = false;
	}
}

Lesson2.prototype.doRotation = function() {
	if (this.handDown) {
		this.handPos.x+=4;
		this.handPos.y = this.getCirclePos(this.handPos.x);
		if (this.handPos.x>=this.radius) {
			this.handDown = false;
		}
	}
	else {
		this.handPos.x-=4;
		this.handPos.y = -this.getCirclePos(this.handPos.x);
		if (this.handPos.x<=-this.radius) {
			this.state = 2;
			this.potato.tryPeel();
			this.currentImg = 0;
			this.handPos.x = -79;
			this.handPos.y = 0;
			this.handDown = true;
		}
	}
}

Lesson2.prototype.getCirclePos = function(x) {
	return Math.floor(
			Math.sqrt( this.radius*this.radius - x*x) 
	);
}

Lesson2.prototype.reset = function() {
}


