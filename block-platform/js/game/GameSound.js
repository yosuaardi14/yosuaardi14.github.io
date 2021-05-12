function GameSound() {
  this.sound = "";
}

GameSound.prototype.play = function(element) {
    if(element == 'charDie') {
      this.sound = new Audio('./sounds/mario-die.wav');
      this.sound.play();
    }else if (element == 'stageClear') {
      this.sound = new Audio('./sounds/newlevel.wav');
      this.sound.play();
    }else if (element == 'jump') {
      this.sound = new Audio('./sounds/jump.wav');
      this.sound.play();
    }else if (element == 'gameover') {
      this.sound = new Audio('./sounds/stage-clear.wav');
      this.sound.play();
    }
};