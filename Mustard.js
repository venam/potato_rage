function Mustard(playing, media) {
	Element.call(this);
	this.media = media;
	this.playingState     = playing;
	this.maxTimer         = 6; //move 1 pixel every 10 frames
	this.augmenter        = 1;
	this.x                = Math.floor(Math.random()*210+30); //between 20 and 240
	this.y               = -Math.floor(Math.random()*400+30);
	this.reachedEnd       = false;
	this.taken            = false;
	this.shrinkTime       = 0;
	this.shrinkMax        = 10;
	this.resize           = 1;
	this.stopShrink       = false;
}

Mustard.prototype = new Element();
Mustard.prototype.constructor = Mustard;

Mustard.prototype.draw = function(ctx) {
	if (!this.stopShrink) {
		if (!this.reachedEnd || !(this.taken &&this.shrinkTime >this.shrinkMax) ) {
			var img = 1;
			ctx.drawImage( this.media.elemSprites[img].image,
					this.media.elemSprites[img].sx, //position on the image
					this.media.elemSprites[img].sy, //position on the image
					this.media.elemSprites[img].sw, //image width on the image
					this.media.elemSprites[img].sh, //image height on the image
					Math.floor( this.x-(this.media.elemSprites[img].sw/(2*this.resize))), //position x on canvas
					Math.floor( this.y-(this.media.elemSprites[img].sh/(2*this.resize))), //position y on canvas
					this.media.elemSprites[img].sw/this.resize, //width on canvas
					this.media.elemSprites[img].sh/this.resize //height on canvas
			);
		}
	}
}

Mustard.prototype.update = function() {
	if (!this.stopShrink) {
		if (this.taken) {
			this.shrinkTime ++;
			this.resize += 0.3;
			if (this.shrinkTime> this.shrinkMax) {
				this.stopShrink = true;
				this.playingState.numberOfMustards++;
				//TODO
				//this.reset();
			}
		}
		Element.prototype.update.call(this);
	}
}

Mustard.prototype.take = function() {
//	if (!theGame.mobile) {
		this.media.sound.play('bottle');
//	}
	this.taken = true;
}

Mustard.prototype.reset = function() {
	Element.prototype.reset.call(this);
	this.taken      = false;
	this.shrinkTime = 0;
	this.stopShrink = false;
	this.resize     = 1;
}

