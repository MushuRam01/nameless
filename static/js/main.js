// ==============================================
// MAIN JAVASCRIPT - UNIVERSAL FUNCTIONALITY
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle the active class on the hamburger button
            mobileMenuToggle.classList.toggle('active');
            
            // Toggle the show class on the mobile menu
            mobileMenu.classList.toggle('show');
            
            // Toggle hidden class for proper display
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && !mobileMenu.classList.contains('hidden')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
            }
        });
        
        // Close mobile menu on window resize (desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // md breakpoint
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
            }
        });
    }
});

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

// Smooth scroll function for internal links
function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// Add smooth scrolling to anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
});
