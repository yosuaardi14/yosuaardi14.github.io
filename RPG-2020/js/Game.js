var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var atk = document.getElementById("atkBtn");
var def = document.getElementById("defBtn");
var spe = document.getElementById("speBtn");
var heal = document.getElementById("healBtn");
var gameLog = document.getElementById("log");
var gameLogA = document.getElementById("logA");
var AI = new AISystem();
var act = [atk, def, spe, heal];
var player;
var enemy;
var levelNow = playData.level;
var unlockedLevel = 10;
var levelMax = 10;
var healthPlayer;
var healthEnemy;
var energyPlayer;
var energyEnemy;
var turn;
var int;
var action;
var gameState;
var playerAction;
var enemyAction;
var healingItem;

function startGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameplay(player, enemy);
    player.draw(100, 100);
    enemy.drawFlip(600, 100);
    check();
    update();
    log();
}

function init(levelPlay){
    disableLevel();
    playerAction = "Idle";
    enemyAction = "Idle";
    canvas.style.visibility = "visible";
    gameLog.style.visibility = "visible";
    gameLogA.style.visibility = "visible";
    playData.level = levelPlay;
    levelNow = levelPlay;
    turn = 0;
    player = new Knight(levelNow);
    enemy = level[levelNow]["enemy"];
    healingItem = Math.floor(Math.random()*2+1);
    healthPlayer = new HealthBar(100, 25, 0, 0);
    healthEnemy = new HealthBar(100, 25, canvas.width-100, 0);
    energyPlayer = new EnergyBar(100, 25, 0, 26);
    energyEnemy = new EnergyBar(100, 25, canvas.width-100, 26);
    switch(level[levelNow]["type"]){
        case "easy":
            enemyChooseSkill = AI.easy;
            break;
        case "medium":
            enemyChooseSkill = AI.medium;
            break;
        case "hard":
        	enemyChooseSkill = AI.hard;
        	break;
        case "extreme":
        	enemyChooseSkill = AI.extreme;
        	break;
    }
    int = setInterval(startGame, 100);
    gameState = "beginRound";
}

function restartGame(){
    alert("You Lose");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearLog();
    player.health = player.max;
    enemy.health = enemy.max;
    player.energy = 0;
    enemy.energy = 0;
    init(levelNow);
}

function finish(){
    alert("You Win");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearLog();
    player.health = player.max;
    enemy.health = enemy.max;
    player.energy = 0;
    enemy.energy = 0;
    levelNow++;
    if(levelNow >= unlockedLevel){
        unlockedLevel = levelNow;
    }
    loadMap();
}

atk.addEventListener("click", function(event){
    if(gameState == "playerChoose"){
        player.attack(enemy);
        //draw
        player.stats = "attack";
        clearTimeout(action);
        action = setTimeout(function(){
            player.stats = "idle";
        }, 600);
        disableButton();
        finishChoose();
        playerAction = "Attack";
    }
});

def.addEventListener("click", function(event){
    if(gameState == "playerChoose"){
        player.defense();
        player.stats = "defense";
        clearTimeout(action);
        action = setTimeout(function(){
            player.stats = "idle";
        }, 600);
        disableButton();
        finishChoose();
        playerAction = "Defense";
    }
});

spe.addEventListener("click", function(event){
    if(gameState == "playerChoose"){
        player.special(enemy);
        player.stats = "special";
        clearTimeout(action);
        action = setTimeout(function(){
            player.stats = "idle";
        }, 600);
        disableButton();
        finishChoose();
        playerAction = "Special";
    }
});

heal.addEventListener("click", function(event){
    if(gameState == "playerChoose"){
        healing(player);
        player.stats = "healing";
        clearTimeout(action);
        action = setTimeout(function(){
            player.stats = "idle";
        }, 600);
        disableButton();
        finishChoose();
        playerAction = "Healing";
    }
});

function disableButton(){
    act[0].style.visibility = "hidden";
    act[1].style.visibility = "hidden";
    act[2].style.visibility = "hidden";
    act[3].style.visibility = "hidden";
}

function clearLog(){
    gameLogA.value = "";
    gameLog.value = "";
}

function check(){
    if(player.health <= 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.health = 0;
        update();
        clearTimeout(action);
        clearInterval(int);
        restartGame();
        
    }
    if(enemy.health <= 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        enemy.health = 0;
        update();
        clearTimeout(action);
        clearInterval(int);
        finish();
    }
}

function update(){
    healthPlayer.width = (player.health/player.max)*100;
    healthEnemy.width = (enemy.health/enemy.max)*100;
    energyPlayer.width = (player.energy/100)*100;
    energyEnemy.width = (enemy.energy/100)*100;
    
    healthPlayer.draw(ctx);
    healthEnemy.draw(ctx);
    energyPlayer.draw(ctx);
    energyEnemy.draw(ctx);
    statusText();
    posText();
    enemyStatus();
}

function statusText(){
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Turn: "+turn, (canvas.width/2)-50, 25);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Level: "+levelNow, 0, 290);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Healing Item: "+healingItem, 325, 290);
}

function posText(){
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
	ctx.fillText(player.health+"/"+player.max, healthPlayer.x+17.5, healthPlayer.y+20);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(player.energy+"/100", energyPlayer.x+17.5, energyPlayer.y+20);
    
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
	ctx.fillText(enemy.health+"/"+enemy.max, healthEnemy.x+17.5, healthEnemy.y+20);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
	ctx.fillText(enemy.energy+"/100", energyEnemy.x+17.5, energyEnemy.y+20);
}

function disableLevel(){
    table.style.visibility = "hidden";
    for (let index = 0; index < lvlBtn.length; index++) {
        lvlBtn[index].style.visibility = "hidden";   
    }
    for (let index = 0; index < lvlBtn.length; index++) {
        par[index].style.visibility = "hidden";   
    }
}

function enemyStatus(){
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Enemy: "+enemyAction, canvas.width-150, 290);
}

function log(){
    gameLog.value ="Attack\nDamage: "+player.att+"\n\n";
    gameLog.value += "Defense\nHeal: "+player.def+"\n\n";
    gameLog.value +="Special\nDamage: "+3*player.att+"\n\n";
    if(enemy instanceof Knight){
        gameLogA.value ="Attack\nDamage: "+enemy.att+"\n\n";
        gameLogA.value += "Defense\nHeal: "+enemy.def+"\n\n";
        gameLogA.value +="Special\nDamage: "+3*enemy.att+"\n\n";
    }else if(enemy instanceof Guardian){
        gameLogA.value ="Attack\nDamage: "+enemy.att+"\n\n";
        gameLogA.value += "Defense\nHeal: "+enemy.def+"\n\n";
        gameLogA.value +="Special\nHeal: "+Math.floor(enemy.spe*1.5)+"\n";
        gameLogA.value +="Damage: "+Math.floor(enemy.spe*1.5)+"\n\n";
    }else if(enemy instanceof Healer){
        gameLogA.value ="Attack\nDamage: "+enemy.att+"\n\n";
        gameLogA.value += "Defense\nHeal: "+enemy.def+"\n\n";
        gameLogA.value +="Special\nHeal: "+3*enemy.def+"\n\n";
    }
}