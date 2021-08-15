VanillaTilt.init(document.querySelectorAll(".card"), {
    reverse:                false,  // reverse the tilt direction
    max:                    5,     // max tilt rotation (degrees)
    startX:                 0,      // the starting tilt on the X axis, in degrees.
    startY:                 0,      // the starting tilt on the Y axis, in degrees.
    perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:                  1.05,      // 2 = 200%, 1.5 = 150%, etc..
    speed:                  300,    // Speed of the enter/exit transition
    transition:             true,   // Set a transition on enter/exit.
    axis:                   null,   // What axis should be disabled. Can be X or Y.
    reset:                  true,    // If the tilt effect has to be reset on exit.
    easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:                  false,   // if it should have a "glare" effect
    "max-glare":            0.3,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    "mouse-event-element":  null,    // css-selector or link to HTML-element what will be listen mouse events
                                    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    gyroscope:              true,    // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX:     -45,     // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX:     45,      // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY:     -45,     // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY:     45,      // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
});


/************************\
    Ripple Effect Start
\************************/

const rippleElements = document.querySelectorAll(".ripple-element");

console.log(rippleElements);

const handleRippleAnimationEnd = (e) => {
    e.currentTarget.removeEventListener("animationend", handleRippleAnimationEnd);
    e.currentTarget.remove();
}

const createRippleEffect = (e) => {
    e.stopPropagation();

    console.log(e.target);
    
    // Element in which we will create ripple effect. 
    const element = e.currentTarget;

    // Getting elements left and top position relative to viewport.
    const {top: elementTop, left: elementLeft } = element.getBoundingClientRect();

    // Getting click event's x and y coordinates.
    const top = e.clientY;
    const left = e.clientX;

    // calculating click event's x and y coordinate relative to element.
    // this x and y will be ripple elements center position's coordinates relative to parent element which in this case is "element".
    const posY = top - elementTop;
    const posX = left - elementLeft;


    const ripple = document.createElement("div");
    ripple.style.top = posY + "px";
    ripple.style.left = posX + "px";
    ripple.classList.add("ripple");

    
    ripple.addEventListener("animationend", handleRippleAnimationEnd);

    element.appendChild(ripple);


}

rippleElements.forEach(element => {
    element.style.position = "relative";
    element.style.zIndex = "0";
    // element.style.overflow = "hidden";
    
    element.addEventListener("click", createRippleEffect);

})

/************************\
    Ripple Effect end
\************************/