var imgsReady = new Array();
var mobileAudioReady = false;
var click = document.ontouchstart === undefined ? 'click' : 'touchstart';

function Media(theGame) {
	this.totalMedia     = 8;
	this.starSprites    = new Array();
	this.potatoSprites  = new Array();
	this.elemSprites    = new Array();
	this.buttonSprites  = new Array();
	this.letterSprites  = new Array();
	this.heartSprites   = new Array();
	this.handSprites    = new Array();
	this.iconSprites    = new Array();
	this.theGame        = theGame;

	this.sound          = null;
	this.setupImages();
	this.setupSounds();
}

Media.prototype.setupImages = function() {
	var starImg = new Image();
	for (var i=0; i<3;i++) {
		this.starSprites[i] = {
			image: starImg,
			sx   : 9*i,
			sy   : 0,
			sw   : 9, 
			sh   : 9
		}
	}
	starImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	starImg.src = "star.png";

	var heartImg = new Image();
	for (var i=0; i<1;i++) {
		this.heartSprites[i] = {
			image: heartImg,
			sx   : 20*i,
			sy   : 0,
			sw   : 20, 
			sh   : 20
		}
	}
	heartImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	heartImg.src = "heart.png";

	var potImg = new Image();
	for (var i=0; i<3;i++) {
		this.potatoSprites[i] = {
			image: potImg,
			sx   : 70*i,
			sy   : 0,
			sw   : 70, 
			sh   : 50
		}
	}
	potImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	potImg.src = "potato.png";

	var elemImg = new Image();
	for (var i=0; i<4;i++) {
		this.elemSprites[i] = {
			image: elemImg,
			sx   : 70*i,
			sy   : 0,
			sw   : 70, 
			sh   : 100
		}
	}
	elemImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	elemImg.src = "elems.png";

	var butImg = new Image();
	for (var i=0; i<12;i++) {
		this.buttonSprites[i] = {
			image: butImg,
			sx   : 290*i,
			sy   : 0,
			sw   : 290, 
			sh   : 100
		}
	}
	butImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	butImg.src = "buttons.png";

	var handImg = new Image();
	for (var i=0; i<2;i++) {
		this.handSprites[i] = {
			image: handImg,
			sx   : 40*i,
			sy   : 0,
			sw   : 40, 
			sh   : 57
		}
	}
	handImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	handImg.src = "hand.png";



	var letterImg = new Image();
	for (var i=0; i<8;i++) {
		this.letterSprites[i] = {
			image: letterImg,
			sx   : 50*i,
			sy   : 0,
			sw   : 50, 
			sh   : 60
		}
	}
	letterImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	letterImg.src = "letters.png";


	var iconImg = new Image();
	for (var i=0; i<8;i++) {
		this.iconSprites[i] = {
			image: iconImg,
			sx   : 46*i,
			sy   : 0,
			sw   : 46, 
			sh   : 53
		}
	}
	iconImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	iconImg.src = "icons.png";
}

Media.prototype.setupSounds = function() {
	this.sound = new Howl({
		urls: ['sprites.mp3', 'sprites.ogg','sprites.wav'],
		sprite: {
			empty    : [0, 500],
			button   : [1000, 300],
			swoosh   : [3200, 200],
			knife    : [5400, 400],
			stab     : [7600, 500],
			bottle   : [9900, 300],
			squashed : [12100, 500],
			frying   : [14600, 2100],
		},
	});

	if (!this.theGame.mobile) {
		/*
		this.swoosh = new Howl({
			urls: ['swoosh.ogg', 'swoosh.mp3'],
			buffer: true,
			autoplay: false,
			loop: false,
			volume: 1.0,
			onload: function() {
			},
			onend: function() {
			}
		});
		this.knife = new Howl({
			urls: ['knife.ogg', 'knife.mp3'],
			autoplay: false,
			buffer: true,
			loop: false,
			volume: 1.0,
			onend: function() {
			}
		});
		this.stab = new Howl({
			urls: ['stab.ogg', 'stab.mp3'],
			autoplay: false,
			buffer: true,
			loop: false,
			volume: 1.0,
			onend: function() {
			}
		});
		this.frying = new Howl({
			urls: ['frying.ogg', 'frying.mp3'],
			autoplay: false,
			loop: false,
			volume: 1.0,
			buffer: true,
			onend: function() {
			}
		});
		this.bottle = new Howl({
			urls: ['bottle.ogg', 'bottle.mp3'],
			autoplay: false,
			loop: false,
			volume: 1.0,
			buffer: true,
			onend: function() {
			}
		});
		this.button = new Howl({
			urls: ['button.ogg', 'button.mp3'],
			autoplay: false,
			loop: false,
			volume: 1.0,
			onend: function() {
			}
		});
		this.squashed = new Howl({
			urls: ['squashed.ogg', 'squashed.mp3'],
			autoplay: false,
			loop: false,
			volume: 1.0,
			onend: function() {
			}
		});
		*/
	}
	else {
		/*
		window.addEventListener(click, function() {
			if (!mobileAudioReady) {
				mobileAudioReady = true;
				media.sound = new Howl({
					urls: ['sprites.wav', 'sprites.mp3','sprites.m4a', 'sprites.ogg'],
					sprite: {
						empty    : [0, 500],
						button   : [1000, 300],
						swoosh   : [3200, 200],
						knife    : [5400, 400],
						stab     : [7600, 500],
						bottle   : [9900, 300],
						squashed : [12100, 500],
						frying   : [14600, 2100],
					}
				});
				media.sound.play('empty');
			}
		}, false);
		*/
	}
}


