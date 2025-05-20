// Splash Animation Script
document.addEventListener('DOMContentLoaded', function() {
    console.log("Splash Animation initializing");
    
    // Only show splash on homepage
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.endsWith('/bebo-marketing/') ||
                      window.location.pathname.endsWith('/bebo-marketing/index.html');
    
    if (!isHomepage) {
        console.log("Not on homepage, skipping splash animation");
        return;
    }
    
    // Create splash screen if it doesn't exist
    if (!document.querySelector('.splash-screen')) {
        console.log("Creating splash screen elements");
        createSplashScreen();
    }
    
    // Initialize GSAP animation for the splash screen
    initSplashAnimation();
});

// Helper function to create splash screen
function createSplashScreen() {
    // Create splash screen elements
    const splashScreen = document.createElement('div');
    splashScreen.className = 'splash-screen';
    
    // Create splash container
    const splashContainer = document.createElement('div');
    splashContainer.className = 'splash-container';
    
    // Create background element
    const splashBackground = document.createElement('div');
    splashBackground.className = 'splash-background';
    splashContainer.appendChild(splashBackground);
    
    // Create shapes container
    const splashShapes = document.createElement('div');
    splashShapes.className = 'splash-shapes';
    
    // Add shape elements
    for (let i = 1; i <= 4; i++) {
        const shape = document.createElement('div');
        shape.className = 'splash-shape shape-' + i;
        splashShapes.appendChild(shape);
    }
    
    splashContainer.appendChild(splashShapes);
    
    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.className = 'splash-logo-container';
    
    // Create logo element
    const logo = document.createElement('img');
    logo.className = 'splash-logo';
    logo.src = 'assets/images/logo.svg';
    logo.alt = 'Bebo Studio';
    
    logoContainer.appendChild(logo);
    splashContainer.appendChild(logoContainer);
    
    // Create progress bar (positioned between logo and text)
    const progress = document.createElement('div');
    progress.className = 'splash-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'splash-progress-bar';
    
    progress.appendChild(progressBar);
    splashContainer.appendChild(progress);
    
    // Create text container
    const textContainer = document.createElement('div');
    textContainer.className = 'splash-text-container';
    
    // Create text element with the tagline
    const taglineContainer = document.createElement('div');
    taglineContainer.className = 'splash-tagline-container';
    
    // Create individual word containers for each word of the tagline
    const words = ['We', 'make', 'pretty', 'things', 'work'];
    const classes = ['', '', 'highlight', '', 'bold'];
    
    words.forEach((word, index) => {
        // Create container for each word
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word-container';
        
        // Create word element
        const wordSpan = document.createElement('div');
        wordSpan.className = 'splash-word ' + (classes[index] ? classes[index] : '');
        wordSpan.textContent = word;
        
        wordContainer.appendChild(wordSpan);
        taglineContainer.appendChild(wordContainer);
    });
    
    textContainer.appendChild(taglineContainer);
    splashContainer.appendChild(textContainer);
    
    // Add container to splash screen
    splashScreen.appendChild(splashContainer);
    
    // Add splash screen to body as the first element
    document.body.insertBefore(splashScreen, document.body.firstChild);
}

// Initialize GSAP animation for the splash screen
function initSplashAnimation() {
    // Get splash elements
    const splashScreen = document.querySelector('.splash-screen');
    const splashLogo = document.querySelector('.splash-logo');
    const wordContainers = document.querySelectorAll('.word-container');
    const splashWords = document.querySelectorAll('.splash-word');
    const splashShapes = document.querySelectorAll('.splash-shape');
    const splashBackground = document.querySelector('.splash-background');
    const splashProgress = document.querySelector('.splash-progress');
    const splashProgressBar = document.querySelector('.splash-progress-bar');
    
    // Ensure GSAP is available
    if (!window.gsap) {
        console.error("GSAP not loaded, can't animate splash screen");
        splashScreen.remove();
        return;
    }
    
    // Create a timeline for the animation sequence
    const tl = gsap.timeline({
        onComplete: () => {
            // Remove splash screen after animation completes
            gsap.to(splashScreen, {
                opacity: 0,
                duration: 0.6,
                onComplete: () => splashScreen.remove()
            });
        }
    });
    
    // Initial setup - make sure everything is at the starting position
    gsap.set(splashBackground, { opacity: 0, scale: 0.5 });
    gsap.set(splashLogo, { opacity: 0, scale: 0.8 });
    gsap.set(splashProgress, { opacity: 0 });
    gsap.set(splashProgressBar, { width: '0%' });
    gsap.set(splashShapes, { opacity: 0, scale: 0 });
    
    // Set initial states for words
    gsap.set(splashWords, { 
        opacity: 0,
        y: 50 // Start words below their final position
    });
    
    // Animation sequence
    tl
        // Animate background
        .to(splashBackground, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
        // Show progress bar
        .to(splashProgress, { opacity: 1, duration: 0.5 }, "-=1.2")
        // Animate progress bar
        .to(splashProgressBar, { width: '100%', duration: 2.5, ease: "power1.inOut" }, "-=1")
        // Animate logo
        .to(splashLogo, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=2")
        // Animate shapes with staggered timing
        .to(splashShapes, { 
            opacity: 1, 
            scale: 1, 
            rotation: function() { return Math.random() * 20 - 10; }, 
            duration: 1.2, 
            stagger: 0.15, 
            ease: "back.out(1.7)" 
        }, "-=1.5")
        // Animate tagline words with slide-up effect
        .to(splashWords, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.12, 
            ease: "back.out(1.7)" 
        }, "-=1");
    
    // Start the animation
    tl.play();
}