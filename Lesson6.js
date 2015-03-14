function Lesson6(game) {
	this.game = game;
	this.media = this.game.media;
	this.handPos = {
		x: 30,
		y: 220
	};
	this.numberOfKetchups = 1;
	this.counter = 0;
	this.maxCounter = 80;

	this.currentImg = 0;
	this.life = new Life(this.media);
	this.potatoes = [ 
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game)
	];
	this.potatoes[0].x = 80;
	this.potatoes[0].y = 100;
	this.potatoes[0].setSpeed(1);

	this.potatoes[1].x = 130;
	this.potatoes[1].y = 80;
	this.potatoes[1].setSpeed(1);

	this.potatoes[2].x = 240;
	this.potatoes[2].y = 60;
	this.potatoes[2].setSpeed(1);

	this.currentShape = 0;
	this.state    = 0; /* 
						  state 0 wait sometime then switch to press hand
						  state 1 draw shape
						  state 3 lift hand, peel all
						  state 4 back to state 0 
						*/
}

Lesson6.prototype.draw = function(ctx) {
	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillText("LESSON6", 320/2, 65);
	ctx.font = "16px bit";
	/* To use the Ketchup combo, which will peel all the potatoes on the screen, draw this shape.
	 */
	ctx.fillText("To use the Ketchup combo,", 320/2, 290);
	ctx.fillText("which will peel all the", 320/2, 310);
	ctx.fillText("potatoes on the screen,", 320/2, 330);
	ctx.fillText("draw this shape.", 320/2, 350);

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

	for (var i=0; i< this.potatoes.length; i++) {
		this.potatoes[i].draw(ctx);
	}

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

Lesson6.prototype.update = function() {
	if (this.state == 0) {
		this.doWait();
	}
	else if (this.state == 1) {
		this.doShape();
	}
	else if (this.state == 2) {
		this.doWait2();
	}
	for (var i= 0; i<this.potatoes.length; i++) {
		this.potatoes[i].update();
	}
}

Lesson6.prototype.doWait = function() {
	this.counter++;
	this.numberOfKetchups = 1;
	if (this.counter == this.maxCounter) {
		this.state   = 1;
		this.counter = 0;
		this.currentImg = 1;
		this.maxCounter = 25;
	}
}


Lesson6.prototype.doWait2 = function() {
	this.counter++;
	if (this.counter >= this.maxCounter) {
		this.numberOfKetchups = 1;
		this.currentImg = 0;
		for (var i=0; i<this.potatoes.length; i++) {
			this.potatoes[i].reset();
		}
		this.potatoes[0].x = 80;
		this.potatoes[0].y = 100;
		this.potatoes[0].setSpeed(1);

		this.potatoes[1].x = 130;
		this.potatoes[1].y = 80;
		this.potatoes[1].setSpeed(1);

		this.potatoes[2].x = 240;
		this.potatoes[2].y = 60;
		this.potatoes[2].setSpeed(1);
		this.maxCounter = 80;
		this.counter = 0;
		this.handPos = {
			x: 30,
			y: 220
		};
		this.state   = 0;
	}
}

Lesson6.prototype.doShape = function() {
	if (this.currentShape==0) {
		this.handPos.x+=2;
		this.handPos.y-=2;
		if (this.handPos.x>90) {
			this.currentShape =1;
		}
	}
	else if (this.currentShape==1) {
		this.handPos.x+=2;
		this.handPos.y+=2;
		if (this.handPos.x>170) {
			this.currentShape=2;
		}
	}
	else if (this.currentShape==2) {
		this.handPos.x+=2;
		this.handPos.y-=2;
		if (this.handPos.x>230) {
			this.currentShape =3;
		}
	}
	if (this.currentShape == 3) {
		this.currentImg = 0;
		this.currentShape = 0;
		this.state = 2;
		for (var i=0; i<this.potatoes.length; i++) {
			this.potatoes[i].tryPeel();
		}
		this.numberOfKetchups = 0;

		this.maxCounter = 90;
	}
}


