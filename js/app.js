"use strict";
/////////////////////////////////////////////////////////////////////////
/******************************** Gobal Variables********************* */
//////////////////////////////////////////////////////////////////////////
const score = document.querySelector(".scoreC"),
playerLife = document.querySelector(".lifeC");
let lifeCount=1,
scoreCount=0,
timeC=0;
/////////////////////////////internal clock for gem auto respawn/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
setInterval(() => { 
    timeC++;
    if(timeC%5===0){
        allGems.length=0;
         g1=new Gems(-2, 604, 73, 571);
        g2 = new Gems(-2, 604, 73, 571);
        g3=new Gems(-2, 604, 73, 571);
        allGems.push(g1,g2,g3);
    };
    if(timeC%10===0 && lives.length>0){
        lives.length=0;
    };
    if(timeC%30===0 && lives.length===0){
            l1=new Lives(-2, 604, 73, 571);
            lives.push(l1);
    }
    
}, 1000);
//////////////////////////////////////////////////////////////////////////
/*****************************a class to rule them all***********************/
//////////////////////////////////////////////////////////////////////////

class Character{
    constructor(yPos, xPos, startPos={/* player */playerY:654, playerX:301,/* Enemy */ r1:73, r2:156, r3:239, r4:322, r5:405, r6:488,r7:571, enemyX:-101,
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
        
        //values used to keep charachter on canvas
        this.topAndLeftBorder=0;
        this.bottomBorder=607;
        this.rightBorder=604;
        // values needed to move vertically and horizontally
        this.sideStep=101;
        this.vertStep=83;
    }

    //function based on 'getRandomInt' of MDN web docs @
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    static randomize(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return  Math.floor(Math.random() * (max - min)) + min; 
      }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    CheckCollision(array, codeToRun){
        array.forEach(element => {
                if(this.y === element.y && (element.x+70 > this.x && element.x < this.x+70)) {
                    codeToRun(element);
                }
        });
    }
}

///////////////////////////////////////////////////////////////////////////
/*************************Enemy Constructor*******************************/
///////////////////////////////////////////////////////////////////////////
class Enemy extends Character{
    constructor(yPos,xPos, startPos) {
        super(yPos,xPos, startPos);
         //image to render
         this.sprite="images/enemy-bug.png";
         //generates a random speed value for enemies
         this.minSpeed=100;
         this.maxSpeed=250;
         this.speed=Character.randomize(this.minSpeed, this.maxSpeed);
    }
    update(dt){
        //this conditional moves and loops the enemy
        if(this.x< this.rightBorder+100){//checks that charachter is inside canvas
            this.x+=this.speed*dt;//if so, it changes its value based on speed and dt
            }else{//if charcter is outside canvas, it resets its x position to render just outside left border
                this.x=-this.vertStep;
            };       
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
        this.CheckCollision(allEnemies, this.deadOrAlive);
        if(this.y===-10){//if player reaches water game resets
            this.reset();//change this for victory message
        }
        this.CheckCollision(allGems, this.keepScore);
        this.CheckCollision(lives, this.pickLife);
        
    }

    reset(){
        this.x=this.startPos["playerX"];
        this.y=this.startPos["playerY"];
    }

    deadOrAlive(){
        if(lifeCount>1){
            lifeCount-=1;
            playerLife.innerHTML=lifeCount;
            player.reset();
        }else if(lifeCount===1){
            for(let enemy of allEnemies){//stops enemy movement
                enemy.speed=0;
            }
            setTimeout(() => {  /// after 1 sec game reloads 
                window.location.reload(); //add gameover modal
            }, 1000);
        } 
    }

    keepScore(element){
        scoreCount+= element.gemValue[element.sprite]; //increase score based on gem value
        score.innerHTML=`${scoreCount}`;  //update DOM    
        allGems.splice(allGems.indexOf(element),1); //remove the collected gem from the rendering array
        //next lines are used to increase speed every time 500 points are acumulated, because score incrmements unevenly, based on gem value, the script rounds it down
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
        let divide=scoreCount/100; //first divide the score by a 100 in order to turn it into decimal points so 525 turns into 5.25
        let round = Math.trunc(divide); //then round it down to the nearest integer, this gets rid of the decimal points so 5.25 turns into 5
        let multiply = round*100; //then multiply it by 100 so 5 is now 500
        if(round!==0 && multiply%500===0){ // check if its a multiple of 500 and if so,  run the the code
            allEnemies.forEach(element => {
                if(element.minSpeed<300){ //if the min speed of Enemy is less than 300
                    element.minSpeed+=10; // increase it by 10
                };
                if(element.maxSpeed<350){ //if the max speed is less than 350
                    element.maxSpeed+=5; // increase it by 5
                }
                element.speed=Character.randomize(element.minSpeed, element.maxSpeed); // randomize and update the current speed of all enemies based on new min and max values
            });
            console.log(`score is ${scoreCount}, min speed is now ${e1.minSpeed}, max speed is now ${e1.maxSpeed}, and e1 current speed is ${e1.speed}`);
            
        };   
        if(allGems.length === 0){ //if all from a set of 3 are collected
            scoreCount+=50;//give 50 point bonus
            score.innerHTML=`${scoreCount}`;  //update DOM   
            setTimeout(() => { //then wait 1 sec before respawning new gems
                if(allEnemies.length===0){ //checks condition again to ensure that gem auto respawn hasnt filled the array again
                g1=new Gems(-2, 604, 73, 571);
                g2 = new Gems(-2, 604, 73, 571);
                g3=new Gems(-2, 604, 73, 571);
                allGems.push(g1,g2,g3);
                }
            }, 1000);      
        }
        
    }
    pickLife(){
        lifeCount+=1;
        playerLife.innerHTML=lifeCount;
        lives.splice(0,1);
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
///////////////////////////////////////////////////////////////////////////
/*********************************Gems************************************/
///////////////////////////////////////////////////////////////////////////


/* x range: -2 to 604 with  incrememnts of 101
   y range: 73 to 571 with increments of 83 */
class Gems extends Character{
    constructor(minX, maxX, minY, maxY, yPos,xPos,speed,startPos){
        super(yPos, xPos, speed, startPos);
        this.minX=minX;
        this.maxX=maxX;
        this.minY=minY;
        this.maxY=maxY;
        this.y=Gems.generateCoor(this.minY, this.maxY, this.vertStep);
        this.x= Gems.generateCoor(this.minX, this.maxX, this.sideStep);
        this.gemType=["images/Gem Blue.png",
                    "images/Gem Green.png", 
                    "images/Gem Orange.png"];
        this.gemValue={"images/Gem Blue.png":50, 
                        "images/Gem Green.png":75,
                        "images/Gem Orange.png":100 
                         };
        this.sprite=this.gemType[Character.randomize(0,this.gemType.length)];
    }
    //programatically generates all the x and y coordinates
    //fix: coordinates can repeat meaning more than 1 item renders in same place
   static generateCoor(min, max, step){
        const coordinates=[];
       for(min; min<=max; min+=step){
            coordinates.push(min);
        }
       let randomIndex=Character.randomize(0, coordinates.length);
       return coordinates[randomIndex];
    }
}
//////////////////////////////////////////////////////////////////////////
/****************************************lives****************************/
///////////////////////////////////////////////////////////////////////////
class Lives extends Gems{
    constructor(minX, maxX, minY, maxY, yPos,xPos,speed,startPos){
        super(minX, maxX, minY, maxY, yPos, xPos, speed, startPos);
        this.y=Gems.generateCoor(this.minY, this.maxY, this.vertStep);
        this.x= Gems.generateCoor(this.minX, this.maxX, this.sideStep);
        this.gemType="images/Heart.png";
        this.sprite=this.gemType;
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
/***********************instantiate objects**************************/
///////////////////////////////////////////////////////////////////////////
//enemies
const e1= new Enemy('r1','enemyX'),
e2=new Enemy('r2','enemyX'),
e3=new Enemy('r3','enemyX'),
e4=new Enemy('r4','enemyX'),
e5=new Enemy('r5','enemyX'),
e6=new Enemy('r6','enemyX'),
e7=new Enemy('r7','enemyX'),
allEnemies=[ e1 ,e2,e3,e4,e5,e6,e7],
//player
player = new Player('playerY','playerX'); //parameters: ypos, xpos
//gems
let g1=new Gems(-2, 604, 73, 571),
g2 = new Gems(-2, 604, 73, 571),
g3=new Gems(-2, 604, 73, 571),
allGems=[g1,g2,g3],
   
//lives
l1= new Lives(-2, 604, 73, 571),
lives=[l1]; 