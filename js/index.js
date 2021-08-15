const initTiltEffect = () => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        reverse:                false,  // reverse the tilt direction
        max:                    10,     // max tilt rotation (degrees)
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
}

const regex = /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i;

console.log(navigator.userAgent);

if(regex.test(navigator.userAgent) ) {
    console.log("mobile");

    const span = document.createElement("span");
    span.textContent = "this is mobile";

    document.querySelector(".attribution").appendChild(span);
    
}else{
    console.log("pc");

    const span = document.createElement("span");
    span.textContent = "this is pc";

    document.querySelector(".attribution").appendChild(span);
    initTiltEffect();
}




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
    // Stoping event bubbling in case user clicked ripple element which is 
    // a child of element which also is element with ripple effect. 
    e.stopPropagation();
    
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
    element.addEventListener("click", createRippleEffect);

})

/************************\
    Ripple Effect end
\************************/

const cardContent = document.querySelector(".card__content");

const canvas = document.createElement("CANVAS");
canvas.classList.add("canvas");

cardContent.appendChild(canvas);

const ctx = canvas.getContext("2d");

const {clientWidth, clientHeight} = cardContent;


const initCanvas = () => {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
}
initCanvas();


const NUMBER_OF_PARTICLES = 10;
const PARTICLES_ARRAY = [];

class Particle{
    constructor(x, y, radius, speedX, speedY, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;

    }

    checkCollision(){
        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            this.speedX *= -1;
        }

        if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
            this.speedY *= -1;
        }
    }
}

const initParticles = () => {
    const edgeSize = 20;

    const length = PARTICLES_ARRAY.length;
    for(let i = 0; i < length; i++){
        PARTICLES_ARRAY.pop();
    }


    for(let i = 0; i < NUMBER_OF_PARTICLES; i++){
        const x = edgeSize + Math.floor((Math.random()*(canvas.width - 2*edgeSize)));
        const y = edgeSize + Math.floor((Math.random()*(canvas.height - 2*edgeSize)));

        const radius = Math.floor(Math.random()*2 + 2);

        const speedX = Math.floor(Math.random()*4 - 2) || 1;
        const speedY = Math.floor(Math.random()*4 - 2) || -1;

        const color = "hsl(245, 75%, 52%)";

        PARTICLES_ARRAY.push(new Particle(x, y, radius, speedX, speedY, color));

    }
}
initParticles();

const updateParticles = () => {
    PARTICLES_ARRAY.forEach(particle => {
        particle.draw();
        particle.checkCollision();
        particle.move();
    })
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const animate = () => {
    clearCanvas();
    updateParticles();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener("resize", () => {
    initCanvas();
    initParticles();
})
