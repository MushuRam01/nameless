// Get the canvas element and its 2D rendering context
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    // Store window dimensions for responsiveness
    w = window.innerWidth,
    h = window.innerHeight,
    // Array to hold all particles
    particles = [],
    // Number of particles (adjust as needed for performance/density)
    maxParticles = 100; // Reduced from 150 for potentially better performance

// Particle constructor function
function Particle() {
    // Random position within the canvas
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    // Random velocity components
    this.vx = (Math.random() - 0.5) * 2; // -1 to 1
    this.vy = (Math.random() - 0.5) * 2; // -1 to 1
    // Random radius for the particle
    this.radius = Math.random() * 2 + 1; // 1 to 3
    // Color of the particle (a light beige/brown to match theme)
    this.color = '#D4B89F'; // Lighter beige/brown from your theme
    // Opacity for fading in/out
    this.opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
}

// Draw method for a particle
Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'rgba(' + parseInt(this.color.substring(1,3), 16) + ',' + parseInt(this.color.substring(3,5), 16) + ',' + parseInt(this.color.substring(5,7), 16) + ',' + this.opacity + ')';
    ctx.fill();
};

// Animation loop
function animate() {
    // Clear the canvas for the next frame
    ctx.clearRect(0, 0, w, h);

    // Update and draw each particle
    for (var i = 0; i < maxParticles; i++) {
        var p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary conditions: if particle goes off screen, reset its position
        if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
            // Reset to a random edge
            if (Math.random() < 0.5) { // Reset from left/right
                p.x = Math.random() < 0.5 ? -50 : w + 50;
                p.y = Math.random() * h;
            } else { // Reset from top/bottom
                p.x = Math.random() * w;
                p.y = Math.random() < 0.5 ? -50 : h + 50;
            }
        }

        p.draw();
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Initialize particles
function init() {
    // Set canvas dimensions
    canvas.width = w;
    canvas.height = h;

    // Create particles
    for (var i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    // Start the animation loop
    animate();
}

// Handle window resizing
window.addEventListener('resize', function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    // Optionally re-initialize particles or adjust their positions
    // For simplicity, we just resize the canvas here; particles continue their path
});

// Start the animation when the window loads
window.onload = function() {
    init();
};
