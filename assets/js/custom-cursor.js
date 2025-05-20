// Custom cursor effect to complement page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on non-touch devices
    if (!('ontouchstart' in window)) {
        // Create cursor follower if it doesn't exist
        let cursor = document.querySelector('.cursor-follower');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'cursor-follower';
            document.body.appendChild(cursor);
        }
        
        // Make cursor visible but positioned outside viewport initially
        cursor.style.display = 'block';
        
        // Mouse move event
        document.addEventListener('mousemove', function(e) {
            // Position cursor follower at mouse position
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .work-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
            });
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', function() {
            cursor.style.display = 'none';
        });
        
        // Show cursor when mouse enters window
        document.addEventListener('mouseenter', function() {
            cursor.style.display = 'block';
        });
    }
});