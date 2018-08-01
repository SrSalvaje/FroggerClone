///////////////////////////////////////////////////////////////////////////
/**************************global variables*****************************/
///////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(yPos, speed=0, xPos, startPos={/* player */playerY:405, playerX:200,/* Enemy */ topEnemy:73, middleEnemy:156, bottomEnemy:239, enemyX:0}){
        this.startPos=startPos;
        this.xPos=xPos;
        this.x=startPos[xPos];
        this.yPos=yPos;
        this.y=startPos[yPos]
        this.speed=speed;
        //porperties used to keep charachter on canvas
        this.topAndLeftBorder=0;
        this.bottomBorder=405;
        this.rightBorder=402;
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
    constructor(yPos, speed,xPos,startPos) {
        super(yPos,speed,xPos,startPos);
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
    constructor(yPos,speed,xPos,startPos){
        super(yPos, speed,xPos,startPos);
        //properties used to move characher, for 'left' and/or 'up' value must be preceded by '-'
        this.sideStep=101;
        this.vertStep=83;
        //image to render
        this.sprite="images/char-boy.png";

    }
    //render method inherited from Character class
    update(){
        for(let enemy of allEnemies){
            if(enemy.x===player.x){
                console.log("horizontal clash");
            }
        }
       
    }
    handleInput (keyPressed){
        switch(keyPressed){
            case "up":
                if(this.y >= 0){
                    this.y-=this.vertStep;
                    console.log(`current y:${player.y}`);
                }
                break;
            case "down":
                if(this.y < this.bottomBorder){
                    this.y += this.vertStep;
                    console.log(`current y:${player.y}`);
                }
                break;
            case "right":
                if(this.x < this.rightBorder){
                    this.x += this.sideStep;
                    console.log(`current x:${player.x}`);
                }
                break;
            case "left":
                if(this.x >= this.topAndLeftBorder){
                    this.x -= this.sideStep;
                    console.log(`current x:${player.x}`);
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
/* function createEnemy(num){

} */
//enemies
const e1= new Enemy('topEnemy',100,'enemyX'),
e2=new Enemy('middleEnemy',200,'enemyX'),
e3=new Enemy('bottomEnemy',150,'enemyX');

 const allEnemies=[e1,e2,e3];
/* allEnemies.push(e1); */
/* allEnemies.push(e2,e3); */



//player
const player = new Player('playerY',0,'playerX'); //parameters: ypos, speed, xpos
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
