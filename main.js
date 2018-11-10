var bullet = {}
var score = 0;
var enemy = []
var gameCursor = {}
var base = {};
var cnv;


var enemies = 3;
var speed = 0.5;

var song;
var bg;

function preload(){
    song = loadSound('assets/audio/song.mp3')
    bg = loadImage('assets/images/bg.png')
}

function setup() {

    // CANVAS
    cnv = createCanvas(window.innerWidth, window.innerHeight)

    // enemy config (ENEMY IS AN ARRAY WITH INFO FOR ENEMIES)
    for (var i = 0; i < enemies; i++) {
        enemy.push({
            x: random(width),
            y: 100,
            d: 30,
        })
    }

    // bullet config
    bullet = {
        x: null,
        y: 500,
        d: 20,
    }

    // SET VOLUME OF SONG
    song.setVolume(0.3)
    
    // PLAY THE SONG
    song.loop()

    
}

function draw() {

    image(bg, 0, 0 , width , height);

    // CHECK LEVEL
    checkLevel()

    // DRAW SCORE
    fill(255)
    text('Score: ' + score, 40, 40)

    // set gamecursor config
    gameCursor = {
        x: mouseX,
        y: height - 200,
        d: 10,
        sx: 10,
        sy: 5,
    }

    // enemy.y = speed of the enemy  coming down
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].y += speed
    }


    // bullet.y = speed of the bullet (between 0 and 30)
    bullet.x = mouseX
    bullet.y -= 30

    // draw bullet
    ellipse(bullet.x, bullet.y, bullet.d)

    // DRAW THE ENEMY (ITTERATING OVER EVERY ENEMY TO DRAW THEM)
    for (var i = 0; i < enemy.length; i++) {
        rect(enemy[i].x, enemy[i].y, enemy[i].d, enemy[i].d)
    }

    // draw the game cursor
    rect(gameCursor.x, gameCursor.y, gameCursor.sx, gameCursor.sy)

    // if pressed mouse on canvas, shoot
    cnv.mousePressed(() => {
        shoot()
    })

    // ITTERATE OVER ENEMY AND SEE IF THE BULLET INTERSECTS WITH ANY OF THE ENEMY IN THE ARRAY
    for (var i = 0; i < enemy.length; i++) {
        if (checkForIntersect(bullet, enemy[i])) {
            console.log('score')
            spawn(i)
            score++;
        }
    }

    // ITTERATE FOR EVERY ENEMY AND SEE IF THE GAME CURSOR INTERSECTS WITH ANY OF THE ENEMY IN THE ARRAY
    // intersect check between game cursor and the enemy
    for (var i = 0; i < enemy.length; i++) {
        if (checkForIntersect(gameCursor, enemy[i])) {
            console.log('gameover')
            spawn(i)
            gameOver()
        }
    }

    // ITTERATE FOR EVERY ENEMY AND SEE IF THEY GO ABOVE THE WIDTH OR HEIGHT
    for (var i = 0; i < enemy.length; i++) {
        // Check if enemy goes after the width or the height
        if (enemy[i].x > width || enemy[i].y > height) {
            console.log('over')
            spawn(i)
            gameOver()
        }
    }


}

// CHECK FOR INTERSECTION
function checkForIntersect(itemCheck0, itemCheck1) {
    return dist(itemCheck0.x, itemCheck0.y, itemCheck1.x, itemCheck1.y) < itemCheck1.d
}

// CLICKEVENT (RETURN E TO ORIGINAL SPOT)
// BULLET WILL START AT THE GAMECURSOR.Y
function shoot() {
    bullet.x = mouseX;
    bullet.y = gameCursor.y;
}

// SPAWN
function spawn(index) {

    enemy[index] = {
        x: random(width) - bullet.d,
        y: 0,
        d: 30,
    }

}

function gameOver() {

    // SCORE 0 AND INITIAL SPEED
    score = 0;
    speed = 0.5
    
    for (var i = 0; i < enemy.length; i++) {
        spawn(i)
    }
}

function checkLevel() {
    if (score >= 5) {
        speed = 1;
    }

    if (score >= 10) {
        speed = 2;
    }

    if (score >= 15) {
        speed = 3;
    }

}