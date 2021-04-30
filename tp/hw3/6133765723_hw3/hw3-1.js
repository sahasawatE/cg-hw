class Frame{
  constructor(){
    this.width = 300;
    this.height = 250;
    this.x = mouseX - (this.width/2);
    this.y = mouseY - (this.height/2);
    this.vertices = [[this.x,this.y],[this.x+this.width, this.y],[this.x+this.width,this.y+this.height],[this.x,this.y+this.height]];
  }
  display(){
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(this.x,this.y,this.width,this.height);
  }
}

class Polygon{
  constructor(){
    this.vertices = [[200,250],[300,350],[400,300]];
    //this.vertices = [[200,250],[300,350]];
  }
  refDist(){
    stroke('red');
    strokeWeight(1);
    for(let i = 0; i < this.vertices.length - 1; i++){
      line(this.vertices[i][0],this.vertices[i][1],this.vertices[i+1][0],this.vertices[i+1][1]);
    }
    line(this.vertices[this.vertices.length-1][0],this.vertices[this.vertices.length-1][1],this.vertices[0][0],this.vertices[0][1]);
  }
}

function setup(){
  createCanvas(500,500);
}
function draw(){
  background(255);
  let frame = new Frame();
  frame.display();
  
  let poly = new Polygon();
  poly.refDist();
  
  strokeWeight(5);
  stroke('green');
  sutherClip(poly.vertices,poly.vertices.length,frame.vertices,frame.vertices.length);
}

function xIntersect(x1,y1,x2,y2,x3,y3,x4,y4){
  let nr = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
  
  let dr = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
  
  return nr/dr;
}

function yIntersect(x1,y1,x2,y2,x3,y3,x4,y4){
  let nr = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 *x4);
  
  let dr = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
  
  return nr/dr;
}

function clip(polyVert,polySize,x1,y1,x2,y2){
  let newVert = [];
  let newPolySize = 0;
  
  for(let i = 0; i < polySize; i++){
    let k = (i+1)%polySize;
    let ix = polyVert[i][0];
    let iy = polyVert[i][1];
    let kx = polyVert[k][0];
    let ky = polyVert[k][1];
    
    let ipos = (x2-x1) * (iy-y1) - (y2-y1) * (ix-x1);
    let kpos = (x2-x1) * (ky-y1) - (y2-y1) * (kx-x1);
    
    if(ipos > 0 && kpos > 0){
      newVert[newPolySize] = [];
      newVert[newPolySize][0] = kx;
      newVert[newPolySize][1] = ky;
      newPolySize++;
    }
    else if(ipos <= 0 && kpos > 0){
      newVert[newPolySize] = [];
      newVert[newPolySize][0] = xIntersect(x1,y1,x2,y2,kx,ky,ix,iy);
      newVert[newPolySize][1] = yIntersect(x1,y1,x2,y2,kx,ky,ix,iy);
      newPolySize++;
      
      newVert[newPolySize] = [];
      newVert[newPolySize][0] = kx;
      newVert[newPolySize][1] = ky;
      newPolySize++;
    }
    else if(ipos > 0 && kpos <= 0){
      newVert[newPolySize] = [];
      newVert[newPolySize][0] = xIntersect(x1,y1,x2,y2,kx,ky,ix,iy);
      newVert[newPolySize][1] = yIntersect(x1,y1,x2,y2,kx,ky,ix,iy);
      newPolySize++;
    }
    else{
   
    }
  }
  polySize = newPolySize;
  
  for(let i = 0; i < polySize; i++){
    polyVert[i] = [];
    polyVert[i][0] = newVert[i][0];
    polyVert[i][1] = newVert[i][1];
  }
}

function sutherClip(polyVert,polySize,frameVert,frameSize){
  for(let i = 0; i < frameSize; i++){
    let k = (i+1)%frameSize;
    
    clip(polyVert, polySize,frameVert[i][0],frameVert[i][1],frameVert[k][0],frameVert[k][1]);
  }
  for(let i = 0; i < polySize; i++){
    console.log(polyVert[i][0],polyVert[i][1]);
  }
  disClip(polyVert);
}

function disClip(finalPolyVert){
  for(let i = 0; i < finalPolyVert.length; i++){
    let k = (i+1) % finalPolyVert.length;
    line(finalPolyVert[i][0],finalPolyVert[i][1],finalPolyVert[k][0],finalPolyVert[k][1]);
  }
}