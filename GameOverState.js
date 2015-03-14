function GameOverState(game) {
	State.call(this,game);
	this.pointsPositions = new Array();
	this.stars = new Sparkles(this.game.media);
	this.selected = 0;
	this.fallingpotatoes = [
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game),
		new Potato(this.game)
	];
	this.media = this.game.media;
	this.blocker = 0;
	this.maxBlocker = 70;

	for (var i=0; i<this.fallingpotatoes.length; i++) {
		this.fallingpotatoes[i].setSpeed(WeightedRand({0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05}));
	}

	this.allLetters = [
		{
			img: this.media.letterSprites[0],
			x  : 15+7,
			y  : 10,
			direction: "up"
		},
		{
			img: this.media.letterSprites[1],
			x  : 60+7,
			y  : 12,
			direction: "down"
		},
		{
			img: this.media.letterSprites[2],
			x  : 105+7,
			y  : 13,
			direction: "up"
		},
		{
			img: this.media.letterSprites[3],
			x  : 150+7,
			y  : 12,
			direction: "down"
		},
		{
			img: this.media.letterSprites[2],
			x  : 195+7,
			y  : 10,
			direction: "up"
		},
		{
			img: this.media.letterSprites[1],
			x  : 240+7,
			y  : 12,
			direction: "down"
		},
		{
			img: this.media.letterSprites[4],
			x  : 47+25,
			y  : 45+20,
			direction: "none"
		},
		{
			img: this.media.letterSprites[5],
			x  : 87+25,
			y  : 45+20,
			direction: "none"
		},
		{
			img: this.media.letterSprites[6],
			x  : 127+25,
			y  : 57+20,
			direction: "none"
		},
		{
			img: this.media.letterSprites[7],
			x  : 167+25,
			y  : 45+20,
			direction: "none"
		},
	];
	this.img1 = 0;
	this.img2 = 4;
	this.timer =0;
	this.maxTimer = 3;
}

//inheritance from State
GameOverState.prototype = new State();
GameOverState.prototype.constructor = GameOverState;


//draw on this.game.ctx        (called 60/s)
GameOverState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);

	var ctx = this.game.ctx;
	for (var i=0; i< this.fallingpotatoes.length; i++) {
		this.fallingpotatoes[i].draw(ctx);
	}
	this.stars.draw(ctx);
	this.game.ctx.fillStyle = "#59470E";

	this.game.ctx.font = "21px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText("GAME OVER!", 320/2, 170);
	this.game.ctx.fillText("CURRENT TIME: "+this.game.currentScore, 320/2, 220);
	this.game.ctx.fillText("BEST TIME: "+this.game.bestScore, 320/2, 250);



	for (var i=0; i< this.allLetters.length; i++) {
		ctx.drawImage( this.allLetters[i].img.image,
			this.allLetters[i].img.sx, //position on the image
			this.allLetters[i].img.sy, //position on the image
			this.allLetters[i].img.sw, //image width on the image
			this.allLetters[i].img.sh, //image height on the image
			Math.floor(this.allLetters[i].x), //position x on canvas
			Math.floor(this.allLetters[i].y), //position y on canvas
			this.allLetters[i].img.sw, //width on canvas
			this.allLetters[i].img.sh //height on canvas
		);
	}

	ctx.drawImage( this.media.buttonSprites[this.img1].image,
			this.media.buttonSprites[this.img1].sx, //position on the image
			this.media.buttonSprites[this.img1].sy, //position on the image
			this.media.buttonSprites[this.img1].sw, //image width on the image
			this.media.buttonSprites[this.img1].sh, //image height on the image
			15, //position x on canvas
			375, //position y on canvas
			this.media.buttonSprites[this.img1].sw, //width on canvas
			this.media.buttonSprites[this.img1].sh //height on canvas
	);
	ctx.drawImage( this.media.buttonSprites[1].image,
			this.media.buttonSprites[this.img2].sx, //position on the image
			this.media.buttonSprites[this.img2].sy, //position on the image
			this.media.buttonSprites[this.img2].sw, //image width on the image
			this.media.buttonSprites[this.img2].sh, //image height on the image
			15, //position x on canvas
			265, //position y on canvas
			this.media.buttonSprites[this.img2].sw, //width on canvas
			this.media.buttonSprites[this.img2].sh //height on canvas
	);
}
//update all that is happening (called 60/s)
GameOverState.prototype.update = function(animStart) {
	if (this.blocker<this.maxBlocker) {
		this.blocker++;
	}
	for (var i=0; i< this.fallingpotatoes.length; i++) {
		this.fallingpotatoes[i].update();
		if (this.fallingpotatoes[i].reachedEnd) {
			this.stars.putInside();
			this.fallingpotatoes[i].reset();
			this.fallingpotatoes[i].setSpeed(WeightedRand({0:0.5, 1:0.2, 2:0.15, 3:0.1, 4:0.05}));
		}
	}

	this.stars.update();
	this.timer ++;
	if (this.timer == this.maxTimer ) {
		for (var i=0; i< this.allLetters.length; i++) {
			if(this.allLetters[i].direction=="up") {
				this.allLetters[i].y-=1;
				if (this.allLetters[i].y<5) {
					this.allLetters[i].direction = "down";
				}
			}
			else if (this.allLetters[i].direction=="down") {
				this.allLetters[i].y+=1;
				if (this.allLetters[i].y>15) {
					this.allLetters[i].direction = "up";
				}
			}
		}
		this.timer = 0;
	}
}

//handles events recorded in this.keysDown
GameOverState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
GameOverState.prototype.pDown = function(evt) {
	// Calculate position based on offset and scale
	var pos = [
//				(evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
//				(evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];

	//this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
	//console.log("x:"+ (pos[0]+0.5|0)+"---- y: "+(pos[1]+0.5|0));
	if (this.blocker>=this.maxBlocker) {
		if ( (pos[0]+0.5|0)>20 &&  (pos[0]+0.5|0)<305 &&
			(pos[1]+0.5|0)>241 &&  (pos[1]+0.5|0)<340) {
			this.selected = 1;
			this.img2     = 5;
	//		if (!theGame.mobile) {
				this.media.sound.play('button');
	//		}
		}
		if ( (pos[0]+0.5|0)>20 &&  (pos[0]+0.5|0)<305 &&
				(pos[1]+0.5|0)>360 &&  (pos[1]+0.5|0)<460) {
			this.selected = 2;
			this.img1     = 2;
	//		if (!theGame.mobile) {
				this.media.sound.play('button');
	//		}
		}
		this.pointerIsDown = true;
		this.pointsPositions[0] = {
			x: pos[0]+0.5|0, 
			y: pos[1]+0.5|0
		};
	}
}

GameOverState.prototype.pUp = function(evt) {
	//if (!this.img) break;
	// Calculate position based on offset and scale
	var pos = [
//				(evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
//				(evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];
	this.lastPoint ={
		x: pos[0]+0.5|0,
		y: pos[1]+0.5|0,
	};
	this.img1     = 0;
	this.img2     = 4;

	if (this.selected==1) {
		this.game.playingState = new PlayingState(theGame);
		this.blocker = 0;
		this.game.setState(this.game.playingState);
	}
	else if (this.selected ==2) {
		this.blocker = 0;
		this.game.setState(this.game.tutorialState);
	}
	else {
	}
	this.selected = 0;

	// Draw image with rounded values
	//this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
	this.pointerIsDown = false;
}

GameOverState.prototype.pMove = function(evt) {
}


