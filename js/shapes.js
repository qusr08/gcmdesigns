"use strict";

const COUNT = 1;

let shapes = [];

for (let i = 0; i < COUNT; i++) {
    let newShape = document.createElement("img");
    newShape.src = getRandomShape();

    newShape.style.position = "absolute";
    newShape.style.top = 0;
    newShape.style.left = 0;
    newShape.style.zIndex = -1;
    newShape.style.opacity = 0.3;
    newShape.style.transform = "rotate(" + Math.floor(Math.random() * 360) + "deg)";

    document.body.appendChild(newShape);
}

function getRandomShape() {
    switch (Math.floor(Math.random() * 6)) {
        case 0:
            return "media/shapes/green-square.png";
        case 1:
            return "media/shapes/green-circle.png";
        case 2:
            return "media/shapes/green-triangle.png";
        case 3:
            return "media/shapes/blue-square.png";
        case 4:
            return "media/shapes/blue-circle.png";
        case 5:
            return "media/shapes/blue-triangle.png";
    }
}