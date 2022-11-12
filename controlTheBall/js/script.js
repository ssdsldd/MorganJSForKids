"use strict"


let canvas = document.querySelector(".draw");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let keyCodes = {
    32: "stop",
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

let speeds = {
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9
}

let setForRadius = {
    67: "less",
    86: "more"
}

let setForSpeed = {
    90: "slower",
    88: "faster"
}

function circle(x,y,r, fillCircle, colorCircle){
    ctx.beginPath();
    ctx.fillStyle = colorCircle;
    ctx.arc(x,y,r, 0 ,Math.PI * 2, true);
    if (fillCircle == true){
        ctx.fill();
    } else{
        ctx.stroke();
    }
}  

function changeSetup(event){
    let direction = keyCodes[event.keyCode];
    let speed = speeds[event.keyCode];
    let radius = setForRadius[event.keyCode];
    let speedForce = setForSpeed[event.keyCode];
    ball.setDirection(direction);
    ball.setSpeed(speed,speedForce);
    ball.setRadius(radius);
}

function Ball(){
    this.x = width/2;
    this.y = height/2;
    this.r = 10;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.speed = 1;
}

Ball.prototype.move = function(){
    this.x += this.xSpeed * this.speed;
    this.y += this.ySpeed * this.speed;
    if (this.x < this.r/2){
        this.xSpeed = -this.xSpeed;
    } else if (this.x > width-this.r){
        this.xSpeed = -this.xSpeed;
    }
    if (this.y < this.r/2){
        this.ySpeed = -this.ySpeed;
    } else if (this.y > height- this.r){
        this.ySpeed = -this.ySpeed;
    }
}

Ball.prototype.draw = function(){
    circle(this.x, this.y, this.r, true, "orange");
}

Ball.prototype.setDirection = function(direction){
    if (direction == "stop"){
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
    else if (direction == "left"){
        this.xSpeed = -1;
        this.ySpeed = 0;
    }
    else if (direction == "up"){
        this.xSpeed = 0;
        this.ySpeed = -1;
    }
    else if (direction == "right"){
        this.xSpeed = 1;
        this.ySpeed = 0;
    }
    else if (direction == "down"){
        this.xSpeed = 0;
        this.ySpeed = 1;
    }
}

Ball.prototype.setSpeed = function(newSpeed,diffSpeed){
    if (newSpeed !== undefined){
        this.speed = newSpeed;
    }
    if (diffSpeed == "faster" && this.speed < 10){
        this.speed++;
    } else if(diffSpeed == "slower" && this.speed > 1){
        this.speed--;
    }
}

Ball.prototype.setRadius = function(diffR){
    if (diffR == "less" && this.r > 1){
        this.r--;
    } else if (diffR == "more" && this.r < 20){
        this.r++;
    }
}

let ball = new Ball();

let bodyHtml = document.querySelector("body");
bodyHtml.addEventListener('keydown', changeSetup);


let a = setInterval(function(){
    ctx.clearRect(0,0, width, height);
    ball.draw();
    ball.move();
    ctx.strokeRect(0,0,width,height);
}, 50);