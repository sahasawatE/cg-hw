//grid variables
const width=400;
const height=300;
const increment=5;

let solid = false;
let counter;

//line params
let x1 = null;
let y1 = null;
let x2 = null;
let y2 = null;

let x = null;
let y = null;
let rx = null;
let ry = null;

function mySubmitL(){
    colorR = parseInt(document.getElementById('usercolor1').value,10);
    colorG = parseInt(document.getElementById('usercolor2').value,10);
    colorB = parseInt(document.getElementById('usercolor3').value,10);
    lineWidth = parseInt(document.getElementById('userinputL').value,10);

    dda(x1,y1,x2,y2,increment);
}

function setup(){
    createCanvas(width,height);
    background(200);
    grid(width,height,increment);

}

//draw the grid
function grid(width,height,increment){
    //stroke(120);
    strokeWeight(0.01);
    for(let i=0;i <= width;i += increment){
        line(i,0,i,height);    
    }
    for(let i=0;i <= height;i += increment){
        line(0,i,width,i);    
    }
}


function mouseClicked(){
        if(Math.floor(mouseX/increment) > -1 && Math.floor(mouseX/increment) < 80){
            if(Math.floor(mouseY/increment) > -1 && Math.floor(mouseY/increment) < 60){
                if(!(x1)){
                    x1 = Math.floor(mouseX/increment);
                    y1 = Math.floor(mouseY/increment);
                    fill(255,0,102);
                    rect(x1*increment,y1*increment,increment,increment);
                    console.log('L1');
                    console.log(x1,y1);
                }else{
                    x2 = Math.floor(mouseX/increment);
                    y2 = Math.floor(mouseY/increment);
                    bresenham(x1,y1,x2,y2,increment,colorR,colorG,colorB,lineWidth);
                    x1=null;
                    y1=null;      
                    console.log('L2');
                    console.log(x2,y2);
                }
            }
        }
}


//DDA algorithm
function bresenham(x1,y1,x2,y2,increment,colorR,colorG,colorB,lineWidth){ 
    //calculate dx,dy
    let dx = x2 - x1;
    let dy = y2 - y1;

    //decide the size of steps based on bigger difference
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

    //calculate the increment in each axis
    let Xinc = dx / steps;
    let Yinc = dy / steps;

    //pixel for each step:
    let x = x1;
    let y = y1;

    //interate from 0 to the numbers of steps calculated 
    // for(let i = 0;i <= steps; i++){
    //     console.log(`PIXEL AT: (${Math.round(x)},${Math.round(y)})`);

    //     //draw the pixel 
    //     fill(0);
    //     rect(Math.round(x)*increment,Math.round(y)*increment,increment,increment);

    //     x += Xinc;
    //     y += Yinc;
    // }

        for(let i = 0;i <= steps; i++){
            console.log(`PIXEL AT: (${Math.round(x)},${Math.round(y)})`);

            //draw the pixel 
            fill(colorR,colorG,colorB);
            strokeWeight(0);
            rect(Math.round(x)*increment,Math.round(y)*increment,increment+lineWidth,increment+lineWidth);

            x += Xinc;
            y += Yinc;
        } 
}