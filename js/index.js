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

if(regex.test(navigator.userAgent) ) {
    const span = document.createElement("span");
    span.textContent = "this is mobile";

    document.querySelector(".attribution").appendChild(span);
    
}else{
    const span = document.createElement("span");
    span.textContent = "this is pc";

    document.querySelector(".attribution").appendChild(span);
    initTiltEffect();
}




/************************\
    Ripple Effect Start
\************************/

const rippleElements = document.querySelectorAll(".ripple-element");

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

class Particle{
    constructor(ctx, color){
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;

        this.edgeSize = 20;
        
        this.x = this.edgeSize + Math.floor((Math.random()*(this.canvas.width - 2*this.edgeSize)));
        this.y = this.edgeSize + Math.floor((Math.random()*(this.canvas.height - 2*this.edgeSize)));

        this.radius = Math.floor(Math.random()*1 + 2);

        this.speedX = (Math.random() - 1) || 1;
        this.speedY = (Math.random() - 1) || -1;

        this.color = color;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;

    }

    checkCollision(){
        if(this.x - this.radius <= 0 || this.x + this.radius >= this.canvas.width){
            this.speedX *= -1;
        }

        if(this.y - this.radius <= 0 || this.y + this.radius >= this.canvas.height){
            this.speedY *= -1;
        }
    }
}

const resizeCanvas = (canvas, container) => {
    const {clientWidth, clientHeight} = container;
    
    canvas.width = clientWidth;
    canvas.height = clientHeight;
}


const initParticles = (PARTICLES_ARRAY, NUMBER_OF_PARTICLES, ctx, COLOR) => {
    const length = PARTICLES_ARRAY.length;

    for(let i = 0; i < length; i++){
        PARTICLES_ARRAY.pop();
    }

    for(let i = 0; i < NUMBER_OF_PARTICLES; i++){
        PARTICLES_ARRAY.push(new Particle(ctx, COLOR));
    }

}


const createCanvas = (container) => {
    const canvas = document.createElement("CANVAS");
    canvas.classList.add("canvas");

    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    resizeCanvas(canvas, container);

    /* Particles creation start */
    const PARTICLES_ARRAY = [];
    let NUMBER_OF_PARTICLES = 5;
    let COLOR = "yellow";

    if(container.classList.contains("card__plan")){
        NUMBER_OF_PARTICLES = 2;
    }
    if(container.classList.contains("card__img-container")){
        NUMBER_OF_PARTICLES = 3;
    }
    if(container.classList.contains("card__btn")){
        NUMBER_OF_PARTICLES = 2;
    }

    if(container.classList.contains("card__content")){
        COLOR = "hsl(245, 75%, 52%)";
    }


    initParticles(PARTICLES_ARRAY, NUMBER_OF_PARTICLES, ctx, COLOR);
    /* Particles creation end */

    console.log(PARTICLES_ARRAY);


    /* Animations start */
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
    /* Animations end */


    return {
        particlesArray:PARTICLES_ARRAY, 
        numberOfParticles:NUMBER_OF_PARTICLES,
        ctx, 
        color: COLOR,
        containerElement: container
    }

}

const canvasContainers = document.querySelectorAll(".canvas-container");

const canvasObjects = [];

canvasContainers.forEach(container => {
    const canvasObject = createCanvas(container);
    canvasObjects.push(canvasObject);
})


window.addEventListener("resize", () => {
    canvasObjects.forEach(canvasObject => {
        
        initParticles(
            canvasObject.particlesArray,
            canvasObject.numberOfParticles,
            canvasObject.ctx,
            canvasObject.color    
        );

        resizeCanvas(canvasObject.ctx.canvas, canvasObject.containerElement);

    })
})