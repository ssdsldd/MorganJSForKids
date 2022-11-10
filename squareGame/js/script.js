"use strict"
let x = 0;
let y = 0;
let a = 0;
let counter = 0;
let speed = 50
function moveHead(){
    if (x < 200 && y == 0){
        $(".text").offset({left: x});
        x += 1;
    }
    if (x == 200 && y < 200){
        $(".text").offset({top: y});
        y += 1;
    }
    if (x > 0 && y ==200){
        $(".text").offset({left: x});
        x -= 1;
    }
    if (x == 0 && y > 0){
        $(".text").offset({top: y});
        y -= 1;
    }
}

function stopMove(){
    counter += 1;
    if (counter < 5) {
        speed -= 10;
        clearInterval(a);
        a = setInterval(moveHead, speed);
        $(".text").text(counter);
    } else {
        clearInterval(a);
        $(".text").text("Victory");
    }

}

a = setInterval(moveHead, speed);
$(".text").click(stopMove);