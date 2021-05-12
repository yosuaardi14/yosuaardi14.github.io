function MoveB(x, y, width, height){
	this.x = x;
	this.y = y;
	this.posX = this.x + 0.5*width;
	this.posY = this.y + 0.5*height;
	this.speed = 0;
	this.width = width;
	this.height = height;
	this.moveState = true;
	this.role = "moveBlock";
	this.image = new Image();
    this.image.src = 'images/moveblock.png';
    this.batasAwal = 0;
    this.batasAkhir = 0;
    this.arah = "x";
}

MoveB.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}

MoveB.prototype.move = function(batasAwal, batasAkhir, arah) {
	if(arah == "x"){
		if(this.x < batasAwal || this.x+this.width > batasAkhir){
			this.speed *=-1;
		}
	}
	if(arah == "y"){
		if(this.y < batasAwal || this.y+this.height > batasAkhir){
			this.speed *=-1;
		}
	}
};