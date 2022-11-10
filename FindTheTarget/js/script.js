"use strict"

let clicks = 0;

function generateTarget(){
    return Math.floor(Math.random()*400);
}

function targetDistance(targetX,targety,playerX, playerY){
    let diffX = targetX - playerX;
    let diffY = targetY - playerY;
    return Math.sqrt((diffX*diffX)+(diffY*diffY));
}

function showDistance(distance){
    if (distance < 15){
        return "Обожжешься";
    } else if (distance < 50) {
        return "Очень Тепло";
    } else if (distance < 150) {
        return "Тепло";
    } else if (distance < 200) {
        return "Прохладно";
    } else if (distance < 250) {
        return "Холодно";
    } else if (distance < 300) {
        return "Очень Холодно";
    } else {
        return "Замерзнешь";
    }
}

let targetX = generateTarget();
let targetY = generateTarget();

$(".map").click(function (event){
    clicks++;
    let distance = targetDistance(targetX, targetY, event.offsetX, event.offsetY);
    let message = showDistance(distance);
    if (distance < 10){
        alert("Вы нашли клад, вам понадобилось" + clicks + "кликов");
    }
    if (clicks > 20){
        alert("Конец игры");
    }
    $(".distance").text(message + ", осталось " + (20-clicks) + " кликов");
})