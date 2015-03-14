function PauseState(game) {
	State.call(this,game);
	this.iconImg          = 2;
	this.pauseSelected    = false;
	this.text             = "PAUSE";
	this.willPlay         = false;
	this.willQuit         = false;
	this.counter          = 3;
	this.waiter           = 0;
	this.maxWaiter        = 60;
	this.backToTutImg     = 6;
}

//inheritance from State
PauseState.prototype = new State();
PauseState.prototype.constructor = PauseState;


//draw on this.game.ctx        (called 60/s)
PauseState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);

	this.game.ctx.rotate(this.rotationAngle);
	for (var i=0; i<this.game.playingState.screens.length; i++) {
		this.game.playingState.screens[i].draw(this.game.ctx);
	}
	this.game.playingState.stars.draw(this.game.ctx);
	this.game.ctx.rotate(-this.rotationAngle);
	//	this.game.ctx.fillStyle = "#59100E";
	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = "40px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.game.playingState.timeString, 320/2, 35);
	this.game.ctx.fillStyle = "#fdd704";
	this.game.ctx.font = "20px bit";
	this.game.ctx.fillText("M", 50, 20);
	this.game.ctx.font = "16px bit";
	this.game.ctx.fillText(this.game.playingState.numberOfMustards, 50, 37);
	this.game.ctx.font = "20px bit";
	this.game.ctx.fillStyle = "#a72a17";
	this.game.ctx.fillText("K", 20, 20);
	this.game.ctx.font = "16px bit";
	this.game.ctx.fillText(this.game.playingState.numberOfKetchups, 20, 37);

	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = "16px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.game.playingState.numberOfPotatoes, 320/2, 60);

	this.game.playingState.life.draw(this.game.ctx);

	if (!this.willPlay) {
		this.game.ctx.drawImage( this.game.media.iconSprites[this.iconImg].image,
				this.game.media.iconSprites[this.iconImg].sx, //position on the image
				this.game.media.iconSprites[this.iconImg].sy, //position on the image
				this.game.media.iconSprites[this.iconImg].sw, //image width on the image
				this.game.media.iconSprites[this.iconImg].sh, //image height on the image
				3, //position x on canvas
				425, //position y on canvas
				this.game.media.iconSprites[this.iconImg].sw, //width on canvas
				this.game.media.iconSprites[this.iconImg].sh //height on canvas
		);
		this.game.ctx.fillStyle = "#59470E";
		this.game.ctx.font = "17px bit";
		this.game.ctx.textAlign="left";
		this.game.ctx.fillText("CONTINUE", 55, 455);

		this.game.ctx.drawImage( this.game.media.iconSprites[this.backToTutImg].image,
				this.game.media.iconSprites[this.backToTutImg].sx, //position on the image
				this.game.media.iconSprites[this.backToTutImg].sy, //position on the image
				this.game.media.iconSprites[this.backToTutImg].sw, //image width on the image
				this.game.media.iconSprites[this.backToTutImg].sh, //image height on the image
				3, //position x on canvas
				355, //position y on canvas
				this.game.media.iconSprites[this.backToTutImg].sw, //width on canvas
				this.game.media.iconSprites[this.backToTutImg].sh //height on canvas
		);
		this.game.ctx.fillStyle = "#59470E";
		this.game.ctx.font = "17px bit";
		this.game.ctx.textAlign="center";
		this.game.ctx.fillText("QUIT & GO TO TUTORIAL", 185, 385);
	}
	this.game.ctx.fillStyle = "#59470E";
	this.game.ctx.font = "30px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.text, 320/2, 480/2);


}

//update all that is happening (called 60/s)
PauseState.prototype.update = function(animStart) {
	this.text = "PAUSE";
	if (this.willPlay&& this.counter>0) {
		this.text = this.counter;
		if (this.waiter> this.maxWaiter) {
			this.counter--;
			this.waiter = 0;
		}
		this.waiter ++;
	}
	if (this.willPlay && this.counter<=0) {
		this.willPlay = false;
		this.counter = 3;
		this.game.setState(this.game.playingState);
	}
}

//handles events recorded in this.keysDown
PauseState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
PauseState.prototype.pDown = function(evt) {
	// Canvas clicked
	//if (!this.img) break;
	// Calculate position based on offset and scale
	var pos = [
//				(evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
//				(evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];

	// Draw image with rounded values
	//this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
	//console.log("x:"+(pos[0]+0.5|0)+"  y:"+(pos[1]+0.5|0));
	if ( 
			(pos[0]+0.5|0)>5 &&  (pos[0]+0.5|0)<50 &&
			(pos[1]+0.5|0)>425 && (pos[1]+0.5|0)<480 ) {
		if (!this.willPlay) {
			this.pauseSelected = true;
			this.iconImg = 3;
		}
	}
	else if ( 
			(pos[0]+0.5|0)>5 &&  (pos[0]+0.5|0)<50 &&
			(pos[1]+0.5|0)>350 && (pos[1]+0.5|0)<405 ) {
		if (!this.willPlay) {
			this.backToTutImg = 7;
			this.willQuit = true;
		}
	}
	else {
		this.pointerIsDown = true;
	}
}

PauseState.prototype.pUp = function(evt) {
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

	// Draw image with rounded values
	//this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
	if (this.pointerIsDown) {
		this.pointerIsDown = false;
	}
	else {
		if (this.pauseSelected) {
//			if (!theGame.mobile) {
				this.game.media.sound.play('button');
//			}
			this.willPlay = true;
			this.pauseSelected = false;
			this.iconImg = 2;
		}
		else if (this.willQuit) {
//			if (!theGame.mobile) {
				this.game.media.sound.play('button');
//			}
			this.backToTutImg = 6;
			this.willQuit = false;
			this.game.setState(this.game.tutorialState);
		}
	}
}

PauseState.prototype.pMove = function(evt) {
	//if (!this.img) break;
	// Calculate position based on offset and scale
}

