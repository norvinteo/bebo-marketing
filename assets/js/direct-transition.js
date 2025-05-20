// Direct page transition script
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page Transition script loaded");
    
    // Ensure transition elements exist at the start
    const ensureTransitionElementsExist = function() {
        // Check if transition wrapper exists
        let transition = document.querySelector('.page-transition');
        
        // If it doesn't exist, create it
        if (!transition) {
            console.log("Creating missing transition wrapper");
            transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
        }
        
        // Clear existing shapes if any
        transition.innerHTML = '';
        
        // Create a single swipe element
        const swipe = document.createElement('div');
        swipe.className = 'transition-swipe';
        
        // Apply Bebo brand gradient
        swipe.style.background = 'linear-gradient(90deg, #e04646 0%, #fdb813 50%, #2a9d8f 100%)';
        transition.appendChild(swipe);
        
        return {
            transition: transition,
            swipe: swipe
        };
    };
    
    // Initialize the transition elements
    const { transition, swipe } = ensureTransitionElementsExist();
    
    // Force animation to happen immediately (entry animation)
    window.onload = function() {
        console.log("Forcing page transition animation");
        
        if (transition) {
            // Make transition visible
            transition.style.visibility = 'visible';
            transition.style.opacity = '1';
            
            // Initial state - swipe fully covering the screen from right
            if (swipe) {
                swipe.style.transform = 'translateX(0)';
            }
            
            // Animate swipe out to the left
            setTimeout(function() {
                if (swipe) {
                    swipe.style.transition = 'transform 0.6s ease-in-out';
                    swipe.style.transform = 'translateX(-100%)';
                }
                
                // Hide transition after animation completes
                setTimeout(function() {
                    transition.style.transition = 'opacity 0.3s ease';
                    transition.style.opacity = '0';
                    transition.style.visibility = 'hidden';
                }, 600);
            }, 300);
        } else {
            console.error("Transition elements not found or created");
        }
    };
    
    // Set up click handlers for all links
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && !href.startsWith('http')) {
                e.preventDefault();
                console.log("Animating transition for navigation to:", href);
                
                // Ensure we have transition elements before animating
                const { transition, swipe } = ensureTransitionElementsExist();
                
                if (transition && swipe) {
                    // Show transition
                    transition.style.visibility = 'visible';
                    transition.style.opacity = '1';
                    
                    // Initial state - swipe off-screen to the left
                    swipe.style.transition = 'none';
                    swipe.style.transform = 'translateX(-100%)';
                    
                    // Force reflow to ensure the transition applies
                    void swipe.offsetWidth;
                    
                    // Animate swipe in from left to right
                    setTimeout(() => {
                        swipe.style.transition = 'transform 0.6s ease-in-out';
                        swipe.style.transform = 'translateX(0)';
                        
                        // Navigate after animation
                        setTimeout(() => {
                            console.log("Navigation to:", href);
                            window.location.href = href;
                        }, 600);
                    }, 100);
                } else {
                    // If transition elements not found, just navigate
                    window.location.href = href;
                }
            }
        });
    });
});