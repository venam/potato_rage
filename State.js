function State (game) {
	this.game     = game;
}

//draw on this.game.ctx        (called 60/s)
State.prototype.draw = function() {
};
//update all that is happening (called 60/s)
State.prototype.update = function(animStart) {
};
//handles events recorded in this.keysDown
State.prototype.eventsCallbacks = function() {
};

//Handle pointer events
State.prototype.pDown = function(evt) {
}

State.prototype.pUp = function(evt) {
}

State.prototype.pMove = function(evt) {
}


