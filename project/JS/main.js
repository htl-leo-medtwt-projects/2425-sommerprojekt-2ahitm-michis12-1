/*********************/
/*Michael Scheuringer*/
/*------Main-JS------*/
/*********************/

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
    document.getElementById('shop_side').style.display = 'none';
    document.getElementById('saloon_side').style.display = 'none';
    document.getElementById('savedGames_side').style.display = 'none';
    document.getElementById('settings_side').style.display = 'none';
}
// **** Basic Functions ****
function startSavedGame(gameId){
    switchToPlay();
}