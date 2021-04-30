let walls = []
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

const sceneW = 400;
const sceneH = 400;
let sliderFOV;

// class bed{
//     constructor(pos){
//         this.pos = pos;
//     }
//     show(){
//         stroke(255);
//         push();
//         translate(this.pos.x,this.pos.y);
//         rect(10,10,10,10);
//         pop();
//     }
// }

class Ray{
    constructor(pos,angle){
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }

    setAngle(angle){
        this.dir = p5.Vector.fromAngle(angle);
    }

    lookAt(x,y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    show(){
        stroke(255);
        push();
        translate(this.pos.x,this.pos.y);
        line(0,0,this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    cast(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if(den == 0){
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 -x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if(t > 0 && t < 1 && u > 0){
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
        else{
            return;
        }
    }
}

class Particle{
    constructor (){
        this.fov= 45;
        this.pos = createVector(sceneW/2, sceneH/2);
        this.rays = [];
        this.heading = 0;
        for(let a = -this.fov / 2; a < this.fov / 2; a += 1){
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    updateFOV(fov){
        this.fov = fov;
        this.rays = [];
        for(let a = -this.fov / 2; a < this.fov / 2; a += 1){
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    }

    rotate(angle){
        this.heading += angle;
        let index = 0;
        for(let a = -this.fov / 2; a < this.fov / 2; a += 1){
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }

    move(amt){
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }

    update(x,y){
        this.pos.set(x,y);
    }

    look(walls){
        const scene = [];
        for(let i = 0; i < this.rays.length; i++){
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for(let wall of walls){
                const pt = ray.cast(wall);
                if(pt){
                    let d = p5.Vector.dist(this.pos,pt);
                    const a = ray.dir.heading() - this.heading;

                    d *= Math.cos(a);

                    if(d < record){
                        record = d;
                        closest = pt;
                    }
                }
            }

            if(closest){
                stroke(255,236,134);
                line(this.pos.x,this.pos.y,closest.x,closest.y);
            }
            scene[i] = record
        }
        return scene;
    }
    show(){
        fill(255);
        ellipse(this.pos.x,this.pos.y,4);
        for(let ray of this.rays){
            ray.show();
        }
    }
}

class Boundary{
    constructor(x1,y1,x2,y2){
        this.a = createVector(x1,y1);
        this.b = createVector(x2,y2);
    }

    show(){
        stroke(255);
        line(this.a.x,this.a.y,this.b.x,this.b.y);
    }
}

function setup(){
    createCanvas(800,400);

    for(let i = 0; i < 5; i++){
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);

        walls[i] = new Boundary(x1,y1,x2,y2);
    }

    walls.push(new Boundary(0,0,sceneW,0));
    walls.push(new Boundary(sceneW,0,sceneW,sceneH));
    walls.push(new Boundary(sceneW,sceneH,0,sceneH));
    walls.push(new Boundary(0,sceneH,0,0));

    particle = new Particle();
    sliderFOV = createSlider(0,360,60);
    sliderFOV.input(changeFOV);
}

function changeFOV(){
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function draw(){
    if(keyIsDown(LEFT_ARROW)){
        particle.rotate(-0.01);
    }
    else if(keyIsDown(RIGHT_ARROW)){
        particle.rotate(0.01);
    }
    else if(keyIsDown(UP_ARROW)){
        particle.move(1);
    }
    else if(keyIsDown(DOWN_ARROW)){
        particle.move(-1);
    }

    background(0);

    for(let wall of walls){
        wall.show();
    }
    particle.show();

    const scene = particle.look(walls);
    const w = sceneW / scene.length;
    let c = color(255,204,0);
    push();
    translate(sceneW,0);
    for(let i = 0; i < scene.length; i++){
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = sceneW * sceneW;
        const b = map(sq,0,wSq,255,0);
        const h = map(scene[i],0,sceneW,sceneH,0);

        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w + 1, h);
    }
    pop();
}