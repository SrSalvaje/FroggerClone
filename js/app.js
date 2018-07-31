///////////////////////////////////////////////////////////////////////////
/**************************global variables*****************************/
///////////////////////////////////////////////////////////////////////////
const boy = "images/char-boy.png",
 evilBug="images/enemy-bug.png",
 topBorder=0,
 bottomBorder=405,
 leftBorder=0,
 rightBorder=402,
 vertStep=83,
 latStep=101,
 eTop=60,
 eMiddle=eTop+vertStep,
 eBottom=eMiddle+vertStep;


//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(x, y, speed=0, imgSource){
        this.sprite=`${imgSource}`;
        this.x=x;
        this.y=y;
        this.speed=speed;

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    reset(){
    }
}

///////////////////////////////////////////////////////////////////////////
/*************************Enemy Constructor*******************************/
///////////////////////////////////////////////////////////////////////////
class Enemy extends Character{
    constructor(x,y, speed,imgSource) {
        super(x,y, speed, imgSource);
    // Variables applied to each of our instances go here,
        //set enemy initial location
        //set enemy speed
    }
    update(dt){
        if(this.x<rightBorder+101){
            this.x+=this.speed*dt;
            }else{
                this.x=0-latStep;
            }
        }
}

/////////////////////////////////////////////////////////////////////////
/**************************Enemy fucntions*****************************/
////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
/**************************player constructor*************************/
//////////////////////////////////////////////////////////////////////
class Player extends Character{
    constructor(x, y,speed,imgSource ){
        super(x, y,speed,imgSource);
    }
    //render method inherited from Character class
    update(){

    }

    handleInput (keyPressed){
        switch(keyPressed){
            case "up":
                if(this.y>=topBorder){
                    this.y -=vertStep;
                }
                break;
            case "down":
                //coordinate
                if(this.y<bottomBorder){
                    this.y += vertStep;
                }
                break;
            case "right":
                if(this.x<rightBorder){
                    this.x += latStep;
                }
                break;
            case "left":
                if(this.x>=leftBorder){
                    this.x -= latStep;
                }
                break;
            }
    }
}    

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
//evilBugs

/* ;

allEnemies.push(e1); */
const e1= new Enemy(0,60,100, evilBug);

const allEnemies=[];
allEnemies.push(e1);



//player
const player = new Player(200, 405,0, boy);
player.render();


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