/**
 * Checks intersection between two html elements
 * @param {HTMLElement} div1 - Reference to first html element (PLAYER)
 * @param {HTMLElement} div2 - Reference to second html element (ITEM)
 * @param {number} tolerance - Integer to change accuracy of collission (0: default, negative number: detect later, positive number: detect earlier) 
 * @returns {boolean} - true or false depending on collision
 */
function isColliding(div1, div2, tolerance = 0) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect(); 

    return !(
        rect1.right - tolerance < rect2.left + tolerance ||
        rect1.left + tolerance > rect2.right - tolerance ||
        rect1.bottom - tolerance < rect2.top + tolerance ||
        rect1.top + tolerance > rect2.bottom - tolerance
    );
}


function checkCollision() {
    let tolerance = 40;
    if(PLAYER.inHorseState) tolerance = 120
    for (let i = 1; i <= 14; i++) {
        const objekt = document.getElementById(`Objekt${i}`);
        if (objekt && isColliding(PLAYER.box, objekt, tolerance)) {
            return true;
        }
    }
    for(let i = 12; i <= 14;i++){
        if(isColliding(PLAYER.box,document.getElementById('Objekt'+i),-250)){
            document.getElementById('Objekt'+i).style.animation = 'goalDot 2s ease-in-out infinite';
        }else document.getElementById('Objekt'+i).style.animation = 'none';
    }
    if(isColliding(PLAYER.box,document.getElementById('Objekt13'),-150)){
        toggleBox(1,13)
        
    }else toggleBox(2,13);
   
    
    return false;
}

