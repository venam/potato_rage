function Lesson8(game) {
	this.life = new Life(game.media);
}

Lesson8.prototype.draw = function(ctx) {
	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillStyle = "#59470E";
	ctx.font = "25px bit";
	ctx.textAlign="center";
	ctx.fillText("LESSON8", 320/2, 65);
	ctx.font = "16px bit";
	ctx.fillText("May the potato be with you!", 320/2, 290);

	ctx.fillStyle = "#fdd704";
	ctx.font = "20px bit";
	ctx.fillText("M", 50, 20);
	ctx.font = "16px bit";
	ctx.fillText(0, 50, 37);
	ctx.font = "20px bit";
	ctx.fillStyle = "#a72a17";
	ctx.fillText("K", 20, 20);
	ctx.font = "16px bit";
	ctx.fillText(0, 20, 37);


	ctx.fillStyle = "#E1AA21";
	ctx.font = "40px bit";
	ctx.textAlign="center";
	ctx.fillText("00:00", 320/2, 35);
	this.life.draw(ctx);
}

Lesson8.prototype.update = function() {
}


