function Segmen(width, height, warna){
	this.color = warna;
	this.lineWidth=1; 
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotation = 0;
}

Segmen.prototype.draw = function(ctx) {
	var height = this.height;
	var d = this.width + height;
	var cornerRadius = height/2;
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.rotation);
	ctx.scale(this.scaleX, this.scaleY);
	ctx.lineWidth=this.lineWidth;
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.moveTo(0, -cornerRadius);
	ctx.lineTo(d-2*cornerRadius, -cornerRadius);
	ctx.quadraticCurveTo(-cornerRadius+d, -cornerRadius, -cornerRadius+d, 0);
	ctx.lineTo(-cornerRadius+d, height-2*cornerRadius);
	ctx.quadraticCurveTo(-cornerRadius+d, -cornerRadius+height, d-2*cornerRadius, -cornerRadius+height);
	ctx.lineTo(0, -cornerRadius+height);
	ctx.quadraticCurveTo(-cornerRadius, -cornerRadius+height, -cornerRadius, height-2*cornerRadius);
	ctx.lineTo(-cornerRadius, 0);
	ctx.quadraticCurveTo(-cornerRadius, -cornerRadius, 0, -cornerRadius);
	ctx.closePath();
	ctx.fill();
	if(this.lineWidth>0){ 
		 ctx.stroke(); 
	}
	//2 pins
	ctx.beginPath();
	ctx.arc(0, 0, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.stroke(); 
	ctx.beginPath();
	ctx.arc(this.width, 0, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.stroke(); 
	ctx.restore();
};

Segmen.prototype.getPin = function() {
	var pos ={
		x: this.x + Math.cos(this.rotation) * this.width,
		y: this.y + Math.sin(this.rotation) * this.width
	}
	return pos;
};