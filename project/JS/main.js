/*********************/
/*Michael Scheuringer*/
/*------Main-JS------*/
/*********************/
killSides()
switchToStart()
setGoalDot(PLAYER.goalDotLeft, PLAYER.goalDotTop)
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
    savePlayerData()
    document.getElementById('settings_side').style.display = 'block'
}
function switchToStart(){
    killSides();
    savePlayerData()
    document.getElementById('start_side').style.display = 'block'

}
function switchToSave(){
    killSides();
    document.getElementById('savedGames_side').style.display = 'block'
}
function switchToPlay(nmb){
    
    killSides();
    document.getElementById('world_side').style.display = 'block'
    document.getElementById('world_side').style.visibility = 'visible';
    if(nmb == 1){
        setTimeout(function(){
            document.getElementById('loadingSc').style.display = 'none';
            gameLoop()
            PLAYER.startGame = true;
        },4500)
    }else{
        document.getElementById('loadingSc').style.display = 'none';
        gameLoop()
    }
    
    if(PLAYER.throwAchievement){
        setTimeout(function(){
            showAchievement()
        }, 7000)
        PLAYER.throwAchievement = false;
    }
    if(PLAYER.playedTimes == 1){
        setTimeout(function(){
            showHelp(1)
        }, 15000)
    }
    

}
function switchToShop(){
    killSides();
    moneyRefresh(0)
    document.getElementById('shop_side').style.display = 'block'
}
function switchToSaloon(){
    killSides();
    document.getElementById('saloon_side').style.display = 'block'
    deleteConvo()
    setTimeout(function(){
        document.getElementById('blurDiv').style.display= 'grid';
        document.getElementById('chaBoxBlur').style.backgroundImage = "url('./medien/cha/character4.png')";
        
        let j = 4
            
        setTimeout(function(){
            let convo2 = setInterval(() => {
                j--;
                console.log(j)
                if(j==3){
                    document.getElementById('convoTxt'+j).innerHTML=  'Welcome to the saloon cowboy...'
                    
                }else if (j==2){
                    document.getElementById('convoTxt'+j).innerHTML=  'Nice gun, you got there'
                }else if(j==1){
                    document.getElementById('convoTxt'+j).innerHTML= 'Shhheeyuu!'
                    clearInterval(convo2)
                }
            
            }, 120);
        },361)
        setTimeout(function(){
            document.getElementById('blurDiv').style.display= 'none';
            document.getElementById('saloon_side').style.backgroundImage = "url('./medien/backgrounds/endBG.png')";

            setTimeout(function(){
                showCongratsCowboy()
            },500)
        },5000)
    },1000)
    
}
function lastSwitch(){
    switchToStart()
    resetPlayerData()
}
function showCongratsCowboy() {
    const congrats = document.createElement('div');
    congrats.textContent = 'Respect Cowboy';
    congrats.id = 'congratsCowboy';
  
    Object.assign(congrats.style, {
      position: 'fixed',
      left: '-700px',
      top: '50px',
      fontSize: '930%',
      fontWeight: 'bold',
      color: 'black',
      padding: '10px 20px',
      zIndex: 14000,
      transition: 'left 1s ease-out',
    });
    const resetButton = document.createElement('div');
    resetButton.textContent = 'Reset Game';
    resetButton.classList.add('button');
    resetButton.style.zIndex = '14000';
    resetButton.style.position = 'absolute'
    resetButton.style.left = '50px'
    resetButton.style.bottom = '50px'
    resetButton.onclick = () => {
        lastSwitch();
        congrats.style.display = 'none'
        resetButton.style.display = 'none'
    }
    document.body.appendChild(congrats);
    document.body.appendChild(resetButton);
    setTimeout(() => {
      congrats.style.left = '50px';
    }, 100);

  }
  
function openOptions(){
    document.getElementById('world_side_options').style.display = 'flex'
    breakGameLoop()
}
function closeOptions() {
    document.getElementById('world_side_options').style.display = 'none';
    gameLoop()
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
    switchToPlay(1);
}
let GAME_CONFIG = {
    gameSpeed: 10, 
    characterSpeed: 12,  
}
function setGoalDot(nmb1, nmb2){
    document.getElementById('goalDotMap').style.left = nmb1+'px';
    document.getElementById('goalDotMap').style.top = nmb2+'px';
    PLAYER.goalDotLeft = nmb1;
    PLAYER.goalDotTop = nmb2;
}
// **** localStorage ****
function savePlayerData() {
    const playerData = {
        coX: PLAYER.coX,
        coY: PLAYER.coY,
        coins: PLAYER.coins,
        level: PLAYER.level,
        name: PLAYER.name,
        spriteDirection: PLAYER.spriteDirection,
        inHorseState: PLAYER.inHorseState,
        unlockedHorse: PLAYER.unlockedHorse,
        playedTimes: PLAYER.playedTimes,
        throwAchievement: PLAYER.throwAchievement,
        isPlayingMin2: PLAYER.isPlayingMin2,
        walkSpeed: PLAYER.walkSpeed,
        horseSpeed: PLAYER.horseSpeed,
        goalDotTop: PLAYER.goalDotTop,
        goalDotLeft: PLAYER.goalDotLeft

    };
    localStorage.setItem("playerData", JSON.stringify(playerData));
    const saveBox = document.getElementById("saveBox2");
    const plusImg = saveBox.querySelector(".plusImg");
    if (plusImg) plusImg.remove();

    const oldInfo = saveBox.querySelector("h1.saveInfo");
    if (oldInfo) oldInfo.remove();

    const info = document.createElement("h1");
    info.classList.add("saveInfo");
    info.textContent = `Level: ${PLAYER.level} | Coins: ${PLAYER.coins}`;
    saveBox.appendChild(info);

}
function loadPlayerData() {
    const data = localStorage.getItem("playerData");
    if (data) {
        const playerData = JSON.parse(data);
        PLAYER.coX = playerData.coX ?? PLAYER.coX;
        PLAYER.coY = playerData.coY ?? PLAYER.coY;
        PLAYER.coins = playerData.coins ?? PLAYER.coins;
        PLAYER.level = playerData.level ?? PLAYER.level;
        PLAYER.name = playerData.name ?? PLAYER.name;
        PLAYER.spriteDirection = playerData.spriteDirection ?? PLAYER.spriteDirection;
        PLAYER.inHorseState = playerData.inHorseState ?? PLAYER.inHorseState;
        PLAYER.unlockedHorse = playerData.unlockedHorse ?? PLAYER.unlockedHorse;
        PLAYER.playedTimes = playerData.playedTimes ?? PLAYER.playedTimes;
        PLAYER.throwAchievement = playerData.throwAchievement ?? PLAYER.throwAchievement;
        PLAYER.isPlayingMin2 = playerData.isPlayingMin2 ?? PLAYER.isPlayingMin2;
        PLAYER.walkSpeed = playerData.walkSpeed ?? PLAYER.walkSpeed;
        PLAYER.horseSpeed = playerData.horseSpeed ?? PLAYER.horseSpeed;
        PLAYER.goalDotTop = playerData.goalDotTop ?? PLAYER.goalDotTop;
        PLAYER.goalDotLeft = playerData.goalDotLeft ?? PLAYER.goalDotLeft;


        CAMERA.x = PLAYER.coX;
        CAMERA.y = PLAYER.coY;
        map.style.left = -CAMERA.x + 'px';
        map.style.top = -CAMERA.y + 'px';
        updateMinimapViewport();
    }
}
function resetPlayerData() {
    localStorage.removeItem("playerData");

    PLAYER.coX = 1400;
    PLAYER.coY = 9350;
    PLAYER.coins = 0;
    PLAYER.level = 0;
    PLAYER.name = "placeholder";
    PLAYER.spriteDirection = 1;
    PLAYER.inHorseState = false;
    PLAYER.unlockedHorse = false;
    PLAYER.playedTimes = 1;
    PLAYER.throwAchievement = false;
    PLAYER.isPlayingMin2 = false;
    PLAYER.walkSpeed = 12;
    PLAYER.horseSpeed = 22;
    PLAYER.goalDotTop = 190;
    PLAYER.goalDotLeft = 85;


    CAMERA.x = PLAYER.coX;
    CAMERA.y = PLAYER.coY;
    map.style.left = -CAMERA.x + 'px';
    map.style.top = -CAMERA.y + 'px';
    updateMinimapViewport();

    
    const saveBox = document.getElementById("saveBox2");

    const info = saveBox.querySelector("h1.saveInfo");
    if (info) info.remove();

    if (!saveBox.querySelector(".plusImg")) {
        const img = document.createElement("img");
        img.classList.add("plusImg");
        img.src = "./medien/items/plus.png";
        img.alt = "plus";
        saveBox.appendChild(img);
    }
    console.log("Reseted Player Data Successfull!");
}

// **** Main Game Loop ****
let isStanding= false;
let continueGame = true;
let imgS = document.getElementById('spriteImg')
let imgC = document.getElementById('playerContainer')
function gameLoop(){
    let spriteSet = false;
    console.log("gameLoopStart")

    if (KEY_EVENTS.leftArrow || KEY_EVENTS.rightArrow || KEY_EVENTS.upArrow || KEY_EVENTS.downArrow) {
        if (!spriteSet) {  
            if (PLAYER.inHorseState) {
                setSprite(`url('./medien/sprites/horse${PLAYER.level}.png')`, 8);
                PLAYER.spriteDiff = 2880;
                imgC.style.width= "450px"
                imgC.style.height= "450px"
                imgS.style.width = "23040px"
                imgS.style.height = "2880px"
                imgS.style.transform = "scale(0.15625)"
                GAME_CONFIG.characterSpeed= PLAYER.horseSpeed;
            } else {
                setSprite(`url('./medien/sprites/sprite${PLAYER.level}.png')`, 4);
                PLAYER.spriteDiff = 320;
                imgC.style.width= "100px"
                imgC.style.height= "100px"
                imgS.style.width = "2560px"
                imgS.style.height = "320px"
                imgS.style.transform = "scale(0.3125)"
                GAME_CONFIG.characterSpeed= PLAYER.walkSpeed;
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
        if(KEY_EVENTS.rightArrow && KEY_EVENTS.leftArrow) ;
        else animatePlayer();
        movePlayer(GAME_CONFIG.characterSpeed, 0, -1);//right
    }
    if (KEY_EVENTS.rightArrow) {
        if(KEY_EVENTS.leftArrow && KEY_EVENTS.rightArrow);
        else animatePlayer()
        
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, 1);//left
    }
    if (KEY_EVENTS.upArrow) {
        if(!KEY_EVENTS.rightArrow && !KEY_EVENTS.leftArrow) animatePlayer();
        else if(KEY_EVENTS.rightArrow && KEY_EVENTS.leftArrow) animatePlayer();
        
        movePlayer(0,GAME_CONFIG.characterSpeed, 0);//down
    }
    if (KEY_EVENTS.downArrow) {
        if(!KEY_EVENTS.rightArrow && !KEY_EVENTS.leftArrow) animatePlayer();
        else if(KEY_EVENTS.rightArrow && KEY_EVENTS.leftArrow) animatePlayer();

        
        movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);//up
    }
    if(continueGame){
        setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
    }
    
}
function breakGameLoop(){
    continueGame= false;
    setTimeout(function(){
        continueGame= true
    },500)
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
    console.log("refresh + "+PLAYER.coins)
    PLAYER.coins += number;
    document.getElementById('infoBoxMap').innerHTML= "Level: "+PLAYER.level+"/3 | Cash: "+PLAYER.coins;
    document.getElementById('moneyDisplayNumber').innerHTML = PLAYER.coins;
}
function buyItem(nmb){
    if(nmb ==1){
        if(PLAYER.level == 0 && PLAYER.coins > 5){
            PLAYER.level++;
            moneyRefresh(-5);
            //boughtSound
            document.getElementById("butSh1").style.display = "none";
            PLAYER.throwAchievement = true;
        }else errorBuy();
    }else if(nmb ==2){
        if(PLAYER.level == 1 && PLAYER.coins > 15){
            PLAYER.level++;
            moneyRefresh(-15);
            PLAYER.horseSpeed = 24
            PLAYER.walkSpeed = 14
            //boughtSound
            document.getElementById("butSh2").style.display = "none";
            PLAYER.throwAchievement = true;
        }else errorBuy();
    }else {
        if(PLAYER.level == 2 && PLAYER.coins >= 30){
            PLAYER.level++;
            moneyRefresh(-30);
            //boughtSound
            document.getElementById("butSh3").style.display = "none";
            PLAYER.throwAchievement = true;
        }else errorBuy();
    }
}
function errorBuy(){
    alert("You cant buy this item just now. Ether earn enough money or try buying the items above!")
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
    const toast = document.getElementById('achievement'+PLAYER.level);
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
}
function showHelp(nmb) {
    //todo add sound
    console.log("show")
    const toast = document.getElementById('help'+nmb);
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
}
//animation changeButton
let buttonCh = document.getElementById('changeButton')
let nmb = 1
function changedButton(){
    if(PLAYER.unlockedHorse){
        if(nmb == 1 ){
            buttonCh.src = './medien/items/hatToHorse.gif'
            nmb++;
            PLAYER.inHorseState= true;
        }else{
            buttonCh.src = './medien/items/horseToHat.gif'
            nmb--;
            PLAYER.inHorseState= false
        }
    }
}
// talking box+convo:
let talkBox;

function toggleBox(state, cha) {
    const img = document.getElementById("Objekt"+cha);

    if (state === 1) {
        if (talkBox) return; 

        talkBox = document.createElement("div");
        talkBox.className = "talk-box";
        if(cha == 13){
            talkBox.innerText = "Talk to Georgino Mc Gregor\n[STRG]";
        }else if(cha == 14) talkBox.innerText = "Enter the store to buy items\n[STRG]";
        else if(cha == 15) talkBox.innerText = "Talk to Conoral Ruffs\n[STRG]"
        else if (cha == 17) talkBox.innerText = "Talk to Ronaldinho Bandinho\n[STRG]"
        document.getElementById("map").appendChild(talkBox);
        const imgRect = img.getBoundingClientRect();
        const mapRect = document.getElementById("map").getBoundingClientRect();

        talkBox.style.left = (img.offsetLeft + img.offsetWidth / 2 - 70) + "px";
        talkBox.style.top = (img.offsetTop - 30) + "px"; 
    } else if (state === 2 && talkBox) {
        talkBox.remove();
        talkBox = null;
    }
}
let continueConvoIndex= 0;
function deleteConvo(){
    let i = 0;
    let deletingPro =setInterval(function(){
        i++;
        document.getElementById('convoTxt'+i).innerHTML = '';
        if(i==3){
           clearInterval(deletingPro);
        }
    },120) 
}
function openConvo(nmb){
    
    if(nmb== 1){

        if(continueConvoIndex == 0){
            document.getElementById('blurDiv').style.display= 'grid';
            breakGameLoop()
            document.getElementById('chaBoxBlur').style.backgroundImage = "url('./medien/cha/character1.png')";
            continueConvoIndex++;
        }else if(continueConvoIndex == 1){
            deleteConvo()
            let j = 4
            
            setTimeout(function(){
                let convo2 = setInterval(() => {
                    j--;
                    console.log(j)
                    if(j==3){
                        document.getElementById('convoTxt'+j).innerHTML=  'Are you brave enough bonehead?'
                        
                    }else if (j==2){
                        document.getElementById('convoTxt'+j).innerHTML=  'I give you 3 cards, choose the right one and you´ll get all my gold. Choose wrong, i´ll get all your bones! '
                    }else if(j==1){
                        document.getElementById('convoTxt'+j).innerHTML= 'The game is easy.'
                        clearInterval(convo2)
                    }
                
                }, 120);
            },361)
            continueConvoIndex++;
                
            
        }else if(continueConvoIndex== 2){
            document.getElementById('blurDiv').innerHTML = '';
            document.getElementById('minigame1_geier').style.display= 'block';
            continueConvoIndex = 0;
            
        }
        
    }else if (nmb == 2){
        if(continueConvoIndex == 0){
            document.getElementById('blurDiv').innerHTML= `
                <div id="mesBoxBlur">
                    <div class="speech-bubble">
                        <h1 id="convoTxt1">Hey there friend, nice hat!</h1>
                        <h1 id="convoTxt2">Why are you crosing the desert all alone?</h1>
                        <h1 id="convoTxt3">I need to get rid of this horse... it´s stuborn</h1>
                        <h1 id="convoTxt4">[STRG]</h1>
                    </div>
                </div>
                <div id="chaBoxBlur"></div>`
            document.getElementById('blurDiv').style.display= 'grid';
            breakGameLoop()
            document.getElementById('chaBoxBlur').style.backgroundImage = "url('./medien/cha/character2.png')";
            continueConvoIndex++;
        }else  if (continueConvoIndex == 1){
            deleteConvo()
            let j = 4
            
            setTimeout(function(){
                let convo2 = setInterval(() => {
                    j--;
                    console.log(j)
                    if(j==3){
                        document.getElementById('convoTxt'+j).innerHTML=  'Let´s have fun! Are you ready?'
                        
                    }else if (j==2){
                        document.getElementById('convoTxt'+j).innerHTML=  'You´ll get 10 tries. Hit the target and you´ll get some gold plus the horse! Otherwhise you´ll get nothing...'
                    }else if(j==1){
                        document.getElementById('convoTxt'+j).innerHTML= 'I´ll give you an hoop iron; throw it at the target!'
                        clearInterval(convo2)
                    }
                
                }, 120);
            },361)
            continueConvoIndex++;
        }else if(continueConvoIndex== 2){
            
            document.getElementById('minigame2_farmer').style.display= 'flex';
            PLAYER.isPlayingMin2 = true;
            continueConvoIndex++;
            deleteConvo()
        }else if (continueConvoIndex== 3){
            
            if(PLAYER.unlockedHorse){
                let j = 4
            
                setTimeout(function(){
                    let convo2 = setInterval(() => {
                        j--;
                        console.log(j)
                        if(j==3){
                            document.getElementById('convoTxt'+j).innerHTML=  'See you , stranger!'
                            
                        }else if (j==2){
                            document.getElementById('convoTxt'+j).innerHTML=  'Fine you´ll get the Horse and some money to take care of it...'
                        }else if(j==1){
                            document.getElementById('convoTxt'+j).innerHTML= 'You´re better than i thought.'
                            clearInterval(convo2)
                        }
                    
                    }, 120);
                },361)
                
            }else{
                let j = 4
            
                setTimeout(function(){
                    let convo2 = setInterval(() => {
                        j--;
                        console.log(j)
                        if(j==3){
                            document.getElementById('convoTxt'+j).innerHTML=  'See you , stranger!'
                            
                        }else if (j==2){
                            document.getElementById('convoTxt'+j).innerHTML=  'I´ll keep my horse take this money instead!'
                        }else if(j==1){
                            document.getElementById('convoTxt'+j).innerHTML= 'I tought you were better...'
                            clearInterval(convo2)
                        }
                    
                    }, 120);
                },361)
            }
            continueConvoIndex++;

        }else if(continueConvoIndex== 4){
            document.getElementById('blurDiv').style.display = 'none'
            moneyRefresh(25);
            continueConvoIndex = 0;
            document.getElementById('Objekt15').style.display = 'none'
            document.getElementById('Objekt16').style.display = 'none'
            gameLoop()
        }
        
    }else if(nmb == 3){
        if(continueConvoIndex == 0){
            document.getElementById('blurDiv').innerHTML= `
                <div id="mesBoxBlur">
                    <div class="speech-bubble">
                        <h1 id="convoTxt1">I need help!!!</h1>
                        <h1 id="convoTxt2">I mixed my Wanted-Bills together...</h1>
                        <h1 id="convoTxt3">Can you find the right ones??</h1>
                        <h1 id="convoTxt4">[STRG]</h1>
                    </div>
                </div>
                <div id="chaBoxBlur"></div>`
            document.getElementById('blurDiv').style.display= 'grid';
            breakGameLoop()
            document.getElementById('chaBoxBlur').style.backgroundImage = "url('./medien/cha/character3.png')";
            continueConvoIndex++;
        }else if (continueConvoIndex == 1){
            deleteConvo()
            let j = 4
            setTimeout(function(){
                let convo2 = setInterval(() => {
                    j--;
                    console.log(j)
                    if(j==3){
                        document.getElementById('convoTxt'+j).innerHTML=  'Are you ready?'
                        
                    }else if (j==2){
                        document.getElementById('convoTxt'+j).innerHTML=  'Find the right pairs.'
                    }else if(j==1){
                        document.getElementById('convoTxt'+j).innerHTML= 'Hurry! I cant be seen around here...'
                        clearInterval(convo2)
                    }
                
                }, 120);
            },361)
            continueConvoIndex++;
        }else if(continueConvoIndex == 2){
            continueConvoIndex++;
            deleteConvo()
            document.getElementById('minigame3_memory').style.display = 'flex'
            m3_startGame()
            let j = 4
            setTimeout(function(){
                let convo2 = setInterval(() => {
                    j--;
                    console.log(j)
                    if(j==3){
                        document.getElementById('convoTxt'+j).innerHTML=  ''
                        
                    }else if (j==2){
                        document.getElementById('convoTxt'+j).innerHTML=  'Take this gold...'
                    }else if(j==1){
                        document.getElementById('convoTxt'+j).innerHTML= 'i need to disapear!'
                        clearInterval(convo2)
                    }
                
                }, 120);
            },361)
        }else{
            
            document.getElementById('Objekt17').style.display = 'none'
            setTimeout(function(){
                
                document.getElementById('blurDiv').style.display = 'none'
                moneyRefresh(17)
            },1500)
        }
    }
}
/***********/
//MINIGAMES:
/***********/
const m1_container = document.getElementById("minigame1_geier");
const m1_messageEl = m1_container.querySelector("#m1_message");
const m1_cards = m1_container.querySelectorAll(".m1_card");

let m1_winningIndex = Math.floor(Math.random() * 3);

function m1_resetGame() {
    m1_winningIndex = Math.floor(Math.random() * 3);
    m1_messageEl.textContent = "Choose a card";
    m1_cards.forEach(card => {
      card.textContent = "";
      card.classList.remove("m1_revealed");
      card.style.setProperty("background-image", "url(./medien/backgrounds/card.png)", "important");
    });
}
function m1_handleCardClick(e) {
    const card = e.currentTarget;
    const index = parseInt(card.getAttribute("data-index"));
    card.classList.add("m1_revealed");

    if (index === m1_winningIndex) {
        card.style.setProperty("background-image", "url(./medien/backgrounds/card2.png)", "important");
      
        m1_messageEl.textContent = "Your good! Watch out little bonehead...";
        setTimeout(function(){
            gameLoop()
            document.getElementById('blurDiv').style.display= 'none';
            document.getElementById('minigame1_geier').style.display= 'none';
            moneyRefresh(8);
            document.getElementById('Objekt13').style.display= 'none'
            setGoalDot(74,111)
        },2000)
    } else {
        card.style.setProperty("background-image", "url(./medien/backgrounds/card3.png)", "important");
        m1_messageEl.textContent = "Wrong HAHA! The lord is mercyfull; I´ll gve you another chance...";
        setTimeout(m1_resetGame, 2000);
    }
}

m1_cards.forEach(card => {
    card.addEventListener("click", m1_handleCardClick);
});
//Minigame 2-------------------
const m2_powerBar = document.getElementById("m2_powerBar");
const m2_result = document.getElementById("m2_result");

let m2_position = 0;
let m2_direction = 1;
let m2_interval = null;
let m2_keyHeld = false;

function m2_startPowerBar() {
    m2_interval = setInterval(() => {
        m2_position += m2_direction * 6;
        if (m2_position >= 270 || m2_position <= 0) {
        m2_direction *= -1;
        }
        m2_powerBar.style.left = m2_position + "px";
    }, 16);
}
let m2_won = false;
let m2_tries = 10;
function m2_stopPowerBar() {
    clearInterval(m2_interval);
    m2_interval = null;

    const centerMin = 140;
    const centerMax = 150;
    const nearMin = 105;
    const nearMax = 195;
    m2_tries--;
    if (m2_position >= centerMin && m2_position <= centerMax) {
        m2_result.textContent = "You won the horse! Congrats";
        document.getElementById('m2_result').style.animation = 'hitTarget 0.5s infinite ease'
        document.getElementById('trowableIron').style.animation = 'trow1 0.6s 1 linear'
        m2_won = true;
        PLAYER.unlockedHorse= true;
        PLAYER.isPlayingMin2= false
        setGoalDot(74,111)
        setTimeout(function(){
            document.getElementById('minigame2_farmer').style.display = 'none'
        },2000)
    } else if (m2_position >= nearMin && m2_position <= nearMax) {
        m2_result.textContent = "You won the gold! Try better to earn the Horse aswell...";
        document.getElementById('trowableIron').style.animation = 'trow2 0.6s 1 linear'

    } else {
        m2_result.textContent = "Try again";
        document.getElementById('trowableIron').style.animation = 'trow3 0.7s 1 linear'

    }
    if(!m2_won){
        setTimeout(() => {
            if(m2_tries == 0){
                document.getElementById('minigame2_farmer').style.display = 'none'
                PLAYER.isPlayingMin2= false
            }
            m2_result.textContent = "Press and hold [Enter]"
            m2_position = 0;
            m2_powerBar.style.left = "0px";
            m2_direction = 1;
            document.getElementById('trowableIron').style.animation = 'none'
    
        }, 1500);
    }
    
    
}
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !m2_keyHeld ) {
      m2_keyHeld = true;
      m2_startPowerBar();
    }
  });
  
  window.addEventListener("keyup", (e) => {
    if (e.code === "Space" && m2_keyHeld) {
      m2_keyHeld = false;
      m2_stopPowerBar();
    }
  });
//Minigame3-----
const m3_images = [
    './medien/items/mem/img1.png', './medien/items/mem/img2.png', './medien/items/mem/img3.png', './medien/items/mem/img4.png',
    './medien/items/mem/img5.png', './medien/items/mem/img6.png', './medien/items/mem/img1.png', './medien/items/mem/img2.png',
    './medien/items/mem/img3.png', './medien/items/mem/img4.png', './medien/items/mem/img5.png', './medien/items/mem/img6.png'
]; 

let m3_shuffled = [];
let m3_selected = [];
let m3_matched = 0;
let m3_timer;
let m3_timeLeft = 40;
let m3_canClick = true;

const m3_board = document.getElementById("m3_gameboard");
const m3_result = document.getElementById("m3_result");
const m3_timerDisplay = document.getElementById("m3_timer");

function m3_shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function m3_startGame() {
    m3_shuffled = m3_shuffleArray([...m3_images]);
    m3_board.innerHTML = "";
    m3_selected = [];
    m3_matched = 0;
    m3_result.textContent = "";
    m3_canClick = true;

    m3_shuffled.forEach((img, index) => {
        const card = document.createElement("div");
        card.classList.add("m3_card");
        card.dataset.image = img;
        card.dataset.index = index;
        card.addEventListener("click", m3_cardClick);
        m3_board.appendChild(card);
    });

    m3_timeLeft = 40;
    m3_timerDisplay.textContent = "Time: " + m3_timeLeft;
    clearInterval(m3_timer);
    m3_timer = setInterval(() => {
        m3_timeLeft--;
        m3_timerDisplay.textContent = "Time: " + m3_timeLeft;
        if (m3_timeLeft <= 0) {
            clearInterval(m3_timer);
            m3_result.textContent = "Times up! Try again...";
            m3_canClick = false;
            setTimeout(function(){
                m3_startGame()
            },1500)
        }
    }, 1000);
}

function m3_cardClick(e) {
    if (!m3_canClick) return;

    const card = e.currentTarget;
    const index = card.dataset.index;
    if (m3_selected.some(sel => sel.index === index)) return;

    card.style.backgroundImage = `url('${card.dataset.image}')`;
    card.classList.add("revealed");

    m3_selected.push({ index, element: card });

    if (m3_selected.length === 2) {
        m3_canClick = false;

        const [first, second] = m3_selected;

        if (first.element.dataset.image === second.element.dataset.image) {
            m3_matched += 2;
            m3_selected = [];
            m3_canClick = true;
            
            if (m3_matched === m3_images.length) {
                clearInterval(m3_timer);
                m3_result.textContent = "Found all!";
                setGoalDot(74,111)
                gameLoop()
                setTimeout(function(){
                    document.getElementById('minigame3_memory').style.display = 'none'
                },1500)
            }
            } else {
            setTimeout(() => {
                first.element.style.backgroundImage = "";
                second.element.style.backgroundImage = "";
                first.element.classList.remove("revealed");
                second.element.classList.remove("revealed");
                m3_selected = [];
                m3_canClick = true;
            }, 1000);
        }
    }
}
// **** save before leave ****
window.addEventListener("beforeunload", savePlayerData);
window.onload = function () {
    loadPlayerData();
};
