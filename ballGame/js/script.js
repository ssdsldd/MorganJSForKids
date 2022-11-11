"use strict"

let canvas = document.querySelector('.draw');
let ctx = canvas.getContext("2d");
let balls = []
let colors = ["Green", 'yellow', 'red', 'purple', 'blue', 'orange'];

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

function randomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
}

function Ball(){
    this.x = 100;
    this.y = 100;
    this.xDiff = Math.random()*10 - 5;
    this.yDiff = Math.random()*10 - 5;
    this.color = "red";
}

Ball.prototype.draw = function(){
    this.color = randomColor();
    circle(this.x, this.y, 6, true, this.color);
}

Ball.prototype.move = function(){
    this.x += this.xDiff;
    this.y += this.yDiff;
}

Ball.prototype.checkWall = function(){
    if (this.x < 0 || this.x > 300){
        this.xDiff = -this.xDiff;
    }
    if (this.y < 0 || this.y > 300){
        this.yDiff = -this.yDiff;
    }
}


for (let i = 0; i < 9; i++){
    balls[i] = new Ball();
}

let a = setInterval(function(){
    ctx.clearRect(0,0,300,300);
    for (let j = 0; j < 9; j++){
        balls[j].draw();
        balls[j].move();
        balls[j].checkWall();
    }
    ctx.strokeRect(0,0,300,300);
}, 15);

