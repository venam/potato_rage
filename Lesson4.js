function Lesson4(game) {
	this.media = game.media;
	this.handPos = {
		x: 145,
		y: 145
	};
	this.counter = 0;
	this.maxCounter = 70;

	this.touchCounter = 0;
	this.maxTouchCounter = 20;
	this.nbTouch = 0;

	this.currentImg = 0;
	this.life = new Life(this.media);
	this.cocroach = new Cocroach(this.media);
	this.cocroach.life = 4;
	this.cocroach.x = 320/2;
	this.cocroach.y = 115;
	this.cocroach.setSpeed(1);
	this.state    = 0; /* 
						  state 0 wait sometime then switch to press hand
						  state 1 touch 3 times
						  state 3 lift hand and let cocroach fly away
						  state 4 back to state 0 
						*/
}

Lesson4.prototype.draw = function(ctx) {
	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillText("LESSON4", 320/2, 65);
	ctx.font = "16px bit";
	ctx.fillText("To repel cocroaches hit", 320/2, 290);
	ctx.fillText("them from 3 to 7 times.", 320/2, 310);
	ctx.fillText("Do not cut or peel", 320/2, 330);
	ctx.fillText("any cocroaches.", 320/2, 350);
	this.cocroach.draw(ctx);

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

Lesson4.prototype.update = function() {
	if (this.state == 0) {
		this.doWait();
	}
	else if (this.state == 1) {
		this.doTouchThreeTimes();
	}
	else if (this.state == 2) {
		this.doWait2();
	}
	this.cocroach.update();
}

Lesson4.prototype.doWait = function() {
	this.counter++;
	if (this.counter == this.maxCounter) {
		this.state   = 1;
		this.counter = 0;
		this.currentImg = 1;
	}
}


Lesson4.prototype.doWait2 = function() {
	this.counter++;
	if (this.counter >= this.maxCounter) {
		this.currentImg = 0;
		this.cocroach.reset();
		this.cocroach.life = 4;
		this.cocroach.x = 320/2;
		this.cocroach.y = 115;
		this.cocroach.setSpeed(1);

		this.counter = 0;
		this.state   = 0;
	}
}

Lesson4.prototype.doTouchThreeTimes = function() {
	this.touchCounter++;
	if (this.touchCounter>= this.maxTouchCounter) {
		if (this.currentImg==0) {
			this.currentImg = 1;
		}
		else {
			this.currentImg = 0;
			this.cocroach.touch();
		}
		this.nbTouch++;
		this.touchCounter = 0;
	}
	if (this.nbTouch ==7) {
		this.nbTouch = 0;
		this.currentImg = 0;
		this.state = 2;
	}
}


