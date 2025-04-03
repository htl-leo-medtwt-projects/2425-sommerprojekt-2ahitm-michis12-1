
/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('playerContainer'),
    spriteImg: document.getElementById('playerSprite'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    coins: 0,
    name: "placeholder",
    level: 0,
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
    /*
    // save original position
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    // calculate new position
    PLAYER.box.style.left = (originalX + dx) + 'px';
    PLAYER.box.style.top = (originalY + dy) + 'px';


    // update sprite direction if needed
    if (dr != 0 && dr != PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `scaleX(${dr})`;
    }
        */
}



/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {
    PLAYER.spriteLength = PLAYER.inHorseState ? 8 : 4;

    PLAYER.spriteImgNumber = (PLAYER.spriteImgNumber + 1) % PLAYER.spriteLength;

    let offsetX = -PLAYER.spriteImgNumber * 320;

    PLAYER.spriteImg.style.backgroundPosition = `${offsetX}px 0`;
    console.log('animate')
}



