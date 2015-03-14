function Life(media) {
	this.media = media;
	this.numberOfLives = 3;
	this.timer    = 0;
	this.maxTimer = 25;
	this.imgs     = [ 
		{ 
			x       : 250,
			y       : 10,
			timer   : 0,
			maxTimer: this.maxTimer
		},
		{
			x       : 270,
			y       : 10,
			timer   : 0,
			maxTimer: this.maxTimer
		},
		{
			x       : 290,
			y       : 10,
			timer   : 0,
			maxTimer: this.maxTimer
		}
	];
}

Life.prototype.draw = function(ctx) {
	for (var i=0; i< this.numberOfLives; i++) {
		ctx.drawImage( this.media.heartSprites[0].image,
				this.media.heartSprites[0].sx, //position on the image
				this.media.heartSprites[0].sy, //position on the image
				this.media.heartSprites[0].sw, //image width on the image
				this.media.heartSprites[0].sh, //image height on the image
				Math.floor(this.imgs[i].x), //position x on canvas
				Math.floor(this.imgs[i].y), //position y on canvas
				this.media.heartSprites[0].sw, //width on canvas
				this.media.heartSprites[0].sh //height on canvas
		);
	}
}

Life.prototype.update = function() {
	for (var i=0; i<this.numberOfLives; i++) {
		if (this.imgs[i].timer>0) {
			this.imgs[i].y--;
			this.imgs[i].timer++;
		}
		if (this.imgs[i].timer>this.imgs[i].maxTimer) {
			this.numberOfLives--;
		}
	}
}

Life.prototype.diminish = function() {
	this.imgs[this.numberOfLives-1].timer++;
}

