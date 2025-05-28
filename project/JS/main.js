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
        PLAYER.startGame = true;
    },4500)
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
    characterSpeed: 12,  
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
    },100)
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
        if(PLAYER.level == 2 && PLAYER.coins > 30){
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
    if(PLAYER.level > 0){
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
            talkBox.innerText = "Talk to Georgino Mc Gregor\n[STRG drücken]";
        }else if(cha == 14) talkBox.innerText = "Enter the store to buy items\n[STRG drücken]";
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
function openConvo(nmb){
    if(nmb== 1){
        if(continueConvoIndex == 0){
            document.getElementById('blurDiv').style.display= 'grid';
            breakGameLoop()
            document.getElementById('chaBoxBlur').style.backgroundImage = "url('./medien/cha/character1.png')";
            continueConvoIndex++;
        }else if(continueConvoIndex == 1){
            let i = 0;
            let deletingPro =setInterval(function(){
                i++;
                document.getElementById('convoTxt'+i).innerHTML = '';
                if(i==3){
                   clearInterval(deletingPro);
                }
            },120) 
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
            document.getElementById('goalDotMap').style.left = 74+'px';
            document.getElementById('goalDotMap').style.top = 111+'px';
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