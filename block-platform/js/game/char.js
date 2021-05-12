function Character(width, height){
	this.x = 0;
	this.y = 0;
	this.posX = this.x + 0.5*width;
	this.posY = this.y + 0.5*height;
	this.vx = 0;
	this.vy = 0;
	this.speed = 2;
	this.width = width;
	this.height = height;
	this.grounded = false;
	this.onmoveblock = false;
	this.jumping = false;
	this.health = 100;
	this.role = "character";
	this.charSprite = new Image();
    this.charSprite.src = 'images/char.png';
}

Character.prototype.draw = function(ctx) {
	ctx.drawImage(this.charSprite, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}

Character.prototype.checkFinish = function(finish) {
	var dx = this.posX - finish.posX;
    var dy = this.posY - finish.posY;
    var jarak = Math.sqrt(dx*dx+dy*dy);
    var hWidths = (this.width * 0.5) + (finish.width * 0.5);
    var hHeights = (this.height * 0.5) + (finish.height * 0.5);
    if (Math.abs(jarak) < hWidths || Math.abs(jarak) < hHeights){
    	return true;
    }
}





