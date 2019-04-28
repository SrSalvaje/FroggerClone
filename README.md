# Udacity FEND Project 4

## About

This is a clone of the popular Frogger arcade game, the game engine, images and resources.js were provided by the Udacity team,
the rest of the code is written by me, with the exception of the randomize function which is based on 'getRandomInt' of [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

## installation

You can either play the game [online](https://srsalvaje.github.io/UdacityP4Frogger/) or download/clone the repository from my [Github](https://github.com/SrSalvaje/UdacityP4Frogger)
and run it locally. Please note that is not meant for mobile devices 

## Game Instructions

Test your reflexes, avoid the bugs and see how long you can stay alive.

Use the arrow keys to move, collect hearts to gain extra lives and gems to score points!
When a heart appears you only have 10 seconds to pick it up before it disappears, extra hearts 
spawn every 30 seconds.

Gems appear in sets of three and disappear after 5 seconds, if you collect all gems from a set 
you get a 50 points bonus, but the bugs’ speed will change to a random value; blue gems are worth 50, 
green 75 and orange 100.

Every 500 points the bugs’ minimum and maximum speed is increased and randomized. 
If you reach the water, you are teleported back to the grass.

Good luck!

## To do

Create a global window object to wrap most variable declarations in ordet to follow the 'principle of least knowledge'.

Add focus so that modal windows can be closed without mouse.

Give more style to the page and modal windows.

