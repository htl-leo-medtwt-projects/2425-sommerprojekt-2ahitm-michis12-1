
/***********************************
 * EVENT EVENTS
 ***********************************/
let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false,
    speedKey: false 
};
let animationIn;
document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    
    if (e.key === "ArrowLeft") { // Left arrow
        KEY_EVENTS.leftArrow = true;
    }
    if (e.key === "ArrowUp") { // Up arrow
        KEY_EVENTS.upArrow = true;
    }
    if (e.key === "ArrowRight") { // Right arrow
        KEY_EVENTS.rightArrow = true;
    }
    if (e.key === "ArrowDown") { // Down arrow
        KEY_EVENTS.downArrow = true;
    }
    
}

function keyListenerUp(e) {
    if (e.key === "ArrowLeft") { // Left arrow
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === "ArrowUp") { // Up arrow
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === "ArrowRight") { // Right arrow
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === "ArrowDown") { // Down arrow
        KEY_EVENTS.downArrow = false;
    }
    
    
}
const game2 = document.getElementById('minigame2_farmer');
document.addEventListener("keydown", function (event) {
    if (event.code === "ControlRight") {
      if(PLAYER.coins== 0 && isColliding(PLAYER.box,document.getElementById('Objekt13'),-150) && talkBox ){
        openConvo(1);
      }else if (isColliding(PLAYER.box,document.getElementById('Objekt14'),-150) && talkBox ){
        switchToShop()
        breakGameLoop()
        PLAYER.playedTimes++;
        
        
      }else if (isColliding(PLAYER.box,document.getElementById('Objekt15'),-150) && getComputedStyle(game2).display === 'none' && !PLAYER.isPlayingMin2 && talkBox ){
        openConvo(2);
      }else if (isColliding(PLAYER.box,document.getElementById('Objekt17'),-150)     && talkBox ){
        openConvo(3);
      }else if (isColliding(PLAYER.box,document.getElementById('Objekt12'),-150)  && PLAYER.level == 3){
        switchToSaloon()
        breakGameLoop()
      }
    }
  });