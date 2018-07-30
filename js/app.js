
// Enemies our player must avoid
class Enemy{
    constructor() {
    // Variables applied to each of our instances go here,
        this.sprite="images/enemy-bug.png";
        //set enemy initial location
        //set enemy speed
    }
    update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    /* this methods needs to: 
        Updates the Enemy location
        Handle collision with the Player*/
    }
    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//player class
class Player{
    constructor(){
        this.sprite="images/char-boy.png";
        //set player inital location
        //
    }
    update(){
        //similar to enemy

    }
    render(){
        //use code from enemy
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    handleInput(){
        /* Recall that the player cannot move off screen 
        (so you will need to check for that and handle appropriately). */

        /* f the player reaches the water the game should be reset by moving 
        the player back to the initial location 
        (you can write a separate reset Player method to handle that). */
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies=[];
// Place the player object in a variable called player
const player = new Player();