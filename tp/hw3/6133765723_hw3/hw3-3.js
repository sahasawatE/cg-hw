const points = [];
let total = 14;
let mover = null;
let slider;
const cols = [];
let curveP = [];
let button;
let found = false;
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function setup(){
  createCanvas(600,600);
  points.push(createVector(212,33));
  points.push(createVector(339,163));
  points.push(createVector(175,158));
  points.push(createVector(79,57));
  points.push(createVector(1,250));
  points.push(createVector(103,503));
  points.push(createVector(380,570));
  points.push(createVector(197,570));
  points.push(createVector(489,503));
  points.push(createVector(589,250));
  points.push(createVector(522,45));
  points.push(createVector(408,158));
  points.push(createVector(219,163));
  points.push(createVector(350,33));
  
  slider = createSlider(0,1,0,0.01);
  
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
  cols.push(color(random(0,255),random(0,255),random(0,255)));
}

function mouseDragged(){
  if(found){
    curveP.splice(0);
  }
}

function draw(){
  background(0);
  for(const p of points){
    stroke(0);
    fill(0);
    circle(p.x,p.y,12);
  }
  stroke(0);
  noFill();
  
  beginShape();
  for(const p of points){
    vertex(p.x,p.y);
  }
  endShape();
  
  let current = points;
  for(let i = 0; i < total-1; i++){
    const vs = [];
    
    for(let j = 0; j < current.length - 1; j++){
      vs.push(p5.Vector.lerp(current[j],current[j+1],slider.value()));
    }
    
    for(const v of vs){
      stroke(cols[i]);
      fill(cols[i]);
      circle(v.x,v.y,12);
    }
    
    stroke(cols[i]);
    noFill();
    
    beginShape();
    for(const v of vs){
      vertex(v.x,v.y);
    }
    endShape();
    
    current = vs;
    
    if(i >= total - 2){
      curveP.push(current[0]);
    }
  }
  
  stroke(cols[total - 2]);
  noFill();
  
  beginShape();
  for(const p of curveP){
    vertex(p.x,p.y);
  }
  endShape();
}