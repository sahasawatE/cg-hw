//grid variables
const width=400
const height=300
const increment=10

//line params
let x1 = null;
let y1 = null;
let x2 = null;
let y2 = null;

let x = null;
let y = null;
let rx = null;
let ry = null;

var mode = "linear";

function switching(){
    if(document.getElementById('switch') != null){
        var x = document.getElementById("switch");
        if(x.innerHTML === "Linear"){
            x.innerHTML = "Circle";
            x.value = "circle";
            mode = String(x.value);
            document.getElementById('submitL').disabled = true;
            document.getElementById('userinputL1').disabled = true;
            document.getElementById('userinputL2').disabled = true;
            document.getElementById('userinputL3').disabled = true;
            document.getElementById('userinputL4').disabled = true;

            document.getElementById('submitC').disabled = false;
            document.getElementById('userinputC1').disabled = false;
            document.getElementById('userinputC2').disabled = false;
            document.getElementById('userinputC3').disabled = false;
            document.getElementById('userinputC4').disabled = false;

            console.log(mode);
        }
        else{
            x.innerHTML = "Linear";
            x.value = "linear";
            mode = String(x.value);
            document.getElementById('submitL').disabled = false;
            document.getElementById('userinputL1').disabled = false;
            document.getElementById('userinputL2').disabled = false;
            document.getElementById('userinputL3').disabled = false;
            document.getElementById('userinputL4').disabled = false;

            document.getElementById('submitC').disabled = true;
            document.getElementById('userinputC1').disabled = true;
            document.getElementById('userinputC2').disabled = true;
            document.getElementById('userinputC3').disabled = true;
            document.getElementById('userinputC4').disabled = true;

            console.log(mode);
        }
        return x;
    }
    else{
        console.log("no element_id named 'switch'");
    }
}

function mySubmitL(){
    x1 = parseInt(document.getElementById('userinputL1').value,10);
    y1 = parseInt(document.getElementById('userinputL2').value,10);
    x2 = parseInt(document.getElementById('userinputL3').value,10);
    y2 = parseInt(document.getElementById('userinputL4').value,10);

    dda(x1,y1,x2,y2,increment);
}

function mySubmitC(){
    x = parseInt(document.getElementById('userinputC1').value,10);
    y = parseInt(document.getElementById('userinputC2').value,10);
    rx = parseInt(document.getElementById('userinputC3').value,10);
    ry = parseInt(document.getElementById('userinputC4').value,10);

    ddaCircle(x,y,rx,ry,increment);
}

function setup(){
    createCanvas(width,height);
    background(200);
    grid(width,height,increment);

}

//draw the grid
function grid(width,height,increment){
    stroke(120);
    for(let i=0;i <= width;i += increment){
        line(i,0,i,height);    
    }
    for(let i=0;i <= height;i += increment){
        line(0,i,width,i);    
    }
}


function mouseClicked(){
    if(mode === "circle"){
        if(Math.floor(mouseX/increment) > -1 && Math.floor(mouseX/increment) < 40){
            if(Math.floor(mouseY/increment) > -1 && Math.floor(mouseY/increment) < 30){
                if(!(x)){
                    x = Math.floor(mouseX/increment);
                    y = Math.floor(mouseY/increment);
                    fill(155,110,52);
                    rect(x*increment,y*increment,increment,increment);
                    console.log('C1');
                    console.log(x,y);
                }else{
                    rx = Math.floor(mouseX/increment);
                    ry = Math.floor(mouseY/increment);
                    ddaCircle(x,y,rx,ry,increment);
                    x=null;
                    y=null;      
                    console.log('C2');
                    console.log(rx,ry);
                }
            }
        }
    }
    else if(mode === "linear"){
        if(Math.floor(mouseX/increment) > -1 && Math.floor(mouseX/increment) < 40){
            if(Math.floor(mouseY/increment) > -1 && Math.floor(mouseY/increment) < 30){
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
                    dda(x1,y1,x2,y2,increment);
                    x1=null;
                    y1=null;      
                    console.log('L2');
                    console.log(x2,y2);
                }
            }
        }
    }
}
    

function ddaCircle(x,y,rx,ry,increment){
    //alert("comimg soon !!");
    let dx = x - rx;
    let dy = y - ry;

    let r = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

    let Xinc = dx / r;
    let Yinc = dy / r;

    let x1 = x;
    let y1 = y;

    for(let theta = 0; theta < 360; theta++){
        console.log(`PIXEL AT: (${Math.round(x1)},${Math.round(y1)})`);

        x1 = x + (r*Math.cos(theta));
        y1 = y + (r*Math.sin(theta));

        fill(0);
        rect(Math.round(x1)*increment,Math.round(y1)*increment,increment,increment);

        x1 += Xinc;
        y1 += Yinc;
    }
}


//DDA algorithm
function dda(x1,y1,x2,y2,increment){ 
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
    for(let i = 0;i <= steps; i++){
        console.log(`PIXEL AT: (${Math.round(x)},${Math.round(y)})`);

        //draw the pixel 
        fill(0);
        rect(Math.round(x)*increment,Math.round(y)*increment,increment,increment);

        x += Xinc;
        y += Yinc;
    }
}