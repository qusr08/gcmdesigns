"use strict";

const scrollTextList = [];
let mouseText = undefined;

window.onload = (e) => {
    // Create mouse text object
    mouseText = document.createElement("p");
    mouseText.classList.add("mouse-text");
    document.body.appendChild(mouseText);

    // document.querySelectorAll(".scroll-text-parent").forEach(parent => {
    //     const scrollTextCount = parent.getAttribute("scroll-text-count");
    //     const scrollText = parent.getAttribute("scroll-text");
    //     for (let i = 0; i < scrollTextCount; i++) {
    //         scrollTextList.push(new ScrollText(parent));
    //     }
    // });

    // Reset the scroll on all slideshows
    document.querySelectorAll(".slideshow-list").forEach(element => {
        element.scrollLeft = 0;
    });

    // Create all scroll text objects
    document.querySelectorAll(".scroll-text").forEach(element => {
        scrollTextList.push(new ScrollText(element));
    });
}

window.onresize = (e) => {
    scrollTextList.forEach(scrollText => {
        scrollText.setup();
    });
}

window.onmousemove = (e) => {
    // If the mouse text element has not been gotten yet, do not try to update its position
    if (mouseText == undefined) {
        return;
    }

    // Update the mouse text position
    mouseText.style.left = (e.pageX - mouseText.clientWidth / 2) + "px";
    mouseText.style.top = (e.pageY - mouseText.clientHeight / 2) + "px";
}

function toggleProjectThumbnail(element, toggle) {
    // Toggle the scroll text's visibility
    let elementScrollTextParent = element.parentNode.querySelector('.scroll-text-parent');
    elementScrollTextParent.style.opacity = toggle ? 1 : 0;

    // Toggle the mouse text's visibility
    mouseText = document.querySelector(".mouse-text");
    mouseText.innerHTML = "click to view";
    mouseText.style.backgroundColor = window.getComputedStyle(elementScrollTextParent).color;
    mouseText.style.opacity = toggle ? 1 : 0;
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

class ScrollText {
    constructor(element) {
        this.element = element;
        this.style = window.getComputedStyle(this.element);
        this.text = element.getAttribute("text").trim();
        this.textWidth = 0;

        this.setup();
    }

    reset() {
        this.element.innerHTML = "";
    }

    setup() {
        // Reset any previous text that was inside the element
        this.reset();

        // Get the font size
        // https://stackoverflow.com/questions/10855218/conversion-rate-of-pt-em-px-percent-other
        // let fontSize = (this.style.fontSize.replace("px", "") * 0.75) + "pt";
        let fontSize = this.style.fontSize;

        // Get the font family
        let fontFamily = this.style.fontFamily.split(", ")[0];

        // Get the width in pixels of the text on its own
        let context = document.createElement("canvas").getContext("2d");
        context.font = fontSize + " " + fontFamily;
        let metrics = context.measureText(this.text);
        // this.textWidth = Math.ceil(context.measureText(this.text).width);
        this.textWidth = Math.ceil(metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft);

        // Add the text to this element until it fills up 2x the width of the window
        let i = Math.ceil(window.innerWidth * 2 / this.textWidth);
        while (i > 0) {
            this.element.innerHTML += this.text + " ";
            i--;
        }

        // Set the animation for this scrolling text
        this.element.animate([
            { transform: `translateX(0px)` },
            { transform: `translateX(-${this.textWidth}px)` }
        ], {
            duration: randomFloat(20000, 30000),
            // duration: 3000,
            iterations: Infinity,
            direction: ((Math.random() * 2) - 1 > 0 ? 'normal' : 'reverse'),
            // direction: 'normal',
            fill: 'forwards',
            delay: randomFloat(-20000, 0)
        });
    }

    update(e) {

    }
}

const randomFloat = (min, max) => Math.random() * (max - min) + min;

const clamp = (value, min, max) => Math.min(Math.max(min, value), max);