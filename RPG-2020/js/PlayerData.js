function PlayerData(levelNow){
    if(levelNow == null){
        this.level = 1;
    }else{
        this.level = levelNow;
    }
}
var playData = new PlayerData();