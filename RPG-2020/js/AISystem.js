function AISystem(){
    this.easy = AIeasy;
    this.medium = AImedium;
    this.hard = AIhard;
    this.extreme = AIextreme;
}

function AIeasy(player, enemy){
    if(gameState == "enemyChoose" && enemy.health > 0){        
        var random = Math.random()*3+1;
        random = Math.floor(random);
        if(healingItem > 0 && enemy.health < 30){
            healing(enemy);
            enemy.stats = "healing";
            clearTimeout(action);
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Healing";
        }else{
            switch(random){
                case 1:
                    enemy.attack(player);
                    enemy.stats = "attack";
                    clearTimeout(action);
                    action = setTimeout(function(){
                        enemy.stats = "idle";
                    }, 600);
                    enemyAction="Attack";
                    break;
                case 2:
                    if(enemy.energy >= 10){
                        enemy.defense();
                        enemy.stats = "defense";
                        enemyAction="Defense";
                    }else{
                        enemy.attack(player);
                        enemy.stats = "attack";
                        enemyAction="Attack";
                    }
                    clearTimeout(action);
                    action = setTimeout(function(){
                        enemy.stats = "idle";
                    }, 600);
                    break;
                case 3:
                    if(enemy.energy >= 100){
                        enemy.special(player);
                        enemy.stats = "special";
                        enemyAction="Special";
                    }else{
                        enemy.attack(player);
                        enemy.stats = "attack";
                        enemyAction="Attack";
                    }
                    clearTimeout(action);
                    action = setTimeout(function(){
                        enemy.stats = "idle";
                    }, 600);
                    break;
            }
        }
        finishChoose();
    }
}

function AImedium(player, enemy){
    if(gameState == "enemyChoose" && enemy.health > 0){
        if(healingItem > 0 && (enemy.health < (0.3*enemy.max))){
            healing(enemy);
            enemy.stats = "healing";
            clearTimeout(action);
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Healing";
        }else{
            if(enemy.energy < 90){
                if((enemy.health > (0.4*enemy.max) || player.health < (0.5*player.max)) || enemy.energy<10){
                    enemy.attack(player);
                    enemy.stats = "attack";
                    enemyAction="Attack";
                }else{
                    enemy.defense();
                    enemy.stats = "defense";
                    enemyAction="Defense";
                }
                action = setTimeout(function(){
                    enemy.stats = "idle";
                }, 600);
            }else{
                if(enemy.energy >= 100){
                    enemy.special(player);
                    enemy.stats = "special";
                    enemyAction="Special";
                }else{
                    enemy.attack(player);
                    enemy.stats = "attack";
                    enemyAction="Attack";
                }
                action = setTimeout(function(){
                    enemy.stats = "idle";
                }, 600);
            }
        }
        finishChoose();
    }
}

function AIhard(player, enemy){
    if(gameState == "enemyChoose" && enemy.health > 0){
        if(healingItem > 0 && (enemy.health < (0.6*enemy.max))){
            healing(enemy);
            enemy.stats = "healing";
            clearTimeout(action);
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Healing";
        }else if(healingItem > 0 && playerAction == "Healing"){
            healing(enemy);
            enemy.stats = "healing";
            clearTimeout(action);
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Healing";
        }
        else{
            if(enemy.energy < 85){
                if((enemy.health > (0.4*enemy.max) || player.health < (0.3*player.max)) || enemy.energy<10){
                    if(player.defend){
                        enemy.defense();
                        enemy.stats = "defense";
                        action = setTimeout(function(){
                            enemy.stats = "idle";
                        }, 600);
                        enemyAction="Defense";                            
                    }else {
                        enemy.attack(player);
                        enemy.stats = "attack";
                        action = setTimeout(function(){
                            enemy.stats = "idle";
                        }, 600);
                        enemyAction="Attack";
                    }   
                }else{
                    enemy.defense();
                    enemy.stats = "defense";
                    action = setTimeout(function(){
                        enemy.stats = "idle";
                    }, 600);
                    enemyAction="Defense";
                }
            }else{
                if(enemy.energy >= 100){
                    enemy.special(player);
                    enemy.stats = "special";
                    action = setTimeout(function(){
                        enemy.stats = "idle";
                    }, 600);
                    enemyAction="Special";
                }else{
                    enemy.defense();
                    enemy.stats = "defense";
                    action = setTimeout(function(){
                        enemy.stats = "idle";
                    }, 600);
                    enemyAction="Defense";
                }

            }
        }
        finishChoose();
    }
}

function AIextreme(player, enemy){
    if(gameState == "enemyChoose" && enemy.health > 0){  
        var eAct = getAIAction();
        if(eAct == "Healing"){
            healing(enemy);
            enemy.stats = "healing";
            clearTimeout(action);
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Healing";
        }else if(eAct == "Attack"){
            enemy.attack(player);
            enemy.stats = "attack";
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Attack";
        }else if(eAct == "Defense"){
            enemy.defense();
            enemy.stats = "defense";
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Defense";
        }else if(eAct == "Special"){
            enemy.special(player);
            enemy.stats = "special";
            action = setTimeout(function(){
                enemy.stats = "idle";
            }, 600);
            enemyAction="Special";
        }
        finishChoose();
    }
}

function getAIAction(){
    let tempPH = player.health;
    let tempPE = player.energy;
    let tempEH = enemy.health;
    let tempEE = enemy.energy;
    let item = healingItem;


    let max = 0;

    //att, def, spe, heal
    var action = ["Attack", "Defense", "Special", "Healing"];
    var point = generatePoint(); 
    var goal = generateGoal(tempEE, item);

    console.log(goal);
    console.log(point);
    let maxPoint = point[0];

    for(let i = 0; i < goal.length; i++){
        if((point[i] >= maxPoint) && (goal[i] == true)){
            max = i;
            maxPoint = point[i];
        }
    }

    eAct = action[max];
    return eAct;
}

function generateGoal(tempEE, item){
    var goal = [true, false, false, false];
    if(tempEE >= 10){
        goal[1] = true;
    }
    if(tempEE >= 100){
        goal[2] = true;
    }
    if(item > 0){
        goal[3] = true;
    }
    return goal;
}

function generatePoint(){
    let tempPH = player.health;
    let tempPE = player.energy;
    let tempEH = enemy.health;
    let tempEE = enemy.energy;
    var point = [0,0,0,0]; 

    //attack 
    point[0] = 3;
    if(tempPH<tempEH){
        point[0] = 4;
    }

    if((tempPH-enemy.att) <= 0){
        point[0] = 4;
    }
    
    //defense 
    if(tempEE >= 10){
        point[1] = 3;
        if((((tempPE+15) >= 100) || ((tempEH-player.att) <= 0)) && ((tempPH-enemy.att) >= enemy.att)){
            point[1] = 4;
        }else{
            point[1] = 1;
        }
    }

    //special
    if(tempEE >= 100){
        point[2] = 3;
        if((3*enemy.att-tempPH) <= 0){
            point[2] = 4;
        }

        if (enemy instanceof Healer){
            if((((tempPE+15) >= 100) || ((tempEH-player.att) <= 0)) && ((tempPH-enemy.att) >= enemy.att)){
                point[2] = 4;
            }else{
                point[2] = 3;
            }

        }
    }

    if(healingItem > 0){
        if(((tempPE+15) >= 100) || ((tempEH-player.att) <= 0) || (tempEH <= 0.5*enemy.max)){
            point[3] = 4;
        }else{
            point[3] = 2;
        }

        if (enemy instanceof Guardian){
            if((tempPH <= 0.70*player.max) && (tempEH < enemy.max)){
                point[3] = 4;
            }
        }

        if (enemy instanceof Healer){
            if((tempPH <= 0.75*player.max) && (tempEH < enemy.max)){
                point[3] = 4;
            }
        }
    }
    return point;
}
