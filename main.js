var bullet = {}
var score = 0;
var enemy = {}
var gameCursor = {}
var cnv;



function setup() {

    // CANVAS
    cnv = createCanvas(window.innerWidth, window.innerHeight)

    // enemy config
    enemy = {
        x: random(width),
        y: 100,
        d: 30,
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

    // DRAW SCORE
    fill(255)
    text('Score: ' + score , 100, 100)

    // set gamecursor config
    gameCursor = {
        x: mouseX,
        y: height - 200,
        d: 10,
        sx: 10,
        sy: 5,
    }

    // enemy.y = speed of the enemy  coming down
    enemy.y += 5


    // bullet.y = speed of the bullet (between 0 and 30)
    bullet.x = mouseX
    bullet.y -= 30

    // draw bullet and enemy
    ellipse(bullet.x, bullet.y, bullet.d)

    rect(enemy.x, enemy.y, enemy.d, enemy.d)

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