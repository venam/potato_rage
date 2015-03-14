function Ketchup(playing,media) {
	Element.call(this);
	this.media = media;
	this.playingState     = playing;
	this.taken            = false;
	this.shrinkTime       = 0;
	this.shrinkMax        = 10;
	this.resize           = 1;
	this.stopShrink       = false;
}

Ketchup.prototype = new Element();
Ketchup.prototype.constructor = Ketchup;

Ketchup.prototype.draw = function(ctx) {
	var img = 0;
	if (!this.stopShrink) {
		if (!this.reachedEnd || !(this.taken &&this.shrinkTime >this.shrinkMax) ) {
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

Ketchup.prototype.update = function() {
	if (!this.stopShrink) {
		if (this.taken) {
			this.shrinkTime ++;
			this.resize += 0.3;
			if (this.shrinkTime> this.shrinkMax) {
				this.stopShrink = true;
				this.playingState.numberOfKetchups++;
				//TODO
				//this.reset();
			}
		}
		Element.prototype.update.call(this);
	}
}

Ketchup.prototype.take = function() {
//	if (!theGame.mobile) {
		this.media.sound.play('bottle');
//	}
	this.taken = true;
}

Ketchup.prototype.reset = function() {
	Element.prototype.reset.call(this);
	this.taken      = false;
	this.shrinkTime = 0;
	this.resize     = 1;
	this.stopShrink = false;
}

