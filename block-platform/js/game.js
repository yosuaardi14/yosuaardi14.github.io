var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var batasAtas = 0;
var batasKiri = 0;
var batasKanan = canvas.width;
var batasBawah = canvas.height;
var gravity = 0.1;
var friction = 0.8;
var sudut = 0;
var level = 1;
var unlockedLevel = 10;
var levelMax = 10;
var int;

var blocks;
var hazards;
var enemies;
var stompers;
var scatters;
var finish;
var moveblocks;
var throwers;

var moveLeft = false;
var moveRight = false;
var jumpUp = false;

var background = new Image();
background.src = 'images/back1.png';

var healthBar = new HealthBar(100, 25);
var groundBlock = new Block(0, batasBawah-20, canvas.width, 20);
var char = new Character(30,30);


window.addEventListener('keydown', function(e) {
	if(e.keyCode == 38){
		jumpUp = true;
	}
	if(e.keyCode == 39){
		moveRight = true;
	}
	if(e.keyCode == 37){
		moveLeft = true;
	}
});

window.addEventListener('keyup', function(e) {
  	if(e.keyCode == 38){
		jumpUp = false;
	}
	if(e.keyCode == 39){
		moveRight = false;
	}
	if(e.keyCode == 37){
		moveLeft = false;
	}
});


function charMove(){
	var gamesound = new GameSound();
	if (jumpUp) {
      	if (!char.jumping && char.grounded) {
       		char.jumping = true;
        	char.grounded = false;
        	char.vy -= (char.speed / 2 + 3.5);
        	gamesound.play('jump');	
      	}
    }

    if (moveRight) {
    	char.vx = char.speed;
    }
    if (moveLeft) {
    	char.vx = -char.speed;
    }

    char.vx *= friction;
	char.vy += gravity;

	if(char.grounded){
		char.vy = 0;
		char.jumping = false;
	}
		
	char.x += char.vx;
	char.y += char.vy;
}

function loadMap(levelNow){
	char.x = levelDB[levelNow]["char"]["x"];
	char.y = levelDB[levelNow]["char"]["y"];
	char.vx = levelDB[levelNow]["char"]["vx"];
	char.vy = levelDB[levelNow]["char"]["vy"];		

	finish = levelDB[levelNow]["finish"];

	for (var i in levelDB[levelNow]["block"]) {
		blocks.push(levelDB[levelNow]["block"][i]);
	}

	for (var i in levelDB[levelNow]["moveBlock"]) {
		var moveblock = levelDB[levelNow]["moveBlock"][i]["type"];
		moveblock.speed = levelDB[levelNow]["moveBlock"][i]["speed"];
		moveblock.batasAwal = levelDB[levelNow]["moveBlock"][i]["awal"];
		moveblock.batasAkhir = levelDB[levelNow]["moveBlock"][i]["akhir"];
		moveblock.arah = levelDB[levelNow]["moveBlock"][i]["arah"];
		moveblocks.push(moveblock);
	}

	for (var i in levelDB[levelNow]["hazard"]) {
		hazards.push(levelDB[levelNow]["hazard"][i]);
	}

	for (var i in levelDB[levelNow]["enemy"]) {
		var enemy = levelDB[levelNow]["enemy"][i]["type"];
		enemy.x = levelDB[levelNow]["enemy"][i]["x"];
		enemy.y = levelDB[levelNow]["enemy"][i]["y"];
		enemy.speed = levelDB[levelNow]["enemy"][i]["speed"];
		enemy.batasAwal = levelDB[levelNow]["enemy"][i]["awal"];
		enemy.batasAkhir = levelDB[levelNow]["enemy"][i]["akhir"];
		enemies.push(enemy);
	}

	for (var i in levelDB[levelNow]["stomper"]) {
		var stomper = levelDB[levelNow]["stomper"][i]["type"];
		stomper.x = levelDB[levelNow]["stomper"][i]["x"];
		stomper.y = levelDB[levelNow]["stomper"][i]["y"];
		stomper.speed = levelDB[levelNow]["stomper"][i]["speed"];
		stomper.batasAwal = levelDB[levelNow]["stomper"][i]["awal"];
		stomper.batasAkhir = levelDB[levelNow]["stomper"][i]["akhir"];
		stompers.push(stomper);
	}

	for (var i in levelDB[levelNow]["scatter"]) {
		var scatter = levelDB[levelNow]["scatter"][i]["type"];
		scatter.x = levelDB[levelNow]["scatter"][i]["x"];
		scatter.y = levelDB[levelNow]["scatter"][i]["y"];
		scatter.pusatX = levelDB[levelNow]["scatter"][i]["pusatX"];
	    scatter.pusatY = levelDB[levelNow]["scatter"][i]["pusatY"];
	    scatter.range = levelDB[levelNow]["scatter"][i]["range"];
		scatters.push(scatter);
	}

	for (var i in levelDB[levelNow]["thrower"]) {
		throwers.push(levelDB[levelNow]["thrower"][i]);
	}

}

function restart(){
	char.health = 100;
	char.x=0.1*canvas.width;
	char.y=50;
	loadLevel();
}

function nextLevel(){
	var gamesound = new GameSound();
	level++;
	if(unlockedLevel < level){
		unlockedLevel = level;
	}
	if (level > levelMax) {
		gamesound.play('gameover');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(background, 0, 0, 1000, 600);
		ctx.fillStyle = "black";
	    ctx.font = "50px Arial";
		ctx.fillText("Game Over", canvas.width*0.5-100, canvas.height*0.5);
	}else{
		char.health = 100;
		char.x=0.5*canvas.width;
		char.y=0;
		loadLevel();	
	}
	console.log(level);
}

function collisionDetection(objectA, objectB){
	var dx = objectA.posX - objectB.posX;
    var dy = objectA.posY - objectB.posY;
    var hWidths = (objectA.width * 0.5) + (objectB.width * 0.5);
    var hHeights = (objectA.height * 0.5) + (objectB.height * 0.5);
    if (Math.abs(dx) < hWidths && Math.abs(dy) < hHeights) {
		var offsetX = hWidths - Math.abs(dx);
        var offsetY = hHeights - Math.abs(dy);
        if (offsetX >= offsetY) {
            if (dy > 0) {
                objectA.y += offsetY;
                objectA.vy *= -1;
            }else{
                objectA.y -= offsetY;
                objectA.grounded = true;
            	objectA.jumping = false;
            	if(objectB.role == "moveBlock" && objectB.arah == "x"){
            		objectA.vx = objectB.speed;	
            	}	
            }
        }else {
            if (dx> 0) {
                objectA.x += offsetX;
            }else{
                objectA.x -= offsetX;
            }
            objectA.jumping = false;
        }
        if(objectB.role == "enemy" ||objectB.role == "hazard"){
        	objectA.health -= 0.2;
        }
    }
}

function collisionArena(){
	if(char.x-char.vx < batasKiri){
		char.x = batasKiri;	
	}
	if(char.x+char.width+char.vx > batasKanan){
		char.x = batasKanan-char.width;	
	}
	if(char.y-char.vy < batasAtas){
		char.y = batasAtas;	
	}
}

canvas.addEventListener("onload", loadLevel(), false);
function loadLevel(){
	blocks = new Array();
	hazards = new Array();
	enemies = new Array();
	stompers = new Array();
	scatters = new Array();
	moveblocks = new Array();
	throwers = new Array();
	moveLeft = false;
	moveRight = false;
	jumpUp = false;
	
	loadMap(level);
	loadButton();
	char.draw(ctx);	
	int = setInterval(update, 5);
	
	function update(){
		var gamesound = new GameSound();
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(background, 0, 0, 1000, 600);
		healthBar.width = char.health;
		char.grounded = false;
		collisionArena();
		collisionDetection(char, groundBlock);
		for (var i in blocks){
			collisionDetection(char, blocks[i]);
		}
		for (var i in moveblocks){
			collisionDetection(char, moveblocks[i]);
		}
		for (var i in hazards){
			collisionDetection(char, hazards[i]);
		}
		for (var i in enemies){
			collisionDetection(char, enemies[i]);
		}
		for (var i in scatters){
			collisionDetection(char, scatters[i]);
		}
		for (var i in stompers){
			collisionDetection(char, stompers[i]);
		}

		if(char.health <= 0){
			gamesound.play('charDie');
			alert("Lose");
			clearInterval(int);
			ctx.clearRect(0,0,canvas.width,canvas.height);
			restart();
		}

		charMove(char);
		if(char.checkFinish(finish)) {
			gamesound.play('stageClear');
			alert("Success");
			clearInterval(int);
			ctx.clearRect(0,0,canvas.width,canvas.height);
			nextLevel();
		}	

		for (var i in hazards){
			hazards[i].draw(ctx);
		}

		for (var i in blocks){
			blocks[i].draw(ctx);
		}

		for (var i in enemies){
			enemies[i].move(enemies[i].batasAwal, enemies[i].batasAkhir);
			enemies[i].x += enemies[i].speed;
			enemies[i].draw(ctx);
		}

		for (var i in moveblocks){
			moveblocks[i].move(moveblocks[i].batasAwal, moveblocks[i].batasAkhir, moveblocks[i].arah);
			if (moveblocks[i].arah == "x") {
				moveblocks[i].x += moveblocks[i].speed;
			}else if (moveblocks[i].arah == "y"){
				moveblocks[i].y += moveblocks[i].speed;
			}
			moveblocks[i].draw(ctx);
		}

		for (var i in stompers){
			stompers[i].move(stompers[i].batasAwal, stompers[i].batasAkhir);	
			stompers[i].y += stompers[i].speed;
			stompers[i].draw(ctx);
		}
		
		for (var i in scatters){
			scatters[i].rotate(scatters[i].pusatX, scatters[i].pusatY, sudut, scatters[i].range);
			scatters[i].draw(ctx);
		}

		for (var i in throwers){
			throwers[i].draw();
		}

		finish.draw(ctx);
		char.draw(ctx);
		groundBlock.draw(ctx);
		healthBar.draw(ctx);
		sudut += 0.001;
	}
}

function loadButton(){
	var lvlBtn = new Array();
	for (let index = 0; index < levelMax; index++) {
	    lvlBtn.push(document.getElementById(index+1));
	}

	for (let index = 0; index < lvlBtn.length; index++) {
    	if(index > (unlockedLevel-1)){
			lvlBtn[index].style.visibility = "hidden";
    	}else{
			lvlBtn[index].style.visibility = "visible";
    	}
		lvlBtn[index].addEventListener("click", function(){
    		clearInterval(int);
			ctx.clearRect(0,0,canvas.width,canvas.height);
        	level= index+1;
        	loadLevel();
    	});
	}
}







