function Cocroach(media) {
	Element.call(this);
	this.media = media;

	this.direction        =  Math.floor(Math.random()*2+1); //1 or 2
	this.life             = 3;
	this.nbTimesTouched   = 0;
	this.taken            = false;
	this.dead             = false;
	this.img              = 2 ;
}

Cocroach.prototype = new Element();
Cocroach.prototype.constructor = Cocroach;

Cocroach.prototype.draw = function(ctx) {
	if (! (this.taken &&  (this.x>330 || this.x<10 || this.y<-10)) ){ 
		ctx.drawImage( this.media.elemSprites[this.img].image,
				this.media.elemSprites[this.img].sx, //position on the image
				this.media.elemSprites[this.img].sy, //position on the image
				this.media.elemSprites[this.img].sw, //image width on the image
				this.media.elemSprites[this.img].sh, //image height on the image
				Math.floor( this.x-(this.media.elemSprites[this.img].sw/2)), //position x on canvas
				Math.floor( this.y-(this.media.elemSprites[this.img].sh/2)), //position y on canvas
				this.media.elemSprites[this.img].sw, //width on canvas
				this.media.elemSprites[this.img].sh //height on canvas
		);
	}
}

Cocroach.prototype.setLife = function(life) {
	this.life = life;
}

Cocroach.prototype.update = function() {
	if (this.taken) {
		if (this.x>330 || this.x<10 || this.y<-10) {
			this.dead = true;
			//TODO
			//this.reset();
		}
		if (this.direction==1) {
			this.x+=3;
		}
		else {
			this.x-=3;
		}
		this.y-=3;
	}
	Element.prototype.update.call(this);
}

Cocroach.prototype.touch = function() {
	if (!this.taken) {
		this.nbTimesTouched++;
		if (this.nbTimesTouched>this.life-1) {
			this.taken = true;
		}
//		if (!theGame.mobile) {
			this.media.sound.play('stab');
//		}
	}
}

Cocroach.prototype.squashed = function() {
	this.img = 3;
	this.augmenter = 8;
	this.maxTimer = 1;
	this.life = 400;
	if (!theGame.mobile) {
		this.media.sound.play('squashed');
	}
}

Cocroach.prototype.take = function() {
	this.taken = true;
}

Cocroach.prototype.reset = function() {
	this.img            = 2;
	this.direction      = Math.floor(Math.random()*2+1); //1 or 2
	this.taken          = false;
	this.dead           = false;
	this.nbTimesTouched = 0;
	this.life           = Math.floor(Math.random()*5+3);
	this.maxTimer       = 6;
	Element.prototype.reset.call(this);
}

