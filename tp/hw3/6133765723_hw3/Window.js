class Window{
  constructor(){
    this.width = 300;
    this.height = 250;
    this.x = mouseX - (this.width/2);
    this.y = mouseY - (this.height/2);
    this.vertices = [[this.x,this.y],[this.x + this.width,this.y],[this.x + this.width , this.y + this.height],[this.x , this.y + this.height]];
  }
  
  display(){
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(this.x,this.y,this.width,this.height);
  }
}