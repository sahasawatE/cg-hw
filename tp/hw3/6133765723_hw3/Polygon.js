class Polygon{
  constructor(){
    this.vertices = [[200,250],[300,350],[400,300]];
  }
  
  refDisp(){
    stroke(0);
    strokeWeight(1);
    for(let i = 0; i < this.vertices.length-1; i++){
      line(this.vertices[i][0],this.vertices[i][1],this.vertices[i+1][0],this.vertices[i+1][1]);
    }
    line(this.vertcies[this.vertices.length-1][0],this.vertcies[this.vertices.length-1][1],this.vertices[0][0],this.vertcies[0][1])
  }
}