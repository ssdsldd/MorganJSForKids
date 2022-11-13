"use strict"

let canvas = document.querySelector('.draw');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let score = 0;
let blockCell = 10;

function circle(x, y, r, fillCircle, colorCircle){
    ctx.beginPath();
    ctx.fillStyle = colorCircle;
    ctx.arc(x, y, r, 0, Math.PI *2, true);
    if (fillCircle == true){
        ctx.fill();
    } else {
        ctx.stroke();
    }
}



