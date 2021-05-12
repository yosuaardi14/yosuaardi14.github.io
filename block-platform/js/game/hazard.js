function Hazard(x, y , width, height, direction){
	this.x = x;
	this.y = y;
	this.posX = this.x + 0.5*width;
	this.posY = this.y + 0.5*height;
	this.width = width;
	this.height = height;
	this.moveState = false;
	this.role = "hazard";
	this.image = new Image();
	if(direction == "top"){
    	this.image.src = 'images/hazard-top.png';
	}
	if(direction == "bottom"){
		this.image.src = 'images/hazard-bottom.png';
	}
	
}

Hazard.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}

function Scatter(width, height){
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
    this.image.src = 'images/scatter.png';
    this.pusatX = 0;
    this.pusatY = 0;
    this.range = 0;
}

Scatter.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}

var segmen = new Segmen(200, 10, "white");
Scatter.prototype.rotate = function(pusatX, pusatY, sudut, range) {
	segmen.x = pusatX;
	segmen.y = pusatY;
	var dx = this.posX - segmen.x;
	var dy = this.posY - segmen.y;
	var jarak = Math.sqrt(dx*dx+dy*dy);
	segmen.rotation = Math.atan2(dy, dx);
	segmen.width = Math.abs(jarak);
	segmen.draw(ctx);
	this.x= pusatX + range*Math.cos(sudut);
	this.y= pusatY + range*Math.sin(sudut);
};


function Stomper(width, height){
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
    this.image.src = 'images/stomper.png';
    this.batasAwal = 0;
    this.batasAkhir = 0;
}

Stomper.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	this.posX = this.x + 0.5*this.width;
	this.posY = this.y + 0.5*this.height;
}

Stomper.prototype.move = function(batasAwal, batasAkhir) {
	if(this.y < batasAwal || this.y+this.height > batasAkhir){
		this.speed *=-1;
	}
};

function Thrower(x, y, width){
	this.segmen1 = new Segmen(width, 10, "white");
	this.segmen2 = new Segmen(width, 10, "white");
	this.segmen2.x = x; 
	this.segmen2.y = y; 
}

Thrower.prototype.draw = function() {
	this.target = this.reach(this.segmen1, char.x, char.y);
	this.target = this.reach(this.segmen2, this.target.x, this.target.y);
	this.segmen1.x = this.segmen2.getPin().x;
	this.segmen1.y = this.segmen2.getPin().y;
	this.throwing(this.segmen1, char);
	this.segmen1.draw(ctx);	
	this.segmen2.draw(ctx);
}

Thrower.prototype.reach = function(segmen, posX, posY){
	var dx = posX - segmen.x;
	var dy = posY - segmen.y;
	segmen.rotation = Math.atan2(dy, dx);
	var w = segmen.getPin().x - segmen.x;
	var h = segmen.getPin().y - segmen.y;
	tx = posX - w;
	ty = posY - h;
	return {
		x: tx,
		y: ty
	}
}

Thrower.prototype.throwing = function(segment, char) {
    var dx = segment.getPin().x - char.x;
    var dy = segment.getPin().y - char.y;
    var jarak = Math.sqrt(dx * dx + dy * dy);
	if (jarak < (char.width||char.height)) {
  		char.vx += Math.random() * char.speed - 1;
  		char.vy -= 1;
	}
}
