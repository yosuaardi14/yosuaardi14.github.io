function HealthBar(width, height, x, y){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

HealthBar.prototype.draw = function(ctx) {
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.rect(this.x, this.y, 100, this.height);
	ctx.stroke();
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.font = "20px Arial";
	ctx.fillText(Math.floor(this.width)+"/100",10,50);		
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}