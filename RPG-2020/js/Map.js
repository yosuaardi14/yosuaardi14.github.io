var lvlBtn = new Array();

for (let index = 0; index < 10; index++) {
    lvlBtn.push(document.getElementById(index+1));
}

var par = document.getElementsByTagName("p");
var table = document.getElementById("table");
function loadMap(){
    table.style.visibility = "visible";
    canvas.style.visibility = "hidden";
    gameLog.style.visibility = "hidden";
    gameLogA.style.visibility = "hidden";
    disableButton();
    for (let index = 0; index < lvlBtn.length; index++) {
        if (index+1 > unlockedLevel) {
            lvlBtn[index].style.visibility = "hidden";   
            par[index].style.visibility = "hidden";
        }else{
            lvlBtn[index].style.visibility = "visible";   
            par[index].style.visibility = "visible";
        }
    }
}

for (let index = 0; index < lvlBtn.length; index++) {
    lvlBtn[index].addEventListener("click", function(){
        init(index+1);
    });
}





