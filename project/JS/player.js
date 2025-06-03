
/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('playerContainer'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    coins: 0,
    name: "placeholder",
    level: 0,
    inHorseState: false,
    spriteLength: 4,
    coX: 1400,
    coY: 9350,
    spriteDiff: 320,
    horseSpeed: 22,
    walkSpeed: 52,
    startGame: false,
    throwAchievement: false,
    playedTimes: 1,
    unlockedHorse : false,
    isPlayingMin2: false,
    goalDotTop: 190,
    goalDotLeft: 85
}




/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: look left || 1: look right)
 */
function movePlayer(dx, dy, dr) {
    /*if(isColliding(PLAYER.box, document.getElementById('map'), 30)){
        
    }*/
    updateCamera(-dx, -dy)
    if (dr != 0 && dr != PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `translate(-50%, -50%) scaleX(${dr})`; 
    }
    PLAYER.coX = CAMERA.x;
    PLAYER.coY = CAMERA.y;
}
/***********************************
 * MOVE-MAP
 * **********************************/
function updateCamera(dx, dy) {
    if(!PLAYER.startGame){
        CAMERA.x += dx;
        CAMERA.y += dy;

        const maxCamX = mapWidth - viewportWidth / 2;
        const maxCamY = mapHeight - viewportHeight / 2;

        const minCamX = -viewportWidth / 2;
        const minCamY = -viewportHeight / 2;

        map.style.left = -CAMERA.x + 'px';
        map.style.top = -CAMERA.y + 'px';
        updateMinimapViewport()
    }else{
        if(!checkCollision()){
            CAMERA.x += dx;
            CAMERA.y += dy;
    
            const maxCamX = mapWidth - viewportWidth / 2;
            const maxCamY = mapHeight - viewportHeight / 2;
    
            const minCamX = -viewportWidth / 2;
            const minCamY = -viewportHeight / 2;
    
            map.style.left = -CAMERA.x + 'px';
            map.style.top = -CAMERA.y + 'px';
            updateMinimapViewport()
        }else {
            let oldX = CAMERA.x;
            let oldY = CAMERA.y;
            CAMERA.x += dx;
            map.style.left = -CAMERA.x + 'px';
            if (checkCollision()) {
                CAMERA.x = oldX; 
                map.style.left = -CAMERA.x + 'px';
            }
            CAMERA.y += dy;
            map.style.top = -CAMERA.y + 'px';
            if (checkCollision()) {
                CAMERA.y = oldY; 
                map.style.top = -CAMERA.y + 'px';
            }
            updateMinimapViewport();
        }
    }
    
}
const minimapViewport = document.getElementById("dotMap");


const mapHeight2 = 10266;
const minimapHeight = 200;
const scale = minimapHeight / mapHeight2;

function updateMinimapViewport() {
    const scrollX = map.offsetLeft * -1;
    const scrollY = map.offsetTop * -1;
    
    minimapViewport.style.left = `${scrollX * scale + 16.5}px`;
    minimapViewport.style.top = `${scrollY * scale + 14}px`;
   /* 
    let mountain = document.getElementById('miniMapMountain');
    mountain.style.width = 600*scale+"px";
    mountain.style.top = 7000*scale+"px"
    mountain.style.left = 2000*scale+"px"*/
}



/***********************************
 * ANIMATE PLAYER
 * **********************************/
function setSprite(path, frameCount) {
    PLAYER.spriteImg.style.backgroundImage = path;
    PLAYER.spriteLength = frameCount;
    PLAYER.spriteImg.style.backgroundPosition = "0px 0px";
    PLAYER.spriteImg.style.width = (frameCount * PLAYER.spriteDiff) + "px";
}

function animatePlayer() {
    if (PLAYER.spriteImgNumber < PLAYER.spriteLength - 1) { 
        PLAYER.spriteImgNumber++;
        let x = -PLAYER.spriteImgNumber * PLAYER.spriteDiff;  
        PLAYER.spriteImg.style.backgroundPosition = `${x}px 0px`;  
    } else { 
        PLAYER.spriteImg.style.backgroundPosition = "0px 0px";  
        PLAYER.spriteImgNumber = 0;
    }
}
