function TutorialState(game) {
	State.call(this,game);
	this.media = this.game.media;
	this.selected        = -1;
	/* an array of Lessons
	 * When next is pressed change to next lesson
	 *
	 * Welcome new chief!
	 * Your job will be to peel and cut potatoes non-stop.
	 * Let's see for long you will be able to witstand our customers thirst for french fries.
	 *
	 *
	 * LESSON1:
	 * Only cut potatoes should be fried.
	 * You'll be penalized if you frie something else.
	 * If it happens 3 times you'll be fired.
	 *
	 *
	 * LESSON2:
	 * To peel potatoes draw a circle around them.
	 *
	 * LESSON3:
	 * To cut potatoes draw a line over them.
	 *
	 * LESSON4:
	 * To repel cocroaches hit them (3 to 10 times).
	 * NB: Do not cut or peel any cocroach.
	 *
	 * LESSON5:
	 * To take the ketchup or mustard touch it.
	 *
	 * LESSON6:
	 * To use the Ketchup combo, which will peel all the potatoes on the screen, draw this shape.
	 *
	 * LESSON7:
	 * To use the Mustard combo, which will cut all the potatoes on the screen, draw this shape.
	 *
	 * LESSON8:
	 * May the potato be with you.
	 *
	 */
	this.currentLesson = 0;
	this.lessons = [
		new Lesson0(this.game),
		new Lesson1(this.game),
		new Lesson2(this.game),
		new Lesson3(this.game),
		new Lesson4(this.game),
		new Lesson5(this.game),
		new Lesson6(this.game),
		new Lesson7(this.game),
		new Lesson8(this.game)
	];

	this.img1            = 6;
	this.img2            = 8;
	this.img3            = 10;
	this.timer           = 0;
	this.maxTimer        = 3;
}

//inheritance from State
TutorialState.prototype = new State();
TutorialState.prototype.constructor = TutorialState;


//draw on this.game.ctx        (called 60/s)
TutorialState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);

	var ctx = this.game.ctx;
	this.lessons[this.currentLesson].draw(this.game.ctx);

	ctx.drawImage( this.media.buttonSprites[1].image,
			this.media.buttonSprites[this.img1].sx, //position on the image
			this.media.buttonSprites[this.img1].sy, //position on the image
			this.media.buttonSprites[this.img1].sw, //image width on the image
			this.media.buttonSprites[this.img1].sh, //image height on the image
			89, //position x on canvas
			375, //position y on canvas
			this.media.buttonSprites[this.img1].sw, //width on canvas
			this.media.buttonSprites[this.img1].sh //height on canvas
	);
	if (this.currentLesson<this.lessons.length-1) {
		ctx.drawImage( this.media.buttonSprites[1].image,
				this.media.buttonSprites[this.img2].sx, //position on the image
				this.media.buttonSprites[this.img2].sy, //position on the image
				this.media.buttonSprites[this.img2].sw, //image width on the image
				this.media.buttonSprites[this.img2].sh, //image height on the image
				235, //position x on canvas
				375, //position y on canvas
				this.media.buttonSprites[this.img2].sw, //width on canvas
				this.media.buttonSprites[this.img2].sh //height on canvas
		);
	}
	if (this.currentLesson!=0) {
		ctx.drawImage( this.media.buttonSprites[1].image,
				this.media.buttonSprites[this.img3].sx, //position on the image
				this.media.buttonSprites[this.img3].sy, //position on the image
				this.media.buttonSprites[this.img3].sw, //image width on the image
				this.media.buttonSprites[this.img3].sh, //image height on the image
				2, //position x on canvas
				375, //position y on canvas
				this.media.buttonSprites[this.img3].sw, //width on canvas
				this.media.buttonSprites[this.img3].sh //height on canvas
		);
	}

}

//update all that is happening (called 60/s)
TutorialState.prototype.update = function(animStart) {
	this.timer ++;
	this.lessons[this.currentLesson].update();
	if (this.timer == this.maxTimer ) {
		this.timer = 0;
	}
}

//handles events recorded in this.keysDown
TutorialState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
TutorialState.prototype.pDown = function(evt) {
	// Calculate position based on offset and scale
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale
	];

	if ( (pos[1]+0.5|0)>375 &&  (pos[1]+0.5|0)<473) {
		if ( (pos[0]+0.5|0)>5 &&  (pos[0]+0.5|0)<91) {
			if (this.currentLesson!=0) {
//				if (!theGame.mobile) {
					this.media.sound.play('button');
//				}
				this.selected = 0;
				this.img3     = 11;
			}
		}
		else if ( (pos[0]+0.5|0)>95 &&  (pos[0]+0.5|0)<240) {
			this.selected = 1;
//			if (!theGame.mobile) {
				this.media.sound.play('button');
//			}
			this.img1 = 7;
		}
		else if ( (pos[0]+0.5|0)>240 &&  (pos[0]+0.5|0)<320) {
			if (this.currentLesson<this.lessons.length-1) {
//				if (!theGame.mobile) {
					this.media.sound.play('button');
//				}
				this.selected = 2;
				this.img2   = 9;
			}
		}
	}
}

TutorialState.prototype.pUp = function(evt) {
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
	this.img1            = 6;
	this.img2            = 8;
	this.img3            = 10;
	if (this.selected==1) {
		this.game.playingState = new PlayingState(this.game);
		this.game.setState(this.game.playingState);
	}
	else if (this.selected ==0) {
		this.currentLesson--;
	}
	else if (this.selected ==2){
		this.currentLesson++;
	}
	else {
	}
	this.selected = -1;

	// Draw image with rounded values
	//this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
}

TutorialState.prototype.pMove = function(evt) {
}


