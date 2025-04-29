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
    setTimeout(function(){
        document.getElementById('loadingSc').style.display = 'none';
        gameLoop()
    },4500)
    

}
function switchToShop(){
    killSides();
    moneyRefresh(0)
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
    gameSpeed: 10, 
    characterSpeed: 10,  //todo change to 10
}
// **** Main Game Loop ****
let isStanding= false;
function gameLoop(){
    let spriteSet = false;

    if (KEY_EVENTS.leftArrow || KEY_EVENTS.rightArrow || KEY_EVENTS.upArrow || KEY_EVENTS.downArrow) {
        if (!spriteSet) {  
            if (PLAYER.inHorseState) {
                setSprite(`url('./medien/sprites/horse${PLAYER.level}.png')`, 8);
            } else {
                setSprite(`url('./medien/sprites/sprite${PLAYER.level}.png')`, 4);
            }
            clearInterval(animationIn);
            isStanding = false;
            spriteSet = true;  
        }
    } else {
        if (!isStanding) {
            if (PLAYER.inHorseState) {
                setSprite(`url('./medien/sprites/horseStanding${PLAYER.level}.png')`, 8);
            } else {
                setSprite(`url('./medien/sprites/spriteStanding${PLAYER.level}.png')`, 4);
            }
            animationIn = setInterval(function() {
                animatePlayer();
            }, 200);
        }
        isStanding = true;
        spriteSet = false;  
    }
    if (KEY_EVENTS.leftArrow) {
            
        animatePlayer();
        movePlayer(GAME_CONFIG.characterSpeed, 0, -1);//right
    }
    if (KEY_EVENTS.rightArrow) {
        
        animatePlayer();
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, 1);//left
    }
    if (KEY_EVENTS.upArrow) {
        if(!KEY_EVENTS.rightArrow && !KEY_EVENTS.leftArrow) animatePlayer();
        
        
        movePlayer(0,GAME_CONFIG.characterSpeed, 0);//down
    }
    if (KEY_EVENTS.downArrow) {
        if(!KEY_EVENTS.rightArrow && !KEY_EVENTS.leftArrow) animatePlayer();
        
        
        movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);//up
    }
    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}

//library input for shop:

const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    effect: "slide", 
});

//shop functions:

function moneyRefresh(number){
    PLAYER.coins =+ number
    document.getElementById('moneyDisplayNumber').innerHTML = PLAYER.coins;
}

// map js:
let CAMERA = {
    x: PLAYER.coX, //todo set character to grave : left: -1148px; top: -9352px;  + todo set border on right left: -9850px; top : -5870px;+ left left: -10px; top: -5860px;
    y: PLAYER.coY,
    speed: GAME_CONFIG.characterSpeed
};

const viewport = document.getElementById("world_side");
const map = document.getElementById("map");

let viewportWidth, viewportHeight, mapWidth, mapHeight;

function updateDimensions() {
    viewportWidth = viewport.clientWidth;
    viewportHeight = viewport.clientHeight;
    mapWidth = map.offsetWidth;
    mapHeight = map.offsetHeight;
}
window.addEventListener('load', () => {
    updateDimensions();
    updateCamera(0,0); 
});
window.addEventListener('resize', updateDimensions);


window.addEventListener('resize', () => {
    viewportWidth = viewport.clientWidth;
    viewportHeight = viewport.clientHeight;
});
//Archivements
function showAchievement() {
    //todo add sound
    console.log("show")
    const toast = document.getElementById('achievement');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
}
