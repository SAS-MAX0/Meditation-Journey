const text = document.getElementById("text");
const container = document.getElementById("container");
const backgroundMusic = document.getElementById("background-music");
const playMusicBtn = document.getElementById("play-music-btn");
const pauseMusicBtn = document.getElementById("pause-music-btn");
const volumeControl = document.getElementById("volume-control");

let breatheInTime = 5000; // Time for breathing in (5 seconds)
let holdTime = 2000; // Time to hold breath (2 seconds)
let breatheOutTime = 5000; // Time for breathing out (5 seconds)

playMusicBtn.addEventListener("click", () => {
    backgroundMusic.play();
});

pauseMusicBtn.addEventListener("click", () => {
    backgroundMusic.pause();
});

volumeControl.addEventListener("input", (e) => {
    backgroundMusic.volume = e.target.value;
});

// Breathing animation function
function breatheAnimation() {
    text.innerHTML = "Breathe In";
    container.classList.add("breathe-in");

    setTimeout(() => {
        text.innerText = "Hold";

        setTimeout(() => {
            text.innerText = "Breathe Out";
            container.classList.add("breathe-out");
            container.classList.remove("breathe-in");
        }, holdTime);
    }, breatheInTime);
}

// Start the breathing animation cycle
setInterval(breatheAnimation, breatheInTime + holdTime + breatheOutTime + 2000); // Adjust interval to match the full cycle

// Particle Animation
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.alpha = 0.05;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += 0.01;

        if (this.alpha >= 1) {
            this.alpha = 0.05;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleCount; i++) {
        let particle = new Particle();
        particles.push(particle);
    }

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
