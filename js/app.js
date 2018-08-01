///////////////////////////////////////////////////////////////////////////
/**************************global variables*****************************/
///////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(x, y, speed=0){
        this.x=x;
        this.y=y;
        this.speed=speed;
        //porperties used to keep charachter on canvas
        this.topAndLeftBorder=0;
        this.bottomBorder=405;
        this.rightBorder=402;
//properties used to set initial place for enemies 
        this.topEnemy=73;
        this.middleEnemy=this.topEnemy+83;
        this.bottomEnemy=this.middleEnemy+83;
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
    constructor(x,y, speed) {
        super(x,y, speed);
         //image to render
         this.sprite="images/enemy-bug.png";
    }
    update(dt){
        //this conditional moves and loops the enemy
        if(this.x< this.rightBorder+100){//checks that charachter is inside canvas
            this.x+=this.speed*dt;//if so, it changes its value based on speed and dt
            }else{//if charcter is outside canvas, it resets its x position to render just outside left border
                this.x=-83;
            }
        }

}

//////////////////////////////////////////////////////////////////////
/**************************player constructor*************************/
//////////////////////////////////////////////////////////////////////
class Player extends Character{
    constructor(x, y,speed){
        super(x, y,speed);
        //properties used to move characher, for 'left' and/or 'up' value must be preceded by '-'
        this.sideStep=101;
        this.vertStep=83;
        //image to render
        this.sprite="images/char-boy.png";
    }
    //render method inherited from Character class
    update(){
    }

    handleInput (keyPressed){
        switch(keyPressed){
            case "up":
                if(this.y >= 0){
                    this.y-=this.vertStep;
                }
                break;
            case "down":
                if(this.y < this.bottomBorder){
                    this.y += this.vertStep;
                }
                break;
            case "right":
                if(this.x < this.rightBorder){
                    this.x += this.sideStep;
                }
                break;
            case "left":
                if(this.x >= this.topAndLeftBorder){
                    this.x -= this.sideStep;
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

//enemies
const e1= new Enemy(0,73,100);
const allEnemies=[];
allEnemies.push(e1);
/* allEnemies.push(e2,e3); */



//player
const player = new Player(200, 405,0); //parameters: x, y and speed
player.render();


///////////////////////////////////////////////////////////////////////////
/*********************************Gems************************************/
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
/****************************************lives****************************/
///////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
/*******************************score**************************************/
////////////////////////////////////////////////////////////////////////////
