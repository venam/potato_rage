function Star(media) {
	this.media = media;
	this.starCurrentFrame = 0;
	this.starTimer        = 15; //change Every 10 frames
	this.starTimerMax     = 15;
	this.starPosition     =  {
		x: 100,
		y: 450
	};
}

Star.prototype.draw = function (ctx) {
	ctx.drawImage( this.media.starSprites[this.starCurrentFrame].image,
			this.media.starSprites[this.starCurrentFrame].sx, //position on the image
			this.media.starSprites[this.starCurrentFrame].sy, //position on the image
			this.media.starSprites[this.starCurrentFrame].sw, //image width on the image
			this.media.starSprites[this.starCurrentFrame].sh, //image height on the image
			Math.floor(this.starPosition.x), //position x on canvas
			Math.floor(this.starPosition.y), //position y on canvas
			this.media.starSprites[this.starCurrentFrame].sw, //width on canvas
			this.media.starSprites[this.starCurrentFrame].sh //height on canvas
	);
}

Star.prototype.update = function() {
	//if the timer for the star is done Move it to another place
	if(this.starTimer==this.starTimerMax) {
		this.starCurrentFrame++;
		this.starTimer        = 0;
		if (this.starCurrentFrame== this.media.starSprites.length) {
			this.starCurrentFrame = 0;
			this.starPosition.x   = Math.floor(Math.random()*235+40); //between 10 and 310
			this.starPosition.y   = Math.floor(Math.random()*20+455); //between 440 and 440
		}
	}
	this.starTimer++;
}

