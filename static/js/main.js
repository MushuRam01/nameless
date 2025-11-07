// ==============================================
// MAIN JAVASCRIPT - UNIVERSAL FUNCTIONALITY
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // Legal Disclaimer Popup Functionality
    initLegalDisclaimer();
    
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
// LEGAL DISCLAIMER POPUP FUNCTIONALITY
// ==============================================

function initLegalDisclaimer() {
    const disclaimerPopup = document.getElementById('legalDisclaimer');
    const agreeBtn = document.getElementById('agreeBtn');
    const disagreeBtn = document.getElementById('disagreeBtn');
    
    // Check if user has already accepted the disclaimer
    const hasAcceptedDisclaimer = localStorage.getItem('1729chambers_disclaimer_accepted');
    
    if (!hasAcceptedDisclaimer) {
        // Show the popup after a brief delay
        setTimeout(() => {
            disclaimerPopup.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 500);
    }
    
    // Handle Agree button
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            // Store acceptance in localStorage
            localStorage.setItem('1729chambers_disclaimer_accepted', 'true');
            localStorage.setItem('1729chambers_disclaimer_date', new Date().toISOString());
            
            // Hide the popup
            disclaimerPopup.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable background scrolling
            
            // Optional: Track analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'legal_disclaimer_accepted', {
                    'event_category': 'legal',
                    'event_label': 'disclaimer_popup'
                });
            }
        });
    }
    
    // Handle Disagree button
    if (disagreeBtn) {
        disagreeBtn.addEventListener('click', function() {
            // Redirect to a different page or show a message
            alert('You must agree to the terms to access this website.');
            
            // Optional: Redirect to external site or show alternative content
            // window.location.href = 'https://www.google.com';
            
            // For now, just keep the popup open
        });
    }
    
    // Prevent closing popup by clicking outside (force user decision)
    disclaimerPopup.addEventListener('click', function(event) {
        if (event.target === disclaimerPopup) {
            // Don't close on backdrop click - force user to make a decision
            return false;
        }
    });
}

// Function to reset disclaimer (for testing purposes)
function resetDisclaimer() {
    localStorage.removeItem('1729chambers_disclaimer_accepted');
    localStorage.removeItem('1729chambers_disclaimer_date');
    location.reload();
}

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
