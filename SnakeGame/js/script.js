"use strict"

let canvas = document.querySelector('.draw');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let score = 0;
let blockCell = 10;
let widthInBlock = width/blockCell;
let heightInBlock = height/blockCell;


function Block(col, row){
    this.col = col;
    this.row = row;
}

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

function drawBorder(){
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockCell);
    ctx.fillRect(0, height-blockCell, width, blockCell);
    ctx.fillRect(0, 0, blockCell, height);
    ctx.fillRect(width-blockCell, 0, blockCell, height);
}

function drawScore(){
    ctx.font = "20px Courier";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = "black"
    ctx.fillText("Score:" + score, blockCell, blockCell);
}

function gameOver(){
    clearInterval(intervalID);
    ctx.font = "60px Courier";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over", width/2, height/2);
}