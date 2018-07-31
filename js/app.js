///////////////////////////////////////////////////////////////////////////
/**************************global variables*****************************/
///////////////////////////////////////////////////////////////////////////
const boy = "images/char-boy.png";
const evilBug="enemy-bug.png";

//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(x, y, speed, imgSource){
        this.sprite=`${imgSource}`;
        this.x=x;
        this.y=y;
        this.speed=speed;

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        /* this methods needs to: 
            Updates the Enemy location
            Handle collision with the Player*/
        }
}

///////////////////////////////////////////////////////////////////////////
/*************************Enemy Constructor*******************************/
///////////////////////////////////////////////////////////////////////////
class Enemy extends Character{
    constructor(x,y, speed, imgSource) {
        super(x,y,speed, imgSource);
    // Variables applied to each of our instances go here,
        //set enemy initial location
        //set enemy speed
    }
}

/////////////////////////////////////////////////////////////////////////
/**************************Enemy fucntions*****************************/
////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
/**************************player constructor*************************/
//////////////////////////////////////////////////////////////////////
class Player extends Character{
    constructor(x, y, speed, imgSource ){
        super(x, y, speed, imgSource);
    }
    handleInput(){
        /* Recall that the player cannot move off screen 
        (so you will need to check for that and handle appropriately). */

        /* f the player reaches the water the game should be reset by moving 
        the player back to the initial location 
        (you can write a separate reset Player method to handle that). */
    }
}
///////////////////////////////////////////////////////////////////////////
/******************************player functions***************************/
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
/*********************************Gems************************************/
///////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////
/****************************************lives****************************/
///////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
/*******************************score**************************************/
////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////
/************************************shared functions***********************/
////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////
/******************************event listeners*******************************/
/////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////
/***********************instantiate your objects**************************/
///////////////////////////////////////////////////////////////////////////

// Place all enemy objects in an array called allEnemies
const allEnemies=[];
const player = new Player(200, 430, 10, boy);
player.render();
