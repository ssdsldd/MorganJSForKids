"use strict"

let canvas = document.querySelector('.draw');
let ctx = canvas.getContext("2d");

function circle(x,y,r,fillCircle,circleColor){
    ctx.beginPath();
    ctx.fillStyle = circleColor;
    ctx.arc(x,y,r, 0, Math.PI*2, true);
    if (fillCircle == true){
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function DrawSnowmen(snowManX, snowManY){
    circle(snowManX,snowManY,50);
    circle(snowManX,snowManY - 85,35);
    circle(snowManX,snowManY-25,5,true,"black");
    circle(snowManX,snowManY,5,true,"black");
    circle(snowManX,snowManY+25,5,true,"black");
    circle(snowManX,snowManY-85,5,true,"orange");
    circle(snowManX-15,snowManY-95,5,true,"black");
    circle(snowManX+15,snowManY-95,5,true,"black");
}

DrawSnowmen(200,200);