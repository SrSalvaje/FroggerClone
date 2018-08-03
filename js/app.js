"use strict";
///////////////////////////////////////////////////////////////////////////
/**************************global variables*****************************/
///////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(yPos, speed=0, xPos, startPos={/* player */playerY:654, playerX:301,/* Enemy */ r1:73, r2:156, r3:239, r4:322, r5:405, r6:488,r7:571,  enemyX:-101}){
        this.startPos=startPos;
        this.xPos=xPos;
        this.x=startPos[xPos];
        this.yPos=yPos;
        this.y=startPos[yPos]
        this.speed=speed;
        //porperties used to keep charachter on canvas
        this.topAndLeftBorder=0;
        this.bottomBorder=607;
        this.rightBorder=604;
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
    /* getRandomSpeed(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            speed=Math.floor(Math.random() * (max - min)) + min;
            return speed; 
          } */
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
    update(){
        //////////check for x and y collision//////////////
         for(let enemy of allEnemies) {
            if(this.y === enemy.y && (enemy.x + 70 > this.x && enemy.x < this.x + 70) ) {
                for(let enemy of allEnemies){//stops enemy movement
                    enemy.speed=0;
                }
                setTimeout(() => {  /// after 1 sec game reloads 
                    window.location.reload();
                }, 1000);
               
            }else if(this.y===-10){//if player reaches water
                this.reset();
            }
        } 
    }
    reset(){
        this.x=this.startPos["playerX"];
        this.y=this.startPos["playerY"];

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
///keeps screen from scrolling///////////
window.addEventListener("keydown", function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
        e.preventDefault();
    });

///////////////////////////////////////////////////////////////////////////
/***********************instantiate your objects**************************/
///////////////////////////////////////////////////////////////////////////
/* function createEnemy(num){

} */
//enemies
const e1= new Enemy('r1',100,'enemyX'),
e2=new Enemy('r2',200,'enemyX'),
e3=new Enemy('r3',150,'enemyX'),
e4=new Enemy('r4',250,'enemyX'),
e5=new Enemy('r5',300,'enemyX'),
e6=new Enemy('r6',190,'enemyX'),
e7=new Enemy('r7',100,'enemyX');

 const allEnemies=[e1 ,e2,e3,e4,e5,e6,e7,e6];




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

