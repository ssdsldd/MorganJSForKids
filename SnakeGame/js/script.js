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
    let newDirection = keyCodes[event.keyCode];
    if (newDirection !== undefined){
        snake.setDirection(newDirection);
    }
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

function Apple(){
    this.position = new Block(10,10);
}

Apple.prototype.move = function(){
    let randomCol = Math.floor(Math.random()*(widthInBlock-2)+1);
    let randomRow = Math.floor(Math.random()*(heightInBlock-2)+1);
    this.position = new Block(randomCol, randomRow);
}

Apple.prototype.draw = function(color){
    this.position.drawCircle("Green");
}
let flag = 0;
Snake.prototype.draw = function(){
    for (let i = 0; i < this.segments.length; i++){
        if (flag === 0){
            this.segments[i].drawSquare("Green");
            flag = 1;
        } else if (flag === 1){
            this.segments[i].drawSquare("Yellow");
            flag = 2;
        } else if (flag === 2){
            this.segments[i].drawSquare("Blue");
            flag = 0;
        }
    }
}

Snake.prototype.move = function(){
    let head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection; 
    if (this.direction === "right"){
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "left"){
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "top"){
        newHead = new Block(head.col, head.row - 1);
    } else if (this.direction === "down"){
        newHead = new Block(head.col, head.row + 1);
    }
    if (snake.checkCollision(newHead)){
        gameOver();
        return;
    }
    this.segments.unshift(newHead);
    if (newHead.equal(apple.position)){
        score++;
        apple.move();
        animationTime -= 10;
    } else{
        this.segments.pop();
    }
}

Snake.prototype.checkCollision = function(head){
    let leftCollision = (head.col === 0);
    let rightCollision = (head.col === widthInBlock - 1);
    let topCollision = (head.row === 0);
    let bottomCollision = (head.row === heightInBlock - 1);
    let wallCollision = leftCollision || rightCollision || topCollision || bottomCollision;
    let selfCollision = false;
    for (let i = 0; i < this.segments.length; i++){
        if (head.equal(this.segments[i])){
            selfCollision = true;
        }
    }
    return selfCollision || wallCollision;
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
    clearTimeout(a);
    ctx.font = "60px Courier";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.textBaseline = "center";
    ctx.fillText("Game Over", width/2, height/2);
}

let snake = new Snake();
let apple = new Apple();
let animationTime = 100;
let a;

function gameLoop(){
    ctx.clearRect(0,0,width,height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
    a = setTimeout(gameLoop, animationTime);
}
gameLoop();

