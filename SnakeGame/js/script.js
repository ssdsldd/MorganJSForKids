"use strict"

let canvas = document.querySelector('.draw');
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let score = 0;
let blockCell = 10;
let widthInBlock = width/blockCell;
let heightInBlock = height/blockCell;
let keyCodes = {
    37: "left",
    38: "top",
    39: "right",
    40: "down"
}

document.addEventListener('keydown', function(event){
    let direction = keyCodes[event.keycode];
})

function Block(col, row){
    this.col = col;
    this.row = row;
}

function Snake(){
    this.direction = "right";
    this.nextDirection = "right";
    this.segments = [new Block(7,5), new Block(6,5), new Block(5,5)];
}

Snake.prototype.drawSnake = function(){
    for (let i = 0; i < this.segments.length; i++){
        this.segment[i].drawSquare("blue");
    }
}

Snake.prototype.move = function(){
    let head = this.segment[0];
    let newHead;

}

Snake.prototype.setDirection = function(newDirection){
    if (newDirection === "right" && this.direction === "left"){
        return;
    } else if (newDirection === "left" && this.direction === "right"){
        return;
    } else if (newDirection === "top" && this.direction === "down"){
        return;
    } else if (newDirection === "down" && this.direction === "top"){
        return;
    } 
    this.nextDirection = newDirection;
}

Block.prototype.drawSquare = function(color){
    let x = this.col * blockCell;
    let y = this.row * blockCell;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockCell, blockCell);
}

Block.prototype.drawCircle = function(color){
    let centerX = this.col * blockCell + blockCell/2;
    let centerY = this.row * blockCell + blockCell/2;
    circle(centerX, centerY, blockCell/2, true, color);
}

Block.prototype.equal = function(otherBlock){
    return (this.col === otherBlock.col && this.row === otherBlock.row);
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
    ctx.textBaseline = "center";
    ctx.fillText("Game Over", width/2, height/2);
}

