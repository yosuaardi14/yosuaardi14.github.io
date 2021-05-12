function PowerUp(width, height){
	this.x = 0;
	this.y = 0;
	this.posX = this.x + 0.5*width;
	this.posY = this.y + 0.5*height;
	this.width = width;
	this.height = height;
	this.moveState = false;
	this.role = "powerup";
	this.image = new Image();
    this.image.src = 'images/power-up.png';
}

PowerUp.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}


