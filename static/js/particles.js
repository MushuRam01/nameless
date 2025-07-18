// Create particle effect
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) {
        console.warn('Particles container not found. Particle effect will not be initialized.');
        return;
    }

    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size (small)
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // White particles, adjust as needed

        // Initial position
        resetParticle(particle);

        particlesContainer.appendChild(particle);

        // Animate
        animateParticle(particle);
    }

    function resetParticle(particle) {
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';

        return {
            x: posX,
            y: posY
        };
    }

    function animateParticle(particle) {
        // Initial position
        const pos = resetParticle(particle);

        // Random animation properties
        const duration = Math.random() * 10 + 10; // Duration between 10 and 20 seconds
        const delay = Math.random() * 5; // Delay up to 5 seconds

        // Animate with GSAP-like timing using setTimeout for simplicity
        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1; // Random opacity between 0.1 and 0.4

            // Move in a slight direction
            const moveX = pos.x + (Math.random() * 20 - 10); // Move horizontally between -10% and +10%
            const moveY = pos.y - Math.random() * 30; // Move upwards, between 0 and -30%

            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;

            // Reset after animation completes
            setTimeout(() => {
                animateParticle(particle); // Loop the animation
            }, duration * 1000);
        }, delay * 1000);
    }

    // Mouse interaction (optional, based on your provided code)
    document.addEventListener('mousemove', (e) => {
        // Create particles at mouse position
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;

        // Create temporary particle
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Small size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Brighter for mouse particles
        particle.style.position = 'absolute'; // Ensure it's positioned correctly
        particle.style.borderRadius = '50%'; // Make it round

        // Position at mouse
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';

        particlesContainer.appendChild(particle);

        // Animate outward
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';

            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, 10);

        // Note: The "Subtle movement of gradient spheres" part in your JS snippet
        // refers to elements with class 'gradient-sphere'. Since we replaced the
        // previous CSS gradient spheres, this part of the JS might not have
        // an effect unless you add new elements with that class.
        // For this particle effect, it's generally not needed.
    });
});