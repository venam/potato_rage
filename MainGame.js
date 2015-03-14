//wrapper for requestAnimFrame that works on multiple Browsers
//window.requestAnimFrame = (function(){
//	return  window.requestAnimationFrame       || 
//			window.webkitRequestAnimationFrame || 
//			window.mozRequestAnimationFrame    || 
//			window.oRequestAnimationFrame      || 
//			window.msRequestAnimationFrame     || 
//			function(/* function */ callback, /* DOMElement */ element){
//				window.setTimeout(callback, 1000 / 60);
//			};
//})();

'use strict';

// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik MÃ¶ller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen SlaviÄ, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());


/*---- MainGame Class ----*/
function MainGame() {
	this.bestScore    = "00:00";
	this.currentScore = "00:00";
	this.load();
	var tmp = convertStringToMinSec(this.bestScore);
	this.bestMin = tmp.min;
	this.bestSec = tmp.sec;
	//canvas used everywhere
	this.element = document.getElementById('game');
	this.canvas = this.element.firstElementChild;
	this.canvas.style.pointerEvents = "none";

	// Original content size
	this.content = [this.canvas.width, this.canvas.height];

	// Setting up the canvas
	this.ctx = this.canvas.getContext('2d');
	this.ctx.webkitImageSmoothingEnabled = false;
	this.ctx.mozImageSmoothingEnabled = false;
	this.ctx.imageSmoothingEnabled = false;
	this.canvasWidth        = this.ctx.canvas.width;
	this.canvasHeight       = this.ctx.canvas.height;
	//ctx.fillStyle = '#6f8ed9';
	//ctx.fillRect(0, 0, this.content[0], this.content[1]);

	// Create image on click
	this.element.addEventListener('pointerdown', this, false);
	this.element.addEventListener('pointerup', this, false);
	this.element.addEventListener('pointermove', this, false);

	// Reflow canvas size/margin on resize
	window.addEventListener('resize', this, false);
	this.reflow();
	this.reflow();

	this.mobile             = false;
	this.mobileCheck();
	this.media         = new Media(this);
	this.playingState  = new PlayingState(this);
	this.menuState     = new MenuState(this);
	this.gameOverState = new GameOverState(this);
	this.tutorialState = new TutorialState(this);
	this.pauseState    = new PauseState(this);
	this.gameState     = this.menuState;
}

MainGame.prototype.mobileCheck = function() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLocaleLowerCase()) ){
		this.mobile = true;
	}
}

MainGame.prototype.reflow = function() {
	// 2d vectors to store various sizes
	var browser = [
		window.innerWidth, 
		window.innerHeight
	];
	// Minimum scale to fit whole canvas
	var scale = this.scale = Math.min(
		browser[0] / this.content[0],
		browser[1] / this.content[1]);
	// Scaled content size
	var size = [
		this.content[0] * scale, this.content[1] * scale];
	// Offset from top/left
	var offset = this.offset = [
		(browser[0] - size[0]) / 2, (browser[1] - size[1]) / 2];

	// Apply CSS transform
	var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
	this.element.style.transform = rule;
	this.element.style.webkitTransform = rule;
}

MainGame.prototype.handleEvent = function(evt) {
	switch (evt.type) {
		case 'resize':
			// Window resized
			this.reflow();
			break;
		case 'pointerdown':
			this.gameState.pDown(evt);
			break;
		case 'pointerup':
			this.gameState.pUp(evt);
			break;
		case 'pointermove':
			this.gameState.pMove(evt);
			break;
		case 'load':
			// Image loaded
			//this.img = this.loader;
			break;
	}
}

//change the game state
MainGame.prototype.setState = function (state) {
	if (state == this.playingState) {
		this.menuState = null;
	}
	this.gameState = state;
}

MainGame.prototype.load = function() {
	//level will be an array later on
	if (localStorage){
		var saves = localStorage.getItem("bestTime");
		if (saves == null)  {
			return;
		}
		else {
			this.bestScore = saves;
		}
	}
	return null;
}

MainGame.prototype.save = function() {
	localStorage.setItem("bestTime", this.bestScore);
}


//the game loop that runs 60/s
MainGame.prototype.run = function () {
	requestAnimationFrame(this.loop.bind(this));
}

MainGame.prototype.loop = function(animStart) {
	requestAnimationFrame(this.loop.bind(this));
	this.gameState.update(animStart);
	this.gameState.draw();
}
/*---- End of MainGame ----*/

/*---- Global vars ----*/
function convertStringToMinSec(str) {
	var minStr = "";
	var secStr = "";
	var minInt = 0;
	var secInt = 0;
	var pos    = 0;
	for (pos = 0; pos<str.length; pos++) {
		if (str[pos]==":") {
			break;
		}
		minStr+=str[pos];
	}
	minInt = parseInt(minStr);
	for(var i=(pos+1); i<str.length;i++) {
		secStr +=str[i];
	}
	secInt = parseInt(secStr);
	return { min: minInt, sec: secInt};
}

var theGame   = new MainGame();

//all Events
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

/*
window.addEventListener("pointerdown", function(e) {
}, false);
window.addEventListener("pointerup", function(e) {
}, false);
window.addEventListener("pointermove", function(e) {
}, false);
*/

/*---- Make it run ----*/
//load media then run
var loadingPos = [
	{ 
		l: "L",
		x: 100,
		y: 240,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
	{ 
		l: "O",
		x: 120,
		y: 245,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
	{ 
		l: "A",
		x: 140,
		y: 250,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
	{ 
		l: "D",
		x: 160,
		y: 245,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
	{ 
		l: "I",
		x: 180,
		y: 240,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
	{ 
		l: "N",
		x: 200,
		y: 235,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
	{ 
		l: "G",
		x: 220,
		y: 230,
		timer: 0,
		maxTimer: 1,
		direction:"up"
	},
];

function preLoadMedia() {
	if (theGame.media.totalMedia != imgsReady.length) {
		//console.log(imgsReady.length);
		//Loading Screen
		theGame.ctx.clearRect(0,0,320, 480);
		//theGame.ctx.fillRect(0,0,320,480);
		theGame.ctx.textAlign = "center";
		theGame.ctx.fillStyle = "#59470E";
		theGame.ctx.font = "30px bit";
		for (var i=0; i<loadingPos.length; i++) {
			theGame.ctx.fillText(loadingPos[i].l , loadingPos[i].x, loadingPos[i].y);
			loadingPos[i].timer++;
			if (loadingPos[i].timer>=loadingPos[i].maxTimer) {
				if (loadingPos[i].direction=="up") {
					loadingPos[i].y-=2;
					if (loadingPos[i].y<230) {
						loadingPos[i].direction="down";
					}
				}
				else if (loadingPos[i].direction=="down") {
					loadingPos[i].y+=2;
					if (loadingPos[i].y>250) {
						loadingPos[i].direction="up";
					}
				}
				loadingPos[i].timer = 0;
			}
		}
		setTimeout(preLoadMedia, 60);
	}
	else {
		theGame.ctx.clearRect(0,0, 320, 480);
		//start the game
		theGame.run();
		//play music 
		//media.zik.play();
	}
};
preLoadMedia();

//theGame.run();
/*---- ----*/



