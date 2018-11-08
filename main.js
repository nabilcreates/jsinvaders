var bullet = {
    x: null,
    y: 500,
    d: 10,
}

var score = 0;

var enemy = {}

var cnv;

var gameCursor = {}

function setup() {
    cnv = createCanvas(500, 600)

    // enemy config
    enemy = {
        x: random(width),
        y: 100,
        d: 15,
    }

}

function draw() {
    background(0)

    // enemy.y = speed of the enemy  coming down
    enemy.y += 5

    // set gamecursor config
    gameCursor = {
        x: mouseX,
        y: 500,
        d: 10
    }

    // bullet.y = speed of the bullet
    bullet.x = mouseX
    bullet.y -= 20

    // draw bullet and enemy
    ellipse(bullet.x, bullet.y, bullet.d)
    rect(enemy.x, enemy.y, enemy.d,enemy.d)

    // draw the game cursor
    ellipse(gameCursor.x, gameCursor.y, gameCursor.d)

    // if pressed mouse on canvas, shoot
    cnv.mousePressed(() => {
        shoot()
    })

    // intersect check between bullet and enemy
    if (checkForIntersect(bullet, enemy)) {
        spawn()
        score ++;
    }

    // intersect check between game cursor and the enemy
    if (checkForIntersect(gameCursor, enemy)) {
        spawn()
        gameOver()
    }

    // Check if enemy goes after the width or the height
    if(enemy.x > width || enemy.y > height){
        spawn()
        gameOver()
    }


}

// CHECK FOR INTERSECTION
function checkForIntersect(itemCheck0, itemCheck1) {
    return dist(itemCheck0.x, itemCheck0.y, itemCheck1.x, itemCheck1.y) < itemCheck1.d
}

// CLICKEVENT (RETURN E TO ORIGINAL SPOT)
function shoot() {
    bullet.x = mouseX;
    bullet.y = 500;
}

// SPAWN
function spawn() {
    enemy = {
        x: random(width),
        y: 100,
        d: 15,
    }
}

function gameOver(){
    score = 0;
}