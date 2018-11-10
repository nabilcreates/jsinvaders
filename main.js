var bullet = {}
var score = 0;
var enemy = []
var gameCursor = {}
var base = {};
var cnv;


var enemies = 5;

function setup() {

    // CANVAS
    cnv = createCanvas(window.innerWidth, window.innerHeight)

    // enemy config
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

}

function draw() {
    background(0)

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
    for(var i = 0; i < enemy.length; i++){
        enemy[i].y += 1
    }


    // bullet.y = speed of the bullet (between 0 and 30)
    bullet.x = mouseX
    bullet.y -= 30

    // draw bullet and enemy
    ellipse(bullet.x, bullet.y, bullet.d)

    for(var i = 0; i < enemy.length; i ++){
        rect(enemy[i].x, enemy[i].y, enemy[i].d, enemy[i].d)
    }

    // draw the game cursor
    rect(gameCursor.x, gameCursor.y, gameCursor.sx, gameCursor.sy)

    // if pressed mouse on canvas, shoot
    cnv.mousePressed(() => {
        shoot()
    })

    if (checkForIntersect(bullet, enemy)) {
        console.log('score')
        spawn()
        score++;
    }

    // intersect check between game cursor and the enemy
    if (checkForIntersect(gameCursor, enemy)) {
        console.log('gameover')
        spawn()
        gameOver()
    }

    // Check if enemy goes after the width or the height
    if (enemy.x > width || enemy.y > height) {
        console.log('gameover')
        spawn()
        gameOver()
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
function spawn() {

    // enemy config
    enemy = {
        x: random(width) - bullet.d,
        y: 0,
        d: 30,
    }
}

function gameOver() {
    score = 0;
}

function checkLevel() {
    if (score >= 5) {
        enemy.y += 2;
    }

    if (score >= 10) {
        enemy.y += 3;
    }

    if (score >= 15) {
        enemy.y += 5;
    }
}