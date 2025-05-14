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


function checkCollision(){
    return isColliding(PLAYER.box, document.getElementById('Objekt1'), 0);
}