function Sparkles(media) {
	this.media = media;
	//create 10 stars
	this.stars  = [
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media),
		new Star(media)
	];
	this.defaultLength   = 4;
	this.length          = this.defaultLength;
	this.somethingInside = false;
	this.timer           = 0;
	this.maxTimer        = 60; //1s
}

Sparkles.prototype.draw = function(ctx) {
	for (var i=0; i<this.length; i++ ) {
		this.stars[i].draw(ctx);
	}
}

Sparkles.prototype.putInside = function() {
//	if (!theGame.mobile) {
		this.media.sound.play('frying');
//	}
	this.somethingInside = true;
	this.length          = 10;
	this.timer           = 0;
}

Sparkles.prototype.update = function() {
	if (this.somethingInside) {
		this.timer++;
		if (this.timer> this.maxTimer) {
			this.timer = 0;
			this.somethingInside = false;
			this.length = this.defaultLength;
		}
	}
	for (var i=0; i< this.length; i++) {
		this.stars[i].update();
	}
}

