var bullet = {
    x: null,
    y: 500,
    d: 10,
}

var enemy = {}

var cnv;

var gameCursor = {}

function setup() {
    cnv = createCanvas(500, 600)

    enemy = {
        x: random(width),
        y: random(height),
        d: 100,
    }

}

function draw() {
    background(0)
    
    gameCursor = {
        x: mouseX,
        y: 500,
        d: 10
    }

    bullet.x = mouseX
    bullet.y -= 20

    ellipse(bullet.x, bullet.y, bullet.d)
    ellipse(enemy.x, enemy.y, enemy.d)

    ellipse(gameCursor.x, gameCursor.y, gameCursor.d)

    cnv.mousePressed(() => {
        shoot()
    })

    if (checkForIntersect(bullet, enemy)) {
        enemy.x = 100000;
        enemy.y = 100000;
        spawn()
    }

    console.log(enemy.x)

}

// CHECK FOR INTERSECTION
function checkForIntersect(itemCheck0, itemCheck1) {
    return dist(itemCheck0.x, itemCheck0.y, itemCheck1.x, itemCheck1.y) < itemCheck1.d / 2
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
        y: random(height - enemy.d),
        d: 100,
    }
}