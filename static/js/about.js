// Advanced About Page JavaScript - Futuristic Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax Background Effect
    function initParallax() {
        const parallaxBg = document.getElementById('parallaxBg');
        if (!parallaxBg) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            parallaxBg.style.transform = `translateY(${rate}px)`;
        });

        // Mouse movement parallax
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            parallaxBg.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%, 
                    rgba(36, 50, 75, 0.08) 0%, 
                    rgba(183, 127, 88, 0.06) 30%, 
                    rgba(255, 255, 255, 0.02) 70%
                )
            `;
        });
    }

    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stats-number[data-target]');
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const start = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function for smooth animation
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(target * easeOut);
                        
                        counter.textContent = currentValue;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, options);

        counters.forEach(counter => observer.observe(counter));
    }

    // Timeline Animation
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const options = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200); // Stagger animation
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        timelineItems.forEach(item => observer.observe(item));
    }

    // Dynamic Particle System
    function createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 15; i++) {
            createParticle(particleContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        const opacity = Math.random() * 0.3 + 0.1;
        const color = Math.random() > 0.5 ? '#24324b' : '#b77f58';
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Animate particle
        const duration = Math.random() * 20000 + 10000; // 10-30 seconds
        const drift = (Math.random() - 0.5) * 100; // Horizontal drift

        particle.animate([
            { 
                transform: `translateY(0px) translateX(0px) rotate(0deg)`,
                opacity: opacity
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
            setTimeout(() => createParticle(container), Math.random() * 2000);
        };
    }

    // Interactive Hover Effects for Glass Cards
    function initGlassCardEffects() {
        const glassCards = document.querySelectorAll('.glass-card, .glass-dark, .glass-accent');
        
        glassCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
                
                // Add dynamic highlight
                const highlight = card.querySelector('.card-highlight') || document.createElement('div');
                if (!card.querySelector('.card-highlight')) {
                    highlight.className = 'card-highlight';
                    highlight.style.cssText = `
                        position: absolute;
                        width: 100px;
                        height: 100px;
                        background: radial-gradient(circle, rgba(183, 127, 88, 0.2) 0%, transparent 70%);
                        border-radius: 50%;
                        pointer-events: none;
                        transition: all 0.3s ease;
                    `;
                    card.style.position = 'relative';
                    card.appendChild(highlight);
                }
                
                highlight.style.left = (x - 50) + 'px';
                highlight.style.top = (y - 50) + 'px';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                const highlight = card.querySelector('.card-highlight');
                if (highlight) {
                    highlight.style.opacity = '0';
                }
            });
        });
    }

    // Smooth Scroll with Momentum
    function initSmoothScroll() {
        let currentScroll = 0;
        let targetScroll = 0;
        let ease = 0.1;

        function smoothScrollLoop() {
            currentScroll += (targetScroll - currentScroll) * ease;
            
            if (Math.abs(targetScroll - currentScroll) > 0.1) {
                requestAnimationFrame(smoothScrollLoop);
            }
        }

        window.addEventListener('scroll', () => {
            targetScroll = window.pageYOffset;
            smoothScrollLoop();
        });
    }

    // Dynamic Background Color Based on Scroll
    function initDynamicBackground() {
        const body = document.body;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
            const hue1 = 220; // Blue base
            const hue2 = 25;  // Brown base
            
            const currentHue = hue1 + (hue2 - hue1) * scrollPercent;
            const opacity = 0.02 + scrollPercent * 0.03;
            
            body.style.background = `
                linear-gradient(
                    135deg,
                    hsla(${currentHue}, 50%, 30%, ${opacity}) 0%,
                    hsla(${currentHue + 30}, 40%, 50%, ${opacity * 0.5}) 100%
                ),
                #ffffff
            `;
        });
    }

    // Text Typing Effect for Headlines
    function initTypingEffect() {
        const headline = document.querySelector('.text-reveal');
        if (!headline) return;

        const text = headline.textContent;
        headline.textContent = '';
        headline.classList.remove('text-reveal');
        
        let index = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                headline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Advanced Intersection Observer for Animations
    function initAdvancedAnimations() {
        const animatedElements = document.querySelectorAll('.glow-hover');
        const options = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, options);

        animatedElements.forEach(element => observer.observe(element));
    }

    // Performance-optimized resize handler
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate particle positions and other responsive elements
            const particles = document.querySelectorAll('[style*="position: absolute"]');
            particles.forEach(particle => {
                if (parseFloat(particle.style.left) > window.innerWidth) {
                    particle.style.left = Math.random() * window.innerWidth + 'px';
                }
            });
        }, 250);
    }

    // Initialize all effects
    initParallax();
    animateCounters();
    initTimelineAnimation();
    createParticleSystem();
    initGlassCardEffects();
    initSmoothScroll();
    initDynamicBackground();
    initTypingEffect();
    initAdvancedAnimations();

    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Preload critical animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚀 1729 Chambers - Advanced About Page Loaded');
});
