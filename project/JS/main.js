/*********************/
/*Michael Scheuringer*/
/*------Main-JS------*/
/*********************/
killSides()
switchToStart()
// **** Hover ****
function loadPlayButton() {
    document.getElementById('buttonPlayImg').src = "./medien/items/revolver (1).gif";
}

function unLoadPlayButton() {
    document.getElementById('buttonPlayImg').src = "./medien/items/revolver (2).gif";
}
// **** Side switch functions ****
function switchToSettings(){
    killSides();
    document.getElementById('settings_side').style.display = 'block'
}
function switchToStart(){
    killSides();
    document.getElementById('start_side').style.display = 'block'
}
function switchToSave(){
    killSides();
    document.getElementById('savedGames_side').style.display = 'block'
}
function switchToPlay(){
    killSides();
    document.getElementById('world_side').style.display = 'block'
    document.getElementById('world_side').style.visibility = 'visible';
    gameLoop()

}
function switchToShop(){
    killSides();
    document.getElementById('shop_side').style.display = 'block'
}
function switchToSaloon(){
    killSides();
    document.getElementById('saloon_side').style.display = 'block'
}
function openOptions(){
    document.getElementById('world_side_options').style.display = 'block'
    
}
function killSides(){
    document.getElementById('start_side').style.display = 'none';
    document.getElementById('world_side_options').style.display = 'none';
    document.getElementById('world_side').style.display = 'none';
    document.getElementById('world_side').style.visibility = 'hidden';
    document.getElementById('shop_side').style.display = 'none';
    document.getElementById('saloon_side').style.display = 'none';
    document.getElementById('savedGames_side').style.display = 'none';
    document.getElementById('settings_side').style.display = 'none';
}
// **** Basic Functions ****
function startSavedGame(gameId){
    switchToPlay();
}
let GAME_CONFIG = {
    gameSpeed: 30, 
    characterSpeed: 7, 
}
// **** Main Game Loop ****
let isStanding= false;
function gameLoop(){
    if(KEY_EVENTS.leftArrow || KEY_EVENTS.rightArrow || KEY_EVENTS.upArrow || KEY_EVENTS.downArrow){
        if(PLAYER.inHorseState){
            setSprite(`url('./medien/sprites/horse${PLAYER.level}.png')`, 8)
            
        }else{
            setSprite(`url('./medien/sprites/sprite${PLAYER.level}.png')`,4)
            
        }
        clearInterval(animationIn);
        isStanding = false
    }
    else{
        if(PLAYER.inHorseState){
            setSprite(`url('./medien/sprites/horseStanding${PLAYER.level}.png')`, 8)        
        }else{
            setSprite(`url('./medien/sprites/spriteStanding${PLAYER.level}.png')`,4)
        }
        if(!isStanding){
            animationIn = setInterval(function(){
                animatePlayer()
            },100)
        }
        isStanding= true;
    }
    if (KEY_EVENTS.leftArrow) {
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, -1);
        animatePlayer();
        movePlayer(GAME_CONFIG.characterSpeed, 0, 0);//right
    }
    if (KEY_EVENTS.rightArrow) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
        animatePlayer();
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, 0);//left
    }
    if (KEY_EVENTS.upArrow) {
        movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);
        animatePlayer();
        movePlayer(0,GAME_CONFIG.characterSpeed, 0);//down
    }
    if (KEY_EVENTS.downArrow) {
        movePlayer(0, GAME_CONFIG.characterSpeed, 0);
        animatePlayer();
        movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);//up
    }
    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}