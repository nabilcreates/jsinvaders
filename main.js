var e = {
    x: null,
    y: 500,
    d: 10,
}

var p = {}

var cnv;

var gameCursor = {}

function setup() {
    cnv = createCanvas(500, 600)

    p = {
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

    e.x = mouseX
    e.y -= 20

    ellipse(e.x, e.y, e.d)
    ellipse(p.x, p.y, p.d)

    ellipse(gameCursor.x, gameCursor.y, gameCursor.d)

    cnv.mousePressed(() => {
        shoot()
    })

    if (checkForIntersect(e, p)) {
        p.x = 100000;
        p.y = 100000;
        spawn()
    }

    console.log(p.x)

}

// CHECK FOR INTERSECTION
function checkForIntersect(itemCheck0, itemCheck1) {
    return dist(itemCheck0.x, itemCheck0.y, itemCheck1.x, itemCheck1.y) < itemCheck1.d / 2
}

// CLICKEVENT (RETURN E TO ORIGINAL SPOT)
function shoot() {
    e.x = mouseX;
    e.y = 500;
}

// SPAWN
function spawn() {
    p = {
        x: random(width),
        y: random(height - p.d),
        d: 100,
    }
}