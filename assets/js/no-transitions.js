// No Transitions JavaScript
// This script replaces any transition scripts and ensures smooth functioning without transitions

document.addEventListener('DOMContentLoaded', function() {
    console.log("No transitions version loaded - transitions completely removed");
    
    // Only set up scroll animations
    setupScrollAnimations();
    
    // Make sure loader is hidden immediately
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }
    
    // Remove any transition elements that might be injected by other scripts
    const removeTransitionElements = function() {
        const transitionElements = document.querySelectorAll('.page-transition, .transition-swipe, [class*="transition-shape"]');
        transitionElements.forEach(element => {
            element.style.display = 'none';
            element.style.opacity = '0';
            element.style.visibility = 'hidden';
        });
    };
    
    // Run initially
    removeTransitionElements();
    
    // Also run after a slight delay to catch any dynamically added elements
    setTimeout(removeTransitionElements, 100);
    
    // Make all links work without transitions
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        // Remove any transition-related event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
});

// Setup scroll-based animations only
function setupScrollAnimations() {
    // Check if GSAP is available
    if (window.gsap && window.ScrollTrigger) {
        // About section animation
        gsap.from(".about-text h2 .word", {
            scrollTrigger: {
                trigger: ".about-text",
                start: "top 70%"
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // Services cards animation
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 70%"
            },
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)"
        });
        
        // Work items animation
        gsap.from(".work-item", {
            scrollTrigger: {
                trigger: ".work-showcase",
                start: "top 70%"
            },
            scale: 0.9,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // Process steps animation
        gsap.from(".process-step", {
            scrollTrigger: {
                trigger: ".process-timeline",
                start: "top 70%"
            },
            x: -50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // CTA section animation
        gsap.from(".cta-content > *", {
            scrollTrigger: {
                trigger: ".cta-section",
                start: "top 70%"
            },
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        });
    }
}