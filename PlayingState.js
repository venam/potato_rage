function PlayingState(game) {
	State.call(this,game);
	this.precision       = 25;
	//the gesture point positions
	this.pointsPositions = new Array();
	this.lastPoint       = null;
	this.xDidntVarie     = true;
	this.yDidntVarie     = true;
	this.pointerIsDown   = false;
	this.alreadyBestScore = false;
	this.stopShowThatBest = false;
	this.showBestCount   = 45;
	this.circleNonStop   = false;

	this.somethingBad    = false;
	this.badTimer        = 0;
	this.badMaxTimer     = 15;
	this.badState        = 0;
	this.rotationAngle   = 0;
	this.numberOfPotatoes =0;

	this.stars           = new Sparkles(this.game.media);
	this.screen4         = new Screen(game,this,50, 273);
	this.screen1         = new Screen(game,this,10, 100);
	this.screen2         = new Screen(game,this,273, 273*2);
	this.screen3         = new Screen(game,this,273*2, 273*3);
	this.screens         = new Array();
	this.screens[0]      = this.screen1;
	this.screens[1]      = this.screen2; 
	this.screens[2]      = this.screen3;
	this.screens[3]      = this.screen4;
	this.time            = 0;
	this.maxTime         = 60;
	this.nbSeconds       = 0;
	this.nbMinutes       = 0;
	this.timeString      = "00:00";
	this.life            = new Life(this.game.media);
	
	this.waitingForFirstPotato = true;
	this.firstPotatoComing     = false;

	this.numberOfKetchups = 1;
	this.numberOfMustards = 1;
	this.iconImg          = 0;
	this.pauseSelected    = false;
}

//inheritance from State
PlayingState.prototype = new State();
PlayingState.prototype.constructor = PlayingState;


//draw on this.game.ctx        (called 60/s)
PlayingState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);
	this.game.ctx.rotate(this.rotationAngle);
	for (var i=0; i<this.screens.length; i++) {
		this.screens[i].draw(this.game.ctx);
	}
	this.stars.draw(this.game.ctx);
	this.game.ctx.rotate(-this.rotationAngle);
	//	this.game.ctx.fillStyle = "#59100E";
	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = "40px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.timeString, 320/2, 35);
	this.game.ctx.fillStyle = "#fdd704";
	this.game.ctx.font = "20px bit";
	this.game.ctx.fillText("M", 50, 20);
	this.game.ctx.font = "16px bit";
	this.game.ctx.fillText(this.numberOfMustards, 50, 37);
	this.game.ctx.font = "20px bit";
	this.game.ctx.fillStyle = "#a72a17";
	this.game.ctx.fillText("K", 20, 20);
	this.game.ctx.font = "16px bit";
	this.game.ctx.fillText(this.numberOfKetchups, 20, 37);

	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = "16px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.numberOfPotatoes, 320/2, 60);

	this.life.draw(this.game.ctx);

	if (this.waitingForFirstPotato) {
		var text = "GET READY!";
		if (this.firstPotatoComing) {
			text = "GO!";
		}
		this.game.ctx.fillStyle = "#59470E";
		this.game.ctx.font = "30px bit";
		this.game.ctx.textAlign="center";
		this.game.ctx.fillText(text, 320/2, 480/2);
	}
	if (this.alreadyBestScore &&! this.stopShowThatBest) {
		if (this.showBestCount>0) {
			this.game.ctx.fillStyle = "#59470E";
			this.game.ctx.font = "25px bit";
			this.game.ctx.textAlign="center";
			this.game.ctx.fillText("NEW BEST TIME", 320/2, 70+(this.showBestCount));
			this.showBestCount--;
		}
		else {
			this.stopShowThatBest = true;
		}
	}

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

}

PlayingState.prototype.updateTime = function() {
	this.time++;
	//it's been 1s
	if (this.time>this.maxTime) {
		this.nbSeconds++;
		if (!this.alreadyBestScore) {
			if ( this.game.bestMin<this.nbMinutes) {
				this.alreadyBestScore = true;
			}
			else if (this.game.bestMin==this.nbMinutes) {
				if (this.game.bestSec<this.nbSeconds) {
					this.alreadyBestScore = true;
				}
			}
		}
		if (this.nbSeconds==60) {
			this.nbMinutes++;
			this.nbSeconds = 0;
		}
		var minDisplay = this.nbMinutes;
		var secDisplay = this.nbSeconds;
		if (parseInt(this.nbMinutes/10) ==0) {
			minDisplay = "0"+minDisplay;
		}
		if (parseInt(this.nbSeconds/10)==0) {
			secDisplay = "0"+secDisplay;
		}
		this.timeString = minDisplay+":"+secDisplay;
		this.time = 0;
	}
	this.game.currentScore = this.timeString;
	if (this.alreadyBestScore) {
		this.game.bestScore = this.timeString;
		this.game.bestMin   = this.nbMinutes;
		this.game.bestSec   = this.nbSeconds;
	}
};

//update all that is happening (called 60/s)
PlayingState.prototype.update = function(animStart) {
	this.updateTime();
	this.checkBad();
	for (var i=0; i< this.screens.length; i++) {
		this.screens[i].update();
	}
	this.stars.update();
	this.life.update();
	if (this.life.numberOfLives<1) {
		//TODO Lost here
		//console.log("LOST");
		this.game.currentScore = this.timeString;
		this.game.save();
		this.game.setState(gameOverState);
	}
	if (this.waitingForFirstPotato) {
		for (var i=0; i<this.screens[0].nbPotatoes;i++) {
			if (this.screens[0].potatoes[i].y>-10 && this.screens[0].potatoes[i].y<-5) {
				this.firstPotatoComing = true;
			}
			if (this.screens[0].potatoes[i].y>-5 && this.screens[0].potatoes[i].y<3) {
				this.waitingForFirstPotato = false;
			}
		}
	}
}

PlayingState.prototype.checkBad = function() {
	if (this.somethingBad) {
		this.badTimer++;
		if (this.badTimer>this.badMaxTimer) {
			this.badTimer = 0;
			this.somethingBad = false;
			this.rotationAngle = 0;
		}
		else {
			if (this.badState ==0) {
				this.rotationAngle +=0.01;
				if (this.rotationAngle >0.02) {
					this.badState = 1;
				}
			}
			else if (this.badState==1) {
				this.rotationAngle -=0.01;
				if (this.rotationAngle<0.00) {
					this.badState = 0;
				}
			}
		}
	}
}

//handles events recorded in this.keysDown
PlayingState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
PlayingState.prototype.pDown = function(evt) {
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
		this.pauseSelected = true;
		this.iconImg = 1;
	}
	else {
		this.pointerIsDown = true;
		this.pointsPositions[0] = {
			x: pos[0]+0.5|0, 
			y: pos[1]+0.5|0
		};
	}
}

PlayingState.prototype.pUp = function(evt) {
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
		this.guessGesture();
		this.pointerIsDown = false;
	}
	else {
		if (this.pauseSelected) {
//			if (!theGame.mobile) {
				this.game.media.sound.play('button');
//			}
			this.game.setState(this.game.pauseState);
			this.pauseSelected = false;
			this.iconImg = 0;
		}
	}
}

PlayingState.prototype.pMove = function(evt) {
	//if (!this.img) break;
	// Calculate position based on offset and scale
	if (this.pointerIsDown) {
		var pos = [
		//				(evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
		//				(evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
			(evt.pageX - this.game.offset[0]) / this.game.scale,
			(evt.pageY - this.game.offset[1]) / this.game.scale];
		if (this.yDidntVarie || this.xDidntVarie) {
			var yVariation = Math.abs(this.pointsPositions[this.pointsPositions.length - 1].y - (pos[1]+0.5|0));
			var xVariation = Math.abs(this.pointsPositions[this.pointsPositions.length - 1].x-  (pos[0]+0.5|0));
			if ( xVariation>this.precision ){
				this.xDidntVarie = false ;
			}
			if ( yVariation>this.precision ) {
				this.yDidntVarie = false;
			}
		}
		else if (!this.yDidntVarie && !this.xDidntVarie) {
			//save the state of the first point
			var yVariation = this.pointsPositions[this.pointsPositions.length-1].y - (pos[1]+0.5);
			var xVariation = this.pointsPositions[this.pointsPositions.length - 1].x- (pos[0]+0.5);
			if (Math.abs(xVariation)>this.precision|| Math.abs(yVariation)>this.precision) {
				var varx = "+";
				var vary = "+";
				if (yVariation>0) {
					vary = "-";
				}
				if (xVariation>0) {
					varx = "-";
				}
				var saveIt = false;
				//first point, no need to compare with the last one
				if (this.pointsPositions.length == 1) {
					saveIt = true;
				}
				else {
					if ( vary != 
							this.pointsPositions[this.pointsPositions.length-1].vary ||
						varx != 
							this.pointsPositions[this.pointsPositions.length-1].varx){
						saveIt = true;
					}
				}
				if (saveIt) {
					this.pointsPositions[this.pointsPositions.length] = {
						x: pos[0],
						y: pos[1],
						varx: varx,
						vary: vary
					}
					if (this.pointsPositions.length==5) {
						this.circleNonStop = true;
						this.handleCircles();
					}
				}
			}
		}

		// Draw image with rounded values
		//this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
	}
}

//----GESTURES HANDLER----//
PlayingState.prototype.smallTouch = function() {
	for(var i=0; i< this.screens.length; i++) {
		this.screens[i].smallTouch(this.lastPoint, this.precision);
	}
	//console.log("This is a small touch");
}

PlayingState.prototype.horizontalSlash = function() {
	var max = 0;
	var min = 0;
	if (this.lastPoint.x> this.pointsPositions[0].x) {
		max = this.lastPoint.x;
		min = this.pointsPositions[0].x;
	}
	else {
		max = this.pointsPositions[0].x;
		min = this.lastPoint.x;
	}
	for(var i=0; i<this.screens.length; i++) {
		this.screens[i].horizontalSlash(this.lastPoint, min, max);
	}
	//console.log("This is a horizontal Slash");
}

PlayingState.prototype.verticalSlash = function() {
	var max = 0;
	var min = 0;
	if (this.lastPoint.y> this.pointsPositions[0].y) {
		max = this.lastPoint.y;
		min = this.pointsPositions[0].y;
	}
	else {
		max = this.pointsPositions[0].y;
		min = this.lastPoint.y;
	}
	for(var i=0; i< this.screens.length;i++) {
		this.screens[i].verticalSlash(this.lastPoint, min, max);
	}
	//console.log("This is a vertical Slash");
}

PlayingState.prototype.upDownUp = function() {
	//console.log("wave UP DOWN UP");
	if (this.numberOfKetchups>0) {
		for (var i=0; i<this.screens.length;i++) {
			this.screens[i].attackKetchup();
		}
		this.numberOfKetchups--;
	}
}

PlayingState.prototype.downUpDown = function() {
	//console.log("wave DOWN UP DOWN");
	if (this.numberOfMustards>0) {
		for (var i= 0; i<this.screens.length;i++) {
			this.screens[i].attackMustard();
		}
		this.numberOfMustards--;
	}
}

PlayingState.prototype.circle = function() {
	var minX = this.pointsPositions[0].x;
	var maxX = this.pointsPositions[0].x;
	var minY = this.pointsPositions[0].y;
	var maxY = this.pointsPositions[0].y;
	for (var i =1; i< this.pointsPositions.length; i++) {
		if (this.pointsPositions[i].x<minX) {
			minX = this.pointsPositions[i].x;
		}
		if (this.pointsPositions[i].x>maxX) {
			maxX = this.pointsPositions[i].x;
		}
		if (this.pointsPositions[i].y< minY) {
			minY = this.pointsPositions[i].y;
		}
		if (this.pointsPositions[i].y> maxY) {
			maxY = this.pointsPositions[i].y;
		}
	}
	for (var i= 0; i<this.screens.length; i++) {
		this.screens[i].circle(minX, maxX, minY, maxY);
	}
///console.log("CIRCLE");
}

PlayingState.prototype.handleWaves = function() {
	if ( 
		(
		this.pointsPositions[1].varx=="+" &&
		this.pointsPositions[1].vary=="-" &&
		this.pointsPositions[2].varx=="+" &&
		this.pointsPositions[2].vary=="+" &&
		this.pointsPositions[3].varx=="+" &&
		this.pointsPositions[3].vary=="-"
		)
		||
		(
		this.pointsPositions[1].varx=="-" &&
		this.pointsPositions[1].vary=="+" &&
		this.pointsPositions[2].varx=="-" &&
		this.pointsPositions[2].vary=="-" &&
		this.pointsPositions[3].varx=="-" &&
		this.pointsPositions[3].vary=="+"
		) 
	) {
		this.upDownUp();
	}
	else if ( 
		(
		this.pointsPositions[1].varx=="+" &&
		this.pointsPositions[1].vary=="+" &&
		this.pointsPositions[2].varx=="+" &&
		this.pointsPositions[2].vary=="-" &&
		this.pointsPositions[3].varx=="+" &&
		this.pointsPositions[3].vary=="+"
		)
		||
		(
		this.pointsPositions[1].varx=="-" &&
		this.pointsPositions[1].vary=="-" &&
		this.pointsPositions[2].varx=="-" &&
		this.pointsPositions[2].vary=="+" &&
		this.pointsPositions[3].varx=="-" &&
		this.pointsPositions[3].vary=="-"
		) 
	) {
		this.downUpDown();
	}

}

PlayingState.prototype.handleCircles = function() {
	var f = [
		{
			varx: "+",
			vary: "-"
		},
		{
			varx: "+" ,
			vary: "+"
		},
		{
			varx: "-",
			vary: "+"
		},
		{
			varx: "-",
			vary: "-"
		}
	];
	var f2 = [
		{
			varx: "-",
			vary: "+"
		},
		{
			varx: "+" ,
			vary: "+"
		},
		{
			varx: "+",
			vary: "-"
		},
		{
			varx: "-",
			vary: "-"
		}
	];
	if (
		(
		this.pointsPositions[1].varx== f[0].varx &&
		this.pointsPositions[1].vary== f[0].vary &&
		this.pointsPositions[2].varx== f[1].varx &&
		this.pointsPositions[2].vary== f[1].vary &&
		this.pointsPositions[3].varx== f[2].varx &&
		this.pointsPositions[3].vary== f[2].vary &&
		this.pointsPositions[4].varx== f[3].varx &&
		this.pointsPositions[4].vary== f[3].vary
		)
		||
		(
		this.pointsPositions[1].varx== f[1].varx &&
		this.pointsPositions[1].vary== f[1].vary &&
		this.pointsPositions[2].varx== f[2].varx &&
		this.pointsPositions[2].vary== f[2].vary &&
		this.pointsPositions[3].varx== f[3].varx &&
		this.pointsPositions[3].vary== f[3].vary &&
		this.pointsPositions[4].varx== f[0].varx &&
		this.pointsPositions[4].vary== f[0].vary
		)
		||
		(
		this.pointsPositions[1].varx== f[2].varx &&
		this.pointsPositions[1].vary== f[2].vary &&
		this.pointsPositions[2].varx== f[3].varx &&
		this.pointsPositions[2].vary== f[3].vary &&
		this.pointsPositions[3].varx== f[0].varx &&
		this.pointsPositions[3].vary== f[0].vary &&
		this.pointsPositions[4].varx== f[1].varx &&
		this.pointsPositions[4].vary== f[1].vary
		)
		||
		(
		this.pointsPositions[1].varx== f[3].varx &&
		this.pointsPositions[1].vary== f[3].vary &&
		this.pointsPositions[2].varx== f[0].varx &&
		this.pointsPositions[2].vary== f[0].vary &&
		this.pointsPositions[3].varx== f[1].varx &&
		this.pointsPositions[3].vary== f[1].vary &&
		this.pointsPositions[4].varx== f[2].varx &&
		this.pointsPositions[4].vary== f[2].vary
		)
	) {
		this.circle();
	}
	if (
	(
	this.pointsPositions[1].varx== f2[0].varx &&
	this.pointsPositions[1].vary== f2[0].vary &&
	this.pointsPositions[2].varx== f2[1].varx &&
	this.pointsPositions[2].vary== f2[1].vary &&
	this.pointsPositions[3].varx== f2[2].varx &&
	this.pointsPositions[3].vary== f2[2].vary &&
	this.pointsPositions[4].varx== f2[3].varx &&
	this.pointsPositions[4].vary== f2[3].vary
	)
	||
	(
	this.pointsPositions[1].varx== f2[1].varx &&
	this.pointsPositions[1].vary== f2[1].vary &&
	this.pointsPositions[2].varx== f2[2].varx &&
	this.pointsPositions[2].vary== f2[2].vary &&
	this.pointsPositions[3].varx== f2[3].varx &&
	this.pointsPositions[3].vary== f2[3].vary &&
	this.pointsPositions[4].varx== f2[0].varx &&
	this.pointsPositions[4].vary== f2[0].vary
	)
	||
	(
	this.pointsPositions[1].varx== f2[2].varx &&
	this.pointsPositions[1].vary== f2[2].vary &&
	this.pointsPositions[2].varx== f2[3].varx &&
	this.pointsPositions[2].vary== f2[3].vary &&
	this.pointsPositions[3].varx== f2[0].varx &&
	this.pointsPositions[3].vary== f2[0].vary &&
	this.pointsPositions[4].varx== f2[1].varx &&
	this.pointsPositions[4].vary== f2[1].vary
	)
	||
	(
	this.pointsPositions[1].varx== f2[3].varx &&
	this.pointsPositions[1].vary== f2[3].vary &&
	this.pointsPositions[2].varx== f2[0].varx &&
	this.pointsPositions[2].vary== f2[0].vary &&
	this.pointsPositions[3].varx== f2[1].varx &&
	this.pointsPositions[3].vary== f2[1].vary &&
	this.pointsPositions[4].varx== f2[2].varx &&
	this.pointsPositions[4].vary== f2[2].vary
	)

	) {
		this.circle();
	}
	if (this.circleNonStop) {
		this.pointsPositions[0].x = this.pointsPositions[this.pointsPositions.length-1].x;
		this.pointsPositions[0].y = this.pointsPositions[this.pointsPositions.length-1].y;
		for (var i=1; i<this.pointsPositions.length; i++) {
			this.pointsPositions[i] = null;
		}
		this.pointsPositions.length = 1;
	}
	else {
		this.pointsPositions = new Array();
	}
	this.xDidntVarie = true;
	this.yDidntVarie = true;
	this.lastPoint = null;
}

PlayingState.prototype.handleAdvGestures = function() {
	//waves
	if (this.pointsPositions.length==4) {
		this.handleWaves();
	}
	//it might be a circle
	else if (this.pointsPositions.length==5) {
		this.handleCircles();
	}
	else {
		//console.log("This is a diagonale slash");
		var result = cramerResolution(this.pointsPositions[0].x, 1, this.lastPoint.x ,1 , this.pointsPositions[0].y, this.lastPoint.y);
		var minX;
		var maxX;
		var y;
		if (this.lastPoint.x< this.pointsPositions[0].x) {
			minX = this.lastPoint.x;
			maxX = this.pointsPositions[0].x;
		}
		else {
			minX = this.pointsPositions[0].x;
			maxX = this.lastPoint.x;
		}

		for (var i=minX; i< maxX+2; i+=5) {
			y = linearEquation(i, result.x, result.y);
			for (var j=0; j<this.screens.length; j++) {
				this.screens[j].diagonalSlash(i,y,this.precision);
			}
		}
	}
}

PlayingState.prototype.guessGesture = function() {
	//this one isn't logic because the line can return to the same point again
	if (this.yDidntVarie) {
		if (this.xDidntVarie) {
			this.smallTouch();
		}
		else {
			this.horizontalSlash();
		}
	}
	else  {
		if (this.xDidntVarie) {
			this.verticalSlash();
		}
		else  {
			//this is poop something else not known
			if(this.pointsPositions.length>7) {
				//console.log("This is something else");
			}
			else {
				this.handleAdvGestures();
			}
		}
	}
	this.xDidntVarie = true;
	this.yDidntVarie = true;
	this.pointsPositions = new Array();
	this.lastPoint = null;
}



