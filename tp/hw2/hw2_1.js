function hypotrochoid(R, r, d, theta) {
    var x = (R - r) * cos(theta) + d * cos((R - r) / r * theta);
    var y = (R - r) * sin(theta) - d * sin((R - r) / r * theta);
    return createVector(x, y);
}

function epitrochoid(R, r, d, theta) {
    var x = (R + r) * cos(theta) - d * cos((R + r) / r * theta);
    var y = (R + r) * sin(theta) - d * sin((R + r) / r * theta);
    return createVector(x, y);
}

function reduceFraction(n, d) {
    var gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(n, d);
    return [n / gcd, d / gcd];
}

var Controls = function() {
    this.type = 0;
    this.a = 10;
    this.b = 6;
    this.k = 4;
    this.rotation = 0;
};

var controls = new Controls();

function setup() {
    var gui = new dat.GUI({width: 400});
    gui.add(controls, 'type', {hypotrochoid: 0, epitrochoid: 1});
    gui.add(controls, 'a', 1, 32).step(1);
    gui.add(controls, 'b', 1, 32).step(1);
    gui.add(controls, 'k', 1, 32);
    gui.add(controls, 'rotation', 0, 360);
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {

  if(controls.type === 0){
    document.getElementById('mode').innerHTML = "hypotrochoid";
  }
  else{
    document.getElementById('mode').innerHTML = "epitrochoid";
  }

    var R = controls.a;
    var r = controls.b;
    var d = controls.k;
    var N = reduceFraction(R, r)[1];

    translate(width / 2, height / 2);
    rotate(radians(270 + controls.rotation));
    background(0);
    noFill();

    var func = hypotrochoid;
    if (controls.type != 0) {
        func = epitrochoid;
    }

    var lo = createVector(0, 0);
    var hi = createVector(0, 0);
    for (var i = 0; i < 360 * N; i++) {
        var v = func(R, r, d, radians(i));
        lo.x = min(lo.x, v.x);
        lo.y = min(lo.y, v.y);
        hi.x = max(hi.x, v.x);
        hi.y = max(hi.y, v.y);
    }
    var w = hi.x - lo.x;
    var h = hi.y - lo.y;
    var sx = (width * 0.8) / w;
    var sy = (height * 0.8) / h;
    var s = min(sx, sy);

    stroke(0, 255, 0);
    strokeWeight(4);
    strokeJoin(ROUND);
    beginShape();
    for (var i = 0; i < 360 * N; i++) {
        var v = func(R, r, d, radians(i));
        vertex(v.x * s, v.y * s);
    }
    endShape(CLOSE);
}