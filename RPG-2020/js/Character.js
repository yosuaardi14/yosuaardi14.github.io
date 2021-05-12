class Character{
	constructor(level){
		this.level = level;
		this.health = 100*this.level;
		this.max = this.health;
		this.energy = 0;
		this.att = 5;
		this.def = 10;
		this.defend = false;

		//draw
		this.charSprite = new Image();
		this.charName = "knight";
		this.curFrame = 0;
		this.stats = "idle";
	}
	attack(target){
		if(target.defend){
			target.health -= 0;
			target.defend = false;
		}else{
			target.health -= this.att;
			target.energy += 5;
		}
	}
	defense(){
		if(this.energy >= 10){
			this.health += 10;
			this.energy -= 10;
		}
	}
	special(target){
		if(this.energy >= 100){
			if(target.defend){
				target.health -= Math.floor((0.25*target.max)*0.5);
				target.defend = false;
				target.energy += Math.floor((0.25*target.max)*0.25);
			}else{
				target.health -= Math.floor(0.25*target.max);
				target.energy += 7;
			}
			this.energy -= 100;
			
		}
	}

	draw(x, y){
		var width = 100;
		var height = 100;
		switch(this.stats){
			case "idle":
				this.charSprite.src = "img/"+this.charName+"/Idle.png";
				width = 100;
				height = 100;
				break;
			case "attack":
				x+=335;
				this.charSprite.src = "img/"+this.charName+"/Attack "+"("+3+")"+".png";
				width = 175;
				height = 100;
				break;
			case "defense":
				this.charSprite.src = "img/"+this.charName+"/Defense.png";
				width = 125;
				height = 100;
				break;
			case "special":
				x+=325;
				this.charSprite.src = "img/"+this.charName+"/Special "+"("+3+")"+".png";
				width = 200;
				height = 100;
				break;
			case "healing":
				this.charSprite.src = "img/"+this.charName+"/Heal.png";
				width = 100;
				height = 100;
				break;
		}	
		ctx.drawImage(this.charSprite,x,y,width,height);
	}
	drawFlip(x,y){
		var width = 100;
		var height = 100;
		switch(this.stats){
			case "idle":
				this.charSprite.src = "img/"+this.charName+"/Idle.png";
				width = 100;
				height = 100;
				break;
			case "attack":
				x-=335;
				this.charSprite.src = "img/"+this.charName+"/Attack "+"("+3+")"+".png";
				width = 175;
				height = 100;
				break;
			case "defense":
				this.charSprite.src = "img/"+this.charName+"/Defense.png";
				width = 125;
				height = 100;
				break;
			case "special":
				x-=325;
				this.charSprite.src = "img/"+this.charName+"/Special "+"("+3+")"+".png";
				width = 200;
				height = 100;
				break;
			case "healing":
				this.charSprite.src = "img/"+this.charName+"/Heal.png";
				width = 100;
				height = 100;
				break;
		}	
		ctx.translate(x+100,y);
	  	ctx.scale(-1,1);
		ctx.drawImage(this.charSprite,0,0,width,height);
		ctx.setTransform(1,0,0,1,0,0);
	}
}


class Player extends Character{
	constructor(level){
		super(level);
		this.charSprite = new Image();
		this.charName = "knight";
		this.curFrame = 0;
	}
	attack(target){
		this.att = Math.floor(Math.random()*3+7);
		if(target.defend){
			target.health -= 0;
			target.defend = false;
		}else{
			target.health -= this.att;
			target.energy += Math.floor(this.att*0.5);
		}
	}
	defense(){
		if(this.energy >= 10){
			this.defend = true;
			this.health += 10;
			this.energy -= 10;
		}
	}
	special(target){
		if(this.energy >= 100){
			this.att = Math.floor(Math.random()*3+7);
			target.defend = false;
			target.health -= 3*this.att;
			this.energy -= 100;
			target.energy += Math.floor(this.att*0.5);
		}
	}
}

class Enemy extends Character{
	constructor(level){
		super(level);
		this.charSprite = new Image();
		this.charName = "knight";
		this.curFrame = 0;
	}
	attack(target){
		this.att = Math.floor(Math.random()*3+7);
		if(target.defend){
			target.health -= 0;
			target.defend = false;
		}else{
			target.health -= this.att;
			target.energy += Math.floor(this.att*0.5);
		}
	}
	defense(){
		if(this.energy >= 10){
			this.defend = true;
			this.health += 10;
			this.energy -= 10;
		}
	}
	special(){
		if(this.energy >= 100){
			this.health += Math.floor(0.25*this.max);
			this.energy -= 100;
			
		}
	}
	
}

//Used Class in Game

class Knight extends Character{
	constructor(level){
		super(level);
		this.health = 80*this.level;
		this.max = 80*this.level;
		//draw
		this.att = Math.floor(Math.random()*4+11)*this.level; //11-14
		this.def = Math.floor(Math.random()*4+7)*this.level; //11-14
		this.charSprite = new Image();
		this.charName = "knight";
		this.curFrame = 0;
	}
	attack(target){
		this.att = Math.floor(Math.random()*4+11)*this.level;
		target.health -= this.att;
		target.energy += 5;
		
	}
	defense(){
		this.def = Math.floor(Math.random()*4+7)*this.level; 
		if(this.energy >= 10){
			this.health += this.def;
			this.energy -= 10;
		}
	}
	special(target){
		this.att = Math.floor(Math.random()*4+11)*this.level;
		if(this.energy >= 100){
			target.health -= 3*this.att;
			this.energy -= 100;
			target.energy += 10;
		}
	}
	
}

class Healer extends Character{
	constructor(level){
		super(level);
		this.health = 100*this.level;
		this.max = 100*this.level;
		this.att = Math.floor(Math.random()*4+7)*this.level; //7-10
		this.def = Math.floor(Math.random()*4+11)*this.level; //11-14
		this.charSprite = new Image();
		this.charName = "paladin";
		this.curFrame = 0;
	}
	attack(target){
		this.att = Math.floor(Math.random()*4+7)*this.level;
		target.health -= this.att;
		target.energy += 5;
		
	}
	defense(){
		this.def = Math.floor(Math.random()*4+11)*this.level;
		if(this.energy >= 10){
			this.health += this.def;
			this.energy -= 10;
		}
	}
	special(){
		this.def = Math.floor(Math.random()*4+11)*this.level;
		if(this.energy >= 100){
			this.health += 3*this.def;
			this.energy -= 100;
		}
	}
	
}

class Guardian extends Character{
	constructor(level){
		super(level);
		this.health = 90*this.level;
		this.max = 90*this.level;
		this.att = Math.floor(Math.random()*4+9)*this.level; //9-12
		this.def = Math.floor(Math.random()*4+9)*this.level; //9-12
		this.spe = Math.floor(Math.random()*4+11)*this.level;
		this.charSprite = new Image();
		this.charName = "guardian";
		this.curFrame = 0;
	}
	attack(target){
		this.att = Math.floor(Math.random()*4+9)*this.level; //9-12
		target.health -= this.att;
		target.energy += 5;
	}
	defense(){
		this.def = Math.floor(Math.random()*4+9)*this.level;
		if(this.energy >= 10){
			this.health += this.def;
			this.energy -= 10;
		}
	}
	special(target){
		this.spe = Math.floor(Math.random()*4+11)*this.level;
		if(this.energy >= 100){
			this.health += Math.floor(1.5*this.spe);
			target.health -= Math.floor(1.5*this.spe);
			this.energy -= 100;
		}
	}
}