function Finish(x, y , width, height){
	this.x = x;
	this.y = y;
	this.posX = this.x + 0.5*width;
	this.posY = this.y + 0.5*height;
	this.width = width;
	this.height = height;
	this.moveState = false;
	this.role = "finish";
	this.image = new Image();
    this.image.src = 'images/exit.png';
}

Finish.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}