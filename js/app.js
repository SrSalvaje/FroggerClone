"use strict";
//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(yPos, xPos,  speed={min:100, max:350}, startPos={/* player */playerY:654, playerX:301,/* Enemy */ r1:73, r2:156, r3:239, r4:322, r5:405, r6:488,r7:571, enemyX:-101,
    /* gems*/ }){
        //xPos and yPos are the only paraemters needed by Enemy and Player classes, 
        //rest of the parameters are assigned by Character constructor
        this.xPos=xPos;
        this.yPos=yPos;
        //this object holds all needed positions, I chose this format in order to make it scalable
        this.startPos=startPos;
        //Takes the numeric value stored in StartPos based on the string of xPos and yPos;the only two parameters 
        //needed by Player and Enemy
        this.x=startPos[xPos];
        this.y=startPos[yPos];
        //generates a random speed value
        this.speed=Character.randomSpeed(speed["min"], speed["max"]);
        //porperties used to keep charachter on canvas
        this.topAndLeftBorder=0;
        this.bottomBorder=607;
        this.rightBorder=604;

        this.sideStep=101;
        this.vertStep=83;
    }
    //function based on 'getRandomInt' of MDN web docs @
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    static randomSpeed(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return  Math.floor(Math.random() * (max - min)) + min; 
      }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

///////////////////////////////////////////////////////////////////////////
/*************************Enemy Constructor*******************************/
///////////////////////////////////////////////////////////////////////////
class Enemy extends Character{
    constructor(yPos,xPos, speed, startPos) {
        super(yPos,xPos,speed, startPos);
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
    constructor(yPos, xPos, speed,startPos){
        super(yPos, xPos, speed,startPos);
        //properties used to move characher, to move 'left' and/or 'up' value must be preceded by '-'
       
        //image to render
        this.sprite="images/char-boy.png";

    }
    update(){
        //////////check for x and y collision//////////////
         for(let enemy of allEnemies) {
            if(this.y === enemy.y && (enemy.x + 70 > this.x && enemy.x < this.x + 70) ) { // if enemies collied
                for(let enemy of allEnemies){//stops enemy movement
                    enemy.speed=0;
                }
                setTimeout(() => {  /// after 1 sec game reloads 
                    window.location.reload();
                }, 1000);
               
            }else if(this.y===-10){//if player reaches water game resets
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
                    console.log(this.x, this.y);
                }
                break;
            case "down":
                if(this.y < this.bottomBorder){
                    this.y += this.vertStep;
                    console.log(this.x, this.y);
                }
                break;
            case "right":
                if(this.x < this.rightBorder){
                    this.x += this.sideStep;
                    console.log(this.x, this.y);
                }
                break;
            case "left":
                if(this.x >= this.topAndLeftBorder){
                    this.x -= this.sideStep;
                    console.log(this.x, this.y);
                }
                break;
            }
    }
}    
///////////////////////////////////////////////////////////////////////////
/*********************************Gems************************************/
///////////////////////////////////////////////////////////////////////////
//this.speed=Character.randomSpeed(speed["min"], speed["max"]);

/* x range: -2 to 604 with  incrememnts of 101
   y range: 73 to 571 with increments of 83 */
class Gems extends Character{
    constructor(minX, maxX, minY, maxY, yPos,xPos,speed,startPos){
        super(yPos, xPos, speed, startPos);
        this.xCoordinates=[];
        this.yCoordinates=[];
        this.minX=minX;
        this.maxX=maxX;
        this.minY=minY;
        this.maxY=maxY;
        this.randomY=Gems.generateY(this.minY, this.maxY);
        this.y=this.randomY;
        this.randomx=Gems.generateX(this.minX, this.maxX);
        this.x= this.randomx;
        this.gemType=["images/Gem Blue.png",
                    "images/Gem Green.png", 
                    "images/Gem Orange.png",     
                    "images/Heart.png", 
                    "images/Star.png"];
        this.randomSprite=Character.randomSpeed(0,this.gemType.length);
        
        this.sprite=this.gemType[this.randomSprite];
    }

    update(){

    }
    //programatically generates all the x and y coordinates
   static generateX(minX, maxX){
        const xCoordinates=[];
       for(minX; minX<=maxX; minX+=101){
            xCoordinates.push(minX);
        }
       
       let randomIndex=Character.randomSpeed(0, xCoordinates.length);
       return xCoordinates[randomIndex];

    }
    static generateY(minY, maxY){ 
        const yCoordinates=[];
        for(minY;minY<=maxY;minY+=83){ 
        yCoordinates.push(minY);
        }
        let randomIndex= Character.randomSpeed(0, yCoordinates.length);
        return yCoordinates[randomIndex];
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

//enemies
const e1= new Enemy('r1','enemyX'),
e2=new Enemy('r2','enemyX'),
e3=new Enemy('r3','enemyX'),
e4=new Enemy('r4','enemyX'),
e5=new Enemy('r5','enemyX'),
e6=new Enemy('r6','enemyX'),
e7=new Enemy('r7','enemyX');

const allEnemies=[ e1 ,e2,e3,e4,e5,e6,e7];

//player
const player = new Player('playerY','playerX'); //parameters: ypos, xpos
/* player.render(); */

const g2 = new Gems(-2, 604, 73, 571);
g2.render();

//////////////////////////////////////////////////////////////////////////
/****************************************lives****************************/
///////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
/*******************************score**************************************/
////////////////////////////////////////////////////////////////////////////


 
 
   
/* static shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
} */