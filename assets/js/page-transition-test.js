// Standalone test for page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Wait a brief moment to ensure everything is loaded
    setTimeout(function() {
        console.log("Running page transition test");
        
        // Get transition elements
        const transition = document.querySelector('.page-transition');
        
        if (!transition) {
            console.error("Could not find page transition elements");
            return;
        }
        
        // Clear existing content
        transition.innerHTML = '';
        
        // Create a single swipe element for the test
        const swipe = document.createElement('div');
        swipe.className = 'transition-swipe';
        
        // Apply Bebo brand gradient
        swipe.style.background = 'linear-gradient(90deg, #e04646 0%, #fdb813 50%, #2a9d8f 100%)';
        transition.appendChild(swipe);
        
        // Make transition visible
        transition.style.visibility = 'visible';
        transition.style.opacity = '1';
        
        // Initial state - swipe fully covering the screen from right
        swipe.style.transform = 'translateX(0)';
        
        // Animate swipe out to the left
        setTimeout(function() {
            swipe.style.transition = 'transform 0.6s ease-in-out';
            swipe.style.transform = 'translateX(-100%)';
            
            // Hide transition after animation completes
            setTimeout(function() {
                transition.style.transition = 'opacity 0.3s ease';
                transition.style.opacity = '0';
                transition.style.visibility = 'hidden';
            }, 600);
        }, 300);
        
        console.log("Page transition test animation started");
    }, 1500); // Wait 1.5 seconds before running
});