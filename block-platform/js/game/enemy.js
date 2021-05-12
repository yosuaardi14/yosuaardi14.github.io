function Enemy(width, height){
	this.x = 0;
	this.y = 0;
	this.posX = this.x + 0.5*width;
	this.posY = this.y + 0.5*height;
	this.speed = 0;
	this.width = width;
	this.height = height;
	this.moveState = false;
	this.health = 100;
	this.role = "enemy";
	this.image = new Image();
    this.image.src = 'images/enemy.png';
    this.batasAwal = 0;
    this.batasAkhir = 0;
}

Enemy.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}

Enemy.prototype.move = function(batasAwal, batasAkhir) {
	if(this.x < batasAwal || this.x+this.width > batasAkhir){
		this.speed *=-1;
	}
};

