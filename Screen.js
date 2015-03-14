function Screen(game,playing,minY, maxY) {
	this.game            = game;
	this.playingState    = playing;
	this.mustards        = new Array();
	this.ketchups        = new Array();
	this.potatoes        = new Array();
	this.cocroaches      = new Array();
	this.probPotato      = {0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05};
	this.probMustard     = {0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05};
	this.probCocroaches  = {0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05};
	this.probKetchup     = {0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05};
	//depending on the level it will augment the difficulty
	//or might just put a limit...
	this.level           = 1;
	this.nbPotatoes      = 5;
	this.maxNbPotatoes   = 20;
	this.nbCocroaches    = 0;
	this.maxNbCocroaches = 7;
	this.nbKetchup       = 0;
	this.maxNbKetchup    = 3;
	this.nbMustard       = 0;
	this.maxNbMustard    = 3;
	//check if all objects are down or not
	this.allIsDown       = false;
	//the screen number
	this.number          = 0;
	//the delimitation of the screen
	this.minX            = 30;
	this.maxX            = 270;
	this.minY            = minY;
	this.maxY            = maxY;
	this.notFirsTime     = false;
	this.wasSet          = false;
	this.startedUsingLevels = false;

	this.potatoLevel     = 0;
	this.cocroachLevel   = 0;

	this.fillArrays();
	this.reset();
}

Screen.prototype.fillArrays = function() {
	for (var i=0; i<this.maxNbPotatoes; i++) {
		this.potatoes[i] = new Potato(this.game);
		this.potatoes[i].minX = this.minX;
		this.potatoes[i].maxX = this.maxX;
		this.potatoes[i].minY = this.minY;
		this.potatoes[i].maxY = this.maxY;
		this.potatoes[i].reset();
	}
	for (var i=0; i<this.maxNbCocroaches; i++) {
		this.cocroaches[i] = new Cocroach(this.game.media);
		this.cocroaches[i].minX = this.minX;
		this.cocroaches[i].maxX = this.maxX;
		this.cocroaches[i].minY = this.minY;
		this.cocroaches[i].maxY = this.maxY;
		this.cocroaches[i].reset();
	}
	for (var i=0; i<this.maxNbKetchup; i++) {
		this.ketchups[i] = new Ketchup(this.playingState,this.game.media);
		this.ketchups[i].minX = this.minX;
		this.ketchups[i].maxX = this.maxX;
		this.ketchups[i].minY = this.minY;
		this.ketchups[i].maxY = this.maxY;
		this.ketchups[i].reset();
	}
	for (var i=0; i<this.maxNbMustard; i++) {
		this.mustards[i] = new Mustard(this.playingState,this.game.media);
		this.mustards[i].minX = this.minX;
		this.mustards[i].maxX = this.maxX;
		this.mustards[i].minY = this.minY;
		this.mustards[i].maxY = this.maxY;
		this.mustards[i].reset();
	}
}

Screen.prototype.attackKetchup = function() {
	for (var i=0; i<this.nbPotatoes; i++) {
		if ( this.potatoes[i].y<500 && this.potatoes[i].y>1) {
			this.potatoes[i].tryPeel();
		}
	}
}

Screen.prototype.attackMustard = function() {
	for (var i=0; i<this.nbPotatoes; i++) {
		if ( this.potatoes[i].y<500 && this.potatoes[i].y>1) {
			this.potatoes[i].tryCut();
		}
	}
}

Screen.prototype.setMinMax = function() {
	for (var i=0; i<this.maxNbPotatoes; i++) {
		this.potatoes[i].minY = this.minY;
		this.potatoes[i].maxY = this.maxY;
	}
	for (var i=0; i<this.maxNbCocroaches; i++) {
		this.cocroaches[i].minY = this.minY;
		this.cocroaches[i].maxY = this.maxY;
	}
	for (var i=0; i<this.maxNbKetchup; i++) {
		this.ketchups[i].minY = this.minY;
		this.ketchups[i].maxY = this.maxY;
	}
	for (var i=0; i<this.maxNbMustard; i++) {
		this.mustards[i].minY = this.minY;
		this.mustards[i].maxY = this.maxY;
	}
}

Screen.prototype.update = function() {
	for (var i=0; i< this.nbPotatoes; i++) {
		this.potatoes[i].update();
		if (this.potatoes[i].reachedEnd) {
			if (!this.potatoes[i].alreadyReachedEnd) {
				this.playingState.stars.putInside();
				if (!this.potatoes[i].cut) {
					this.somethingBad();
				}
				this.potatoes[i].alreadyReachedEnd = true;
			}
			//TODO
			//this.potatoes[i].reset();
			//this.potatoes[i].setSpeed(WeightedRand({0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05}));
		}
	}
	for (var i=0; i< this.nbKetchup; i++) {
		this.ketchups[i].update();
		if (this.ketchups[i].reachedEnd) {
			if(!this.ketchups[i].alreadyReachedEnd){
				this.somethingBad();
				this.ketchups[i].alreadyReachedEnd = true;
			}
			//TODO
			//this.ketchups[i].reset();
		}
	}
	for (var i=0; i< this.nbCocroaches; i++) {
		this.cocroaches[i].update();
		if (this.cocroaches[i].reachedEnd) {
			if(!this.cocroaches[i].alreadyReachedEnd) {
				this.somethingBad();
				this.cocroaches[i].alreadyReachedEnd = true;
			}
			//TODO
			//this.cocroachTest.reset();
		}
	}
	for (var i=0; i< this.nbMustard; i++) {
		this.mustards[i].update();
		if (this.mustards[i].reachedEnd) {
			if (!this.mustards[i].alreadyReachedEnd) {
				this.somethingBad();
				this.mustards[i].alreadyReachedEnd = true;
			}
			//TODO
			//this.mustardTest.reset();
		}
	}
	if(this.checkAllDown() ) {
		this.reset();
	}
}

Screen.prototype.somethingBad = function() {
	this.playingState.somethingBad = true;
	this.playingState.badTimer     = 0;
	this.playingState.badState     = 0;
	if (this.playingState.life.numberOfLives>0) {
		this.playingState.life.diminish();
	}
}

Screen.prototype.draw   = function(ctx) {
	for (var i=0; i< this.nbPotatoes; i++) {
		this.potatoes[i].draw(ctx);
	}
	for (var i=0; i< this.nbCocroaches; i++) {
		this.cocroaches[i].draw(ctx);
	}
	for (var i=0; i< this.nbKetchup; i++) {
		this.ketchups[i].draw(ctx);
	}
	for (var i=0; i< this.nbMustard; i++) {
		this.mustards[i].draw(ctx);
	}
}

Screen.prototype.checkAllDown = function() {
	for (var i=0; i< this.nbPotatoes; i++) {
		if (!this.potatoes[i].reachedEnd){
			return false;
		}
	}
	for (var i=0; i< this.nbCocroaches; i++) {
		if (!( this.cocroaches[i].reachedEnd||this.cocroaches[i].dead) ) {
			return false;
		}
	}
	for (var i=0; i< this.nbKetchup; i++) {
		if (!(this.ketchups[i].reachedEnd||this.ketchups[i].stopShrink) ) {
			return false;
		}
	}
	for (var i=0; i< this.nbMustard; i++) {
		if (!(this.mustards[i].reachedEnd||this.mustards[i].stopShrink)) {
			return false;
		}
	}
	return true;
}

Screen.prototype.increasePotatoLevel = function() {
	if (this.potatoLevel<7) {
		this.potatoLevel++;
	}
	if (this.potatoLevel==1) {
		var k  = specialRand(0.2,0.4);
		var k2 = 1-k-0.4;
		var k3 = specialRand(0.2,0.3);
		var k4 = 1-k3-k-k2-0.05;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
	}
	else if (this.potatoLevel==2) {
		var k  = specialRand(0.1,0.3);
		var k2 = 1-k-0.5;
		var k3 = specialRand(0.3,0.4);
		var k4 = 1-k3-k-k2-0.05;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
	}
	else if (this.potatoLevel==3) {
		var k  = specialRand(0.1,0.2);
		var k2 = 1-k-0.5;
		var k3 = specialRand(0.3,0.4);
		var k4 = 1-k3-k-k2-0.05;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
	}
	else if (this.potatoLevel==4) {
		var k  = specialRand(0.1,0.15);
		var k2 = 1-k-0.6;
		var k3 = specialRand(0.2,0.3);
		var k4 = 1-k3-k-k2-0.1;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.1};
	}
	else if (this.potatoLevel==5) {
		var k  = specialRand(0.1,0.12);
		var k2 = 1-k-0.7;
		var k3 = specialRand(0.2,0.4);
		var k4 = 1-k3-k-k2-0.2;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.2};
	}
	else if (this.potatoLevel==6) {
		var k  = specialRand(0.05,0.1);
		var k2 = 1-k-0.8;
		var k3 = specialRand(0.3,0.35);
		var k4 = 1-k3-k-k2-0.3;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.3};
	}
	else if (this.potatoLevel==7) {
		var k  = specialRand(0.05,0.06);
		var k2 = 1-k-0.9;
		var k3 = specialRand(0.3,0.35);
		var k4 = 1-k3-k-k2-0.4;
		this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.4};
	}
}


Screen.prototype.increaseCocroachLevel = function() {
	if (this.cocroachLevel<5) {
		this.cocroachLevel++;
	}
	if (this.cocroachLevel==1) {
		var k  = specialRand(0.2,0.4);
		var k2 = 1-k-0.4;
		var k3 = specialRand(0.2,0.3);
		var k4 = 1-k3-k-k2-0.05;
		this.probCocroaches     = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
	}
	else if (this.cocroachLevel==2) {
		var k  = specialRand(0.1,0.3);
		var k2 = 1-k-0.5;
		var k3 = specialRand(0.3,0.4);
		var k4 = 1-k3-k-k2-0.05;
		this.probCocroaches      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
	}
	else if (this.cocroachLevel==3) {
		var k  = specialRand(0.1,0.2);
		var k2 = 1-k-0.5;
		var k3 = specialRand(0.3,0.4);
		var k4 = 1-k3-k-k2-0.05;
		this.probCocroaches      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
	}
	else if (this.cocroachLevel==4) {
		var k  = specialRand(0.1,0.15);
		var k2 = 1-k-0.6;
		var k3 = specialRand(0.2,0.3);
		var k4 = 1-k3-k-k2-0.1;
		this.probCocroaches      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.1};
	}
	else if (this.cocroachLevel==5) {
		var k  = specialRand(0.1,0.12);
		var k2 = 1-k-0.7;
		var k3 = specialRand(0.2,0.4);
		var k4 = 1-k3-k-k2-0.2;
		this.probCocroaches      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.2};
	}
}

Screen.prototype.mixPotatoes = function() {
	if (this.nbPotatoes<this.maxNbPotatoes) {
		//every level increase by 2 potatoes until it reaches the max
		this.nbPotatoes+=4;
		if (this.nbPotatoes>this.maxNbPotatoes) {
			this.nbPotatoes=this.maxNbPotatoes;
		}
		if (this.nbPotatoes>this.maxNbPotatoes-10) {
			//at 10 potatoes play a bit with the speed
			var r = Math.floor(Math.random()*5);
			if (r==0 && this.potatoLevel<2) {
				this.increasePotatoLevel();
				this.startedUsingLevels = true;
			}
			else {
				if (!this.startedUsingLevels) {
					var k  = specialRand(0.3,0.5);
					var k2 = 1-k-0.2;
					var k3 = specialRand(0.05,0.1); //it leave 0.2
					var k4 = 1-k3-k2-k-0.05;
					this.probPotato      = {0:k, 1:k2, 2:k3, 3:k4, 4:0.05};
				}
			}
		}
	}
	else {
		//starts to play with the speed a bit
		var r = Math.floor(Math.random()*3);
		if (r==0) {
			this.increasePotatoLevel();
		}
	}
}

Screen.prototype.mixKetchMustrd = function() {
	var r = Math.floor(Math.random()*5);
	this.nbKetchup = 0;
	this.nbMustard = 0;
	if (r==0) {
		if (Math.floor(Math.random()*3) ==0) {
			this.nbKetchup=1;
		}
		else if (Math.floor(Math.random()*3)==0) {
			this.nbMustard=1;
		}
		if (Math.floor(Math.random()*5)==0) {
			this.nbKetchup++;
			if (Math.floor(Math.random()*5)==0) {
				this.nbMustard++;
			}
		}
		if (Math.floor(Math.random()*5)==0) {
			this.nbMustard++;
			if (Math.floor(Math.random()*5)==0) {
				this.nbKetchup++;
			}
		}
	}
}

Screen.prototype.mixCocroaches = function() {
	var r = Math.floor(Math.random()*6);
	if (r==0) {
		this.increaseCocroachLevel();
	}
	if (Math.random()>0.5 && this.nbCocroaches< this.maxNbCocroaches) {
		this.nbCocroaches++;
	}
}

Screen.prototype.reset  = function() {
	//console.log("RESET");
	if (this.notFirsTime) {
		//here make it TODO 
		if (!this.wasSet) {
			this.minY = 273;
			this.maxY = 273*2;
			this.setMinMax();
			this.wasSet = true;
		}
		this.mixCocroaches();
		this.mixPotatoes();
		this.mixKetchMustrd();
		for (var i=0; i<this.nbPotatoes; i++) {
			this.potatoes[i].reset();
			this.potatoes[i].setSpeed(WeightedRand(this.probPotato));
		}
		for (var i=0; i<this.nbMustard; i++) {
			this.mustards[i].reset();
			this.mustards[i].setSpeed(WeightedRand(this.probMustard));
		}
		for (var i=0; i<this.nbKetchup; i++) {
			this.ketchups[i].reset();
			this.ketchups[i].setSpeed(WeightedRand(this.probKetchup));
		}
		for (var i=0; i<this.nbCocroaches; i++) {
			this.cocroaches[i].reset();
			this.cocroaches[i].setSpeed(WeightedRand(this.probCocroaches));
		}
	}
	else {
		this.notFirsTime = true;
	}
}

Screen.prototype.diagonalSlash = function(x, y, precision) {
	for (var i=0; i<this.nbPotatoes; i++ ) {
		if ( this.potatoes[i].y<500 && this.potatoes[i].y>1) {
			if (
					Math.abs(this.potatoes[i].x -x)<precision&&
					Math.abs(this.potatoes[i].y -y)<precision){
				this.potatoes[i].tryCut();
			}
		}
	}

}

Screen.prototype.horizontalSlash = function(lastPoint, min, max) {
	for (var i=0; i<this.nbPotatoes; i++) {
		if ( this.potatoes[i].y<500 && this.potatoes[i].y>1) {
			if (
					Math.abs(lastPoint.y - this.potatoes[i].y)<15 &&
					this.potatoes[i].x < max &&
					this.potatoes[i].x > min) {
				this.potatoes[i].tryCut();
			}
		}
	}
	for (var i=0; i<this.nbCocroaches; i++) {
		if ( this.cocroaches[i].y<500 && this.cocroaches[i].y>1) {
			if (
					Math.abs(lastPoint.y - this.cocroaches[i].y)<15 &&
					this.cocroaches[i].x < max &&
					this.cocroaches[i].x > min) {
				this.cocroaches[i].squashed();
			}
		}
	}
}

Screen.prototype.verticalSlash = function(lastPoint, min, max) {
	for (var i=0; i< this.nbPotatoes; i++) {
		if ( this.potatoes[i].y<500 && this.potatoes[i].y>1) {
			if (
					Math.abs(lastPoint.x - this.potatoes[i].x)<15 &&
					this.potatoes[i].y < max &&
					this.potatoes[i].y > min) {
				this.potatoes[i].tryCut();
			}
		}
	}
	for (var i=0; i<this.nbCocroaches; i++) {
		if ( this.cocroaches[i].y<500 && this.cocroaches[i].y>1) {
			if (
					Math.abs(lastPoint.x - this.cocroaches[i].x)<15 &&
					this.cocroaches[i].y < max &&
					this.cocroaches[i].y > min) {
				this.cocroaches[i].squashed();
			}
		}
	}
}

Screen.prototype.circle = function(minX, maxX, minY, maxY) {
	for (var i=0; i< this.nbPotatoes; i++) {
		if ( this.potatoes[i].y<500 && this.potatoes[i].y>1) {
			if ( 
					this.potatoes[i].y< maxY &&
					this.potatoes[i].y> minY &&
					this.potatoes[i].x< maxX &&
					this.potatoes[i].x> minX ) {
				this.potatoes[i].tryPeel();
			}
		}
	}
	for (var i=0; i<this.nbCocroaches; i++) {
		if ( this.cocroaches[i].y<500 && this.cocroaches[i].y>1) {
			if ( 
					this.cocroaches[i].y< maxY &&
					this.cocroaches[i].y> minY &&
					this.cocroaches[i].x< maxX &&
					this.cocroaches[i].x> minX ) {
				this.cocroaches[i].squashed();
			}
		}
	}

}


Screen.prototype.smallTouch = function(lastPoint, precision) {
	for (var i=0; i<this.nbKetchup; i++ ) {
		if ( this.ketchups[i].y<500 && this.ketchups[i].y>0) {
			if (
					Math.abs(this.ketchups[i].x -lastPoint.x)<precision&&
					Math.abs(this.ketchups[i].y -lastPoint.y)<precision){
				this.ketchups[i].take();
			}
		}
	}
	for (var i=0; i<this.nbMustard; i++ ) {
		if ( this.mustards[i].y<500 && this.mustards[i].y>1) {
			if (
					Math.abs(this.mustards[i].x -lastPoint.x)<precision&&
					Math.abs(this.mustards[i].y -lastPoint.y)<precision){
				this.mustards[i].take();
			}
		}
	}
	for (var i=0; i<this.nbCocroaches; i++ ) {
		if ( this.cocroaches[i].y<500 && this.cocroaches[i].y>1) {
			if (
					Math.abs(this.cocroaches[i].x -lastPoint.x)<precision&&
					Math.abs(this.cocroaches[i].y -lastPoint.y)<precision){
				this.cocroaches[i].touch();
			}
		}
	}
}


