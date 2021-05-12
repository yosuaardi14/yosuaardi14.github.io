var turnSet = Math.floor(Math.random()*2+1);
function gameplay(player, enemy){
	disableButton();
	beginRound(player, enemy);
	if(turnSet == 1){
		playerChooseSkill(player, enemy);
		checkStats();
		log();
		enemyChooseSkill(player, enemy);
		checkStats();
		log();
	}else{
		enemyChooseSkill(player, enemy);
		checkStats();
		log();
		playerChooseSkill(player, enemy);
		checkStats();
		log();
	}
	
}

function beginRound(player, enemy){
	if(gameState == "beginRound"){
		checkStats();
		turn++;
		player.energy += 15;
		enemy.energy += 15;
		turnSet = Math.floor(Math.random()*2+1);
		if(turnSet == 1){
			gameState = "playerChoose";
		}else{
			gameState = "enemyChoose";
		}
	}
}

function playerChooseSkill(player, enemy){
	if((gameState == "playerChoose") && player.health > 0){
		act[0].style.visibility = "visible";
		if(player.energy >= 10){
			act[1].style.visibility = "visible";
		}
		if(player.energy >= 100){
			act[2].style.visibility = "visible";
		}
		if(healingItem > 0){
			act[3].style.visibility = "visible";
		}
	}
}

function checkStats(){
	if(player.health >= player.max){
		player.health = player.max;
	}
	if(enemy.health >= enemy.max){
		enemy.health = enemy.max;
	}
	if(player.energy >= 100){
		player.energy = 100;
	}
	if(enemy.energy >= 100){
		enemy.energy = 100;
	}
}

function finishChoose(){
	if(turnSet == 1){
		if(gameState == "playerChoose"){
			console.log("Player Finish");
			gameState = "finish";
			action = setTimeout(function(){
				gameState = "enemyChoose";
			}, 1100);
		}else if(gameState == "enemyChoose"){
			console.log("Enemy Finish");
			gameState = "finish";
			action = setTimeout(function(){
				gameState = "beginRound";
			}, 1100);
		}
	}else{
		if(gameState == "enemyChoose"){
			console.log("Enemy Finish");
			gameState = "finish";
			action = setTimeout(function(){
				gameState = "playerChoose";
			}, 1100);
		}else if(gameState == "playerChoose"){
			console.log("Player Finish");
			gameState = "finish";
			action = setTimeout(function(){
				gameState = "beginRound";
			}, 1100);
		}
	}
	
}

function healing(target){
	healingItem -= 1;
	target.health += Math.floor(Math.random()*target.max+1);
}




