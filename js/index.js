"use strict";

const POINT_SPEED = 0.0025;
const SCROLL_SPEED = -3;

let swoopies = [];
let mouseText = undefined;

window.onload = (e) => {
    // Get a reference to the mouse text
    mouseText = document.querySelector(".mouse-text");

    // Reset the scroll on all slideshows
    document.querySelectorAll(".slideshow-list").forEach(element => {
        element.scrollLeft = 0;
    });

    // Create all swoopies for the canvases on the page
    document.querySelectorAll(".swoopy-wrapper").forEach(wrapper => {
        swoopies.push(new Swoopy(wrapper, POINT_SPEED, SCROLL_SPEED));
    });
    updateCanvasSizes();

    window.requestAnimationFrame(loop);
}

window.onresize = updateCanvasSizes;

window.onmousemove = (e) => {
    // If the mouse text element has not been gotten yet, do not try to update its position
    if (mouseText == undefined) {
        return;
    }

    // Update the mouse text position
    mouseText.style.left = (e.pageX - mouseText.clientWidth / 2) + "px";
    mouseText.style.top = (e.pageY - mouseText.clientHeight / 2) + "px";
}

function updateCanvasSizes() {
    // Resize all of the swoopies canvases
    swoopies.forEach(swoopy => {
        swoopy.resize();
    });
}

function loop() {
    // Update all of the swoopies
    swoopies.forEach(swoopy => {
        if (!swoopy.wrapper.classList.contains("hidden")) {
            swoopy.update(true);
        }
    });

    window.requestAnimationFrame(loop);
}

function enableThumbnail(element, projectName) {
    let elementScrollTextParent = element.parentNode.querySelector('.swoopy-wrapper');
    elementScrollTextParent.classList.remove("hidden");

    mouseText.innerHTML = projectName;
    mouseText.style.opacity = 1;
    mouseText.style.backgroundColor = window.getComputedStyle(elementScrollTextParent).color;
}

function disableThumbnail(element) {
    let elementScrollTextParent = element.parentNode.querySelector('.swoopy-wrapper');
    elementScrollTextParent.classList.add("hidden");

    mouseText.style.opacity = 0;
}

function moveSlideshow(element, direction) {
    // Get the slideshow list element
    const slideshowElement = element.parentNode.querySelector(".slideshow-list");

    // Get the index of the current slide
    const currentSlideIndex = Math.round((slideshowElement.scrollLeft / slideshowElement.scrollWidth) * slideshowElement.childElementCount);

    // Increase or decrease the index to move the slideshow in the specified direction
    const nextSlideIndex = clamp(currentSlideIndex + direction, 0, slideshowElement.childElementCount - 1);

    // Go to the next slide smoothly
    slideshowElement.querySelectorAll("img")[nextSlideIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Non-smooth movement (it sucks)
    // slideshowElement.scrollLeft += direction * (slideshowElement.scrollWidth / slideshowElement.childElementCount);
}

const clamp = (value, min, max) => Math.min(Math.max(min, value), max);