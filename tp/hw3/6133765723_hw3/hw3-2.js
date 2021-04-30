let points = [];
let curveP = [];
let button;
var total = 0;
let addPoint = false;
let popPoint;
let found = false;
let mover = null;

function setup(){
  createCanvas(600,600);
  button = createButton("Add Point");
  button.mousePressed(() => 
    addPoint = true
  );
  popPoint = createButton("Pop Point");
  popPoint.mousePressed(() => {
    if(total > 0){
      total--;
      points.pop();
      curveP.slice(0);
    }
    else{
      console.log("No Point Left !!");
    }
  });
}

function draw(){
  background(220);

  // console.log(slider.value());

  for(let p of points){
    strokeWeight(15);
    point(p.x,p.y);
    
    strokeWeight(2);
    noFill();
    beginShape();
    point(p.x,p.y)
    for(const p of points){
      curveVertex(p.x,p.y);
    }
    point(p.x,p.y)
    endShape();
  }
}

function mousePressed(){
  if(addPoint){
    if(mouseX <= 600 && mouseY <= 600){
      total++;
      points.push(createVector(mouseX,mouseY));
      addPoint = false;
    }
  }
  else{
    for(let p of points){
      const d = dist(p.x,p.y,mouseX,mouseY);
      if(d < 8){
        mover = p;
        found = true;
      }
    }
    if(found){
      curveP.slice(0);
    }
  }
}

function mouseReleased() {
  if (!addPoint) {
    mover = null;
    found = false;
  }
}

function mouseDragged(){
  if(!addPoint){
    if(mover){
      mover.set(mouseX,mouseY);
    }
    if(found){
      curveP.slice(0);
    }
  }
}

// function interpolation(){
//   const t = 2;
//   const h00 = ((t) => {
//     return (2*(t**3))-(3*(t**2))+1;
//   });
//   const h10 = ((t) => {
//     return (t**3)-(2*(t**2))+t;
//   });
//   const h01 = ((t) => {
//     return (-2*(t**3))+(3*(t**2));
//   });
//   const h11 = ((t) => {
//     return (t**3)-(t**2);
//   });

//   const t0 = ((x) => {
//     return x - Math.floor(x);
//   });
//   const m1 = ((c,y0,x) => {
//     return (1-c)*((y0*(Math.floor(x)))+3)-(y0*(Math.floor(x))+1);
//   });
//   const m0 = ((c,y0,x) => {
//     return (1-c)*((y0*(Math.floor(x)))+2)-(y0*(Math.floor(x)));
//   });

//   beginShape();
//   noFill();
//   for(const p of points){
//     point(p.x,p.y)
//   }
//   endShape();
// }
