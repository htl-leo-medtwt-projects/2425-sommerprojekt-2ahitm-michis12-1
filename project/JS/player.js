
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
    level: 1,
    inHorseState: false,
    spriteLength: 4
}
let GAME_DATA1 = {

}
let GAME_DATA2 = {//Jsons to save Player Data

}
let GAME_DATA3 = {

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
    updateCamera(dx, dy)
    if (dr != 0 && dr != PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `translate(-50%, -50%) scaleX(${dr})`; 
    }
       
}
/***********************************
 * MOVE-MAP
 * **********************************/
function updateCamera(dx, dy) {
    CAMERA.x += dx;
    CAMERA.y += dy;
    
    CAMERA.x = Math.max(0, Math.min(CAMERA.x, mapWidth - viewportWidth));
    CAMERA.y = Math.max(0, Math.min(CAMERA.y, mapHeight - viewportHeight));

    map.style.left = -CAMERA.x + 'px';
    map.style.top = -CAMERA.y + 'px';
}


/***********************************
 * ANIMATE PLAYER
 * **********************************/
function setSprite(path, frameCount) {
    PLAYER.spriteImg.style.backgroundImage = path;
    PLAYER.spriteLength = frameCount;
    PLAYER.spriteImg.style.backgroundPosition = "0px 0px";
    PLAYER.spriteImg.style.width = (frameCount * 320) + "px";
}

function animatePlayer() {
    if (PLAYER.spriteImgNumber < PLAYER.spriteLength - 1) { 
        PLAYER.spriteImgNumber++;
        let x = -PLAYER.spriteImgNumber * 320;  
        PLAYER.spriteImg.style.backgroundPosition = `${x}px 0px`;  
    } else { 
        PLAYER.spriteImg.style.backgroundPosition = "0px 0px";  
        PLAYER.spriteImgNumber = 0;
    }
}
