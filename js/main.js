"use strict";

let aboutToggle = false;

function toggleAboutPage() {
    // Swap the value of the about toggle
    aboutToggle = !aboutToggle;

    // Get the wrapper element
    const wrapperElement = document.querySelector(".info-wrapper");

    // Get CSS variables
    const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-time'));

    // Set body styles
    document.body.style.transition = aboutToggle ? `grid-template-columns ${transitionTime}s ease-in-out` : `grid-template-columns ${transitionTime}s ease-in-out`;
    document.body.style.gridTemplateColumns = aboutToggle ? "1fr 1fr" : "1fr 2fr";

    // Set about button styles
    const buttonElement = wrapperElement.querySelector(".about-button");
    buttonElement.querySelector("a").innerHTML = aboutToggle ? "less about me" : "more about me";
    buttonElement.querySelector("b").style.transform = `rotateZ(${aboutToggle ? "-180deg" : "0deg"})`;
    
    // Set collapsible element styles
    const collapsibleElement = wrapperElement.querySelector(".about-collapsible");
    collapsibleElement.style.transition = aboutToggle ? `max-height ${transitionTime}s ease-in-out` : `max-height ${transitionTime}s ease-in-out`;
    collapsibleElement.style.maxHeight = aboutToggle ? collapsibleElement.scrollHeight + "px" : null;
}

function goToSite (url) {
    window.location.href = url;
}