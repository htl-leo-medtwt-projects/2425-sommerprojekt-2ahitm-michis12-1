
/***********************************
 * GAME SCREEN
 ***********************************/
let GAME_SCREEN = {
    surface: document.getElementById('surface'),
    surfaceScale: '80%',
    redbox: document.getElementById('redBox'),
    startButton: document.getElementById('startButton'),
    debug_output: document.getElementById('debug_output')
}

// Scale the surface to xx% of the screen width
surface.style.transform = `scale(${parseFloat(GAME_SCREEN.surfaceScale)/100 * (window.innerWidth / surface.clientWidth)})`;



/***********************************
 * GAME CONFIG
 ***********************************/
let GAME_CONFIG = {
    gameSpeed: 30, // game loop refresh rate (pictures per second)
    characterSpeed: 7, // move offset in PX
    monsterSpeed: 3
}



/***********************************
 * START GAME
 * **********************************/
function startGame() {
    PLAYER.box.style.left = '1400px'; // starting position
    PLAYER.box.style.top = '600px'; // starting position
    PLAYER.spriteImg.style.right = '0px'; // starting animation

    gameLoop();
}
/***********************************
 * Claim Diamond
 * **********************************/
function diamondClaimed(){
    let randomX = randomNumber(1,91);
    document.getElementById('redBox').style.left = randomX+'vw'; 
    let randomY = randomNumber(1,91);
    document.getElementById('redBox').style.top = randomY+'vh'; 
    if(checkCollisionDia()){
        console.log("diamondCollided2")
        diamondClaimed();
    } 
    document.getElementById('redBox').style.transform = 'scale(1) rotateY(0deg)';
}
function randomNumber(min ,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkCollisionDia(){
    let colliding = isColliding(redBox, collisionBox1, 2) || 
                    isColliding(redBox, collisionBox2, 2) || 
                    isColliding(redBox, collisionBox3, 2) || 
                    isColliding(redBox, collisionBox4, 2) || 
                    isColliding(redBox, collisionBox5, 2) || 
                    isColliding(redBox, collisionBox6, 2) || 
                    isColliding(redBox, collisionBox7, 2) || 
                    isColliding(redBox, collisionBox8, 2);
    return colliding;
}
/***********************************
 * GAME LOOP
 * **********************************/
function useSpeed(){
    if(PLAYER.canSprint){
        PLAYER.isSprinting= true;
        speedUp.style.animation = "useTheSpeedUp 10s";
        spriteImg.style.bottom = 200 + "px";
        GAME_CONFIG.characterSpeed = 12;
        setTimeout(function(){
            GAME_CONFIG.characterSpeed = 7;
            spriteImg.style.bottom = 70 + "px";
            PLAYER.isSprinting= false;
        },10000)
        PLAYER.canSprint = false;
    }
}

let redBoxClaimed = false; 
function checkCollision(){
    let colliding = isColliding(player, collisionBox1, 0) || 
                    isColliding(player, collisionBox2, 0) || 
                    isColliding(player, collisionBox3, 0) || 
                    isColliding(player, collisionBox4, 0) ||
                    isColliding(player, collisionBox5, 0) || 
                    isColliding(player, collisionBox6, 0) ||
                    isColliding(player, collisionBox7, 0) ||
                    isColliding(player, collisionBox9, 0) ||
                    isColliding(player, collisionBox8, 0);
    if(isColliding(player, portalLeft, 20)){
        PLAYER.box.style.left = '1870px';
        PLAYER.box.style.top = '450px';
    }else if(isColliding(player, portalRight, 20)){
        PLAYER.box.style.left = '-7px';
        PLAYER.box.style.top = '800px';
    }
    return colliding;
}
let isStanding= false;
let loopMonster = true;
function gameLoop() {
    
    if(!checkCollision()){
        if(KEY_EVENTS.leftArrow || KEY_EVENTS.rightArrow || KEY_EVENTS.upArrow || KEY_EVENTS.downArrow){
            if(PLAYER.isSprinting){
                spriteImg.style.bottom = 200 + "px";
            }else{
                spriteImg.style.bottom = 70 + "px";
            }
            clearInterval(animationIn);
            isStanding = false
        }
        else{
            spriteImg.style.bottom = 135 + "px";
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
            if(checkCollision()) movePlayer(GAME_CONFIG.characterSpeed, 0, 0);//right
        }
        if (KEY_EVENTS.rightArrow) {
            movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
            animatePlayer();
            if(checkCollision()) movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, 0);//left
        }
        if (KEY_EVENTS.upArrow) {
            movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);
            animatePlayer();
            if(checkCollision()) movePlayer(0,GAME_CONFIG.characterSpeed, 0);//down
        }
        if (KEY_EVENTS.downArrow) {
            movePlayer(0, GAME_CONFIG.characterSpeed, 0);
            animatePlayer();
            if(checkCollision()) movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);//up
        }
    }
    if (isColliding(player, redBox, -13) && !redBoxClaimed) {
        redBoxClaimed = true;
        document.getElementById('redBox').style.animation = "appearAndSwing 2s ease-in-out forwards";
        diaSound()
        setTimeout(function () {
            diamondClaimed();
            redBoxClaimed = false; 
            document.getElementById('redBox').style.animation = "none";
        }, 1980);
        if(isColliding(redBox, collisionBox1, 0)){
            diamondClaimed()
            console.log("diamondCollided")
        }
        PLAYER.coinCount++;
        if(PLAYER.coinCount%5 == 0&& PLAYER.coinCount > 0){
            PLAYER.canSprint = true;
            speedUp.style.animation = "blinkSlow 2s infinite";
        } 
        document.getElementById('redBox').style.transform = 'scale(1) rotateY(0deg)';

    }

    if(loopMonster == true && PLAYER.coinCount > 10){
        let playerPos = player.getBoundingClientRect();
        let monsterPos = monster.getBoundingClientRect();
        let playerCenterX = playerPos.left + playerPos.width / 2;
        let playerCenterY = playerPos.top + playerPos.height / 2;
        let monsterCenterX = monsterPos.left + monsterPos.width / 2;
        let monsterCenterY = monsterPos.top + monsterPos.height / 2;

        if (monsterCenterX < playerCenterX) {
            monster.style.left = `${monster.offsetLeft + GAME_CONFIG.monsterSpeed}px`;
            monster.style.transform= `scaleX(-1)`;
            animateMonster();
        } else if (monsterCenterX > playerCenterX) {
            monster.style.left = `${monster.offsetLeft - GAME_CONFIG.monsterSpeed}px`;
            monster.style.transform= `scaleX(1)`;
            animateMonster(); 
        }
        if (monsterCenterY < playerCenterY) {
            monster.style.top = `${monster.offsetTop + GAME_CONFIG.monsterSpeed}px`;
        } else if (monsterCenterY > playerCenterY) {
            monster.style.top = `${monster.offsetTop - GAME_CONFIG.monsterSpeed}px`;
        }
        loopMonster = false;
    }    
    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
    setTimeout(function(){
        loopMonster= true;
    }, 80)
}


/***********************************
 * Switch UI
 * **********************************/
function switchPlaySide(){
    start.style.display = 'none';
    
    body.style.backgroundImage = 'url(./bilder/bgGame.png)';
    playBgMusic();
    startGame()
    inputWall.style.display = 'flex';
}
/***********************************
 * Audio
 * **********************************/
let bgAudio = new Audio('./media/bgSounds.mp3');
function playBgMusic(){
    bgAudio.play();
    bgAudio.loop = true;
    bgAudio.volume = 0.2; 
}
let screamAudio = new Audio('./media/cave-monster.mp3');
function Scream(){
    screamAudio.play();
    screamAudio.volume = 1;

}
/*
let clickSound = new Audio('./media/click.mp3');
function click(){
    clickSound.play();
    clickSound.volume = 0.8;
}*/
let diaSnd = new Audio('./media/diam.mp3');
function diaSound(){
    diaSnd.play();
    diaSnd.volume = 1;
}
/***********************************
 * Input
 * **********************************/
function getName(){
    let name = document.getElementById('playerName').value;
    PLAYER.name = name;
    inputWall.style.display = 'none';
    game.style.display = 'block';
}