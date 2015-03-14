function Potato(game) {
	Element.call(this);
	this.rotationAngle    = 0;
	this.twoRotations     = 0;
	this.plusRotation     = 0.25;
	this.isPeeling        = false;
	this.peeled           = false;
	this.isCutting        = false;
	this.cut              = false;
	this.reachedEnd       = false;
	this.game             = game;
	this.media            = this.game.media;
}

Potato.prototype = new Element();
Potato.prototype.constructor = Potato;

Potato.prototype.draw = function(ctx) {
	var img = 0;
	if (this.peeled && ! this.cut) {
		img = 1;
	}
	else if (this.peeled && this.cut) {
		img = 2;
	}

	ctx.translate(this.x,this.y);
	ctx.rotate(this.rotationAngle);
	ctx.drawImage( this.media.potatoSprites[img].image,
			this.media.potatoSprites[img].sx, //position on the image
			this.media.potatoSprites[img].sy, //position on the image
			this.media.potatoSprites[img].sw, //image width on the image
			this.media.potatoSprites[img].sh, //image height on the image
			-Math.floor(this.media.potatoSprites[img].sw/2), //position x on canvas
			-Math.floor(this.media.potatoSprites[img].sh/2), //position y on canvas
			this.media.potatoSprites[img].sw, //width on canvas
			this.media.potatoSprites[img].sh //height on canvas
	);
	ctx.rotate(-this.rotationAngle);
	ctx.translate(-this.x, -this.y);
}

Potato.prototype.update = function() {
	if ( (this.isPeeling && !this.peeled)|| (this.isCutting && !this.cut) ) {
		if (this.twoRotations==0) {
			this.rotationAngle+=this.plusRotation;
			if (this.rotationAngle>0.4) {
				this.twoRotations = 1;
			}
		}
		else if (this.twoRotations ==1) {
			this.rotationAngle-=this.plusRotation;
			if (this.rotationAngle<-0.4) {
				this.twoRotations = 2;
			}
		}
		else if (this.twoRotations==2) {
			this.rotationAngle+=this.plusRotation;
			if (this.rotationAngle>0.01) {
				this.twoRotations = 3;
			}
		}
		else {
			this.twoRotations = 0;
			this.rotationAngle = 0;
			if (this.isPeeling) {
				this.peeled = true;
				this.isPeeling = false;
			}
			else {
				this.cut = true;
				this.maxTimer = 2;
				this.augmenter = 16;
			}
		}
	}
	Element.prototype.update.call(this);
}

Potato.prototype.reset = function() {
	Element.prototype.reset.call(this);
	this.cut        = false;
	this.peeled     = false;
	this.isPeeling  = false;
	this.isCutting  = false;
}

Potato.prototype.tryPeel = function() {
	if (!this.peeled && !this.isPeeling) {
		this.isPeeling = true;
//		if (!theGame.mobile) {
			this.media.sound.play('swoosh');
//		}
	}
}

Potato.prototype.tryCut = function() {
	if (this.peeled && !this.isCutting) {
		this.isCutting = true;

		this.game.playingState.numberOfPotatoes++;
//		if (!theGame.mobile) {
			this.media.sound.play('knife');
//		}
	}
}


