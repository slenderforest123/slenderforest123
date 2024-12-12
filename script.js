// Confetti animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Resize the canvas to fill the entire screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let confetti = Array(200).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
}));

let animationActive = false; // Confetti animation initially paused

function drawConfetti() {
    if (!animationActive) return; // Stop animation if not active

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        // Reset position when confetti goes off screen
        if (p.y > canvas.height) p.y = -p.r;
        if (p.x > canvas.width) p.x = -p.r;
        if (p.x < -p.r) p.x = canvas.width;
    });

    requestAnimationFrame(drawConfetti);
}

// Play birthday music and show content on button click
document.getElementById('startMusic').addEventListener('click', () => {
    const audio = new Audio('birthday_song.mp3');
    audio.loop = true; // Enable repeat mode
    audio.play().catch(error => {
        console.error("Playback failed due to browser restrictions:", error);
    });

    // Start confetti animation
    animationActive = true;
    drawConfetti();

    // Show the container and add animations
    const container = document.querySelector('.container');
    container.classList.add('visible');

    document.querySelector('.cake').classList.add('tilt-left');
    document.querySelector('.profile-pic').classList.add('tilt-right');

    // Optionally hide the button
    document.getElementById('startMusic').style.display = 'none';
});
