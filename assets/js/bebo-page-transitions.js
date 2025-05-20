// Bebo Studio Page Transitions - DISABLED
// This file is kept for reference but functionality has been removed

document.addEventListener('DOMContentLoaded', function() {
    console.log("Page transitions disabled as requested");
    
    // The following is retained for scroll animations only
    setupScrollAnimations();
});

// Setup scroll-based animations only (transitions removed)
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