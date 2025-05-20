// Bebo Studio - Main JavaScript File

// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Fix logo display issues - preserve the logo2.svg if it's in the HTML
    const logoImages = document.querySelectorAll('.logo-image');
    logoImages.forEach(img => {
        // Check if we're on an inner page
        const isInnerPage = window.location.pathname.includes('/pages/');
        
        // Only replace the path if it's not already logo2.svg
        if (!img.src.includes('logo2.svg')) {
            // Set correct path to logo based on page location
            img.src = isInnerPage ? '../assets/images/logo2.svg' : 'assets/images/logo2.svg';
        }
        
        // Make sure the logo is visible
        img.style.display = 'block';
        img.style.maxHeight = '40px';
        img.style.width = 'auto';
        
        img.onerror = function() {
            console.log('Logo failed to load, using text fallback');
            const logoContainer = img.parentElement;
            const textLogo = document.createElement('span');
            textLogo.className = 'logo-text';
            textLogo.textContent = 'BEBO STUDIO';
            textLogo.style.color = '#1c3144';
            textLogo.style.fontWeight = '700';
            textLogo.style.fontSize = '1.5rem';
            textLogo.style.letterSpacing = '1px';
            textLogo.style.fontFamily = 'Montserrat, sans-serif';
            logoContainer.replaceChild(textLogo, img);
        };
    });
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Simplified Page Transitions (delegated to direct-transition.js)
    function initPageTransitions() {
        console.log("Page transitions handled by direct-transition.js");
        // The simplified page transitions are now handled by direct-transition.js
        // This function is kept for compatibility with other code that might call it
    }
    
    // Mouse trail implementation
    function initMouseTrail() {
        const cursorFollower = document.querySelector('.cursor-follower');
        const colors = [
            'var(--vibrant-red)',
            'var(--accent-gold)',
            'var(--teal)',
            'var(--deep-navy)',
        ];
        
        // Make cursorFollower visible
        cursorFollower.style.display = 'block';
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move the cursor follower
            cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            
            // Create trail element on mousemove
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            
            // Random size (smaller than the follower)
            const size = 10 + Math.random() * 15;
            trail.style.width = `${size}px`;
            trail.style.height = `${size}px`;
            
            // Random shape
            const borderRadius = `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% / ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`;
            trail.style.borderRadius = borderRadius;
            
            // Random brand color
            const color = colors[Math.floor(Math.random() * colors.length)];
            trail.style.backgroundColor = color;
            
            // Position at current mouse position
            trail.style.left = `${mouseX}px`;
            trail.style.top = `${mouseY}px`;
            
            // Add to body
            document.body.appendChild(trail);
            
            // Animate and remove
            gsap.to(trail, {
                duration: 1 + Math.random() * 0.5,
                opacity: 0,
                scale: 0.2,
                x: (Math.random() - 0.5) * 40,
                y: (Math.random() - 0.5) * 40,
                onComplete: () => {
                    if (trail.parentNode) {
                        document.body.removeChild(trail);
                    }
                }
            });
        });
        
        // Interactive elements behavior
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .work-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Create a burst of trails on hover
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const burstTrail = document.createElement('div');
                        burstTrail.className = 'cursor-trail';
                        
                        // Larger size for burst effect
                        const burstSize = 15 + Math.random() * 20;
                        burstTrail.style.width = `${burstSize}px`;
                        burstTrail.style.height = `${burstSize}px`;
                        
                        // Random shape
                        const burstBorderRadius = `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% / ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`;
                        burstTrail.style.borderRadius = burstBorderRadius;
                        
                        // Random brand color
                        const burstColor = colors[Math.floor(Math.random() * colors.length)];
                        burstTrail.style.backgroundColor = burstColor;
                        burstTrail.style.opacity = 0.7;
                        
                        // Position at current mouse position with random offset
                        const offsetX = (Math.random() - 0.5) * 60;
                        const offsetY = (Math.random() - 0.5) * 60;
                        burstTrail.style.left = `${mouseX}px`;
                        burstTrail.style.top = `${mouseY}px`;
                        
                        // Add to body
                        document.body.appendChild(burstTrail);
                        
                        // Animate and remove
                        gsap.to(burstTrail, {
                            duration: 0.8 + Math.random() * 0.5,
                            opacity: 0,
                            scale: 0.2,
                            x: offsetX,
                            y: offsetY,
                            ease: "power2.out",
                            onComplete: () => {
                                if (burstTrail.parentNode) {
                                    document.body.removeChild(burstTrail);
                                }
                            }
                        });
                    }, i * 50);
                }
            });
        });
    }
    
    // Page loader animation
    function initLoader() {
        const loaderTl = gsap.timeline({
            onComplete: () => {
                document.querySelector('.loader').style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        loaderTl
            .from('.loader-logo', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.text-reveal', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.loader-content', {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: 'power3.out'
            }, '+=0.5')
            .to('.loader', {
                yPercent: -100,
                duration: 0.8,
                ease: 'power3.inOut'
            }, '-=0.3');
    }
    
    // Initialize menu toggle
    function initMenuToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Scroll header effect
    function initScrollHeader() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Split text animation helper
    function splitTextAnimation() {
        const splitTextElements = document.querySelectorAll('.split-text:not(.hero-title)');
        
        splitTextElements.forEach(element => {
            const words = element.querySelectorAll('.word');
            
            gsap.from(words, {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    // Hero section animations
    function initHeroAnimations() {
        const heroTl = gsap.timeline({
            delay: 0.5
        });
        
        // Select all words in the hero title as a whole
        const heroTitle = document.querySelector('.hero-title');
        
        heroTl
            .from(heroTitle, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.hero-tagline', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-buttons', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.floating-shapes .shape', {
                opacity: 0,
                scale: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            }, '-=0.7')
            .from('.hero-image-container', {
                xPercent: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=1.2')
            .from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5');
    }
    
    // Section animations
    function initSectionAnimations() {
        // About Section
        gsap.from('.about-text', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-preview',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.about-image', {
            opacity: 0,
            x: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Services Section
        gsap.from('.service-card', {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Work Section
        gsap.from('.work-item', {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.work-showcase',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Process Section
        gsap.from('.process-step', {
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.process-timeline',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // CTA Section
        gsap.from('.cta-content', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Section Headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    // Process Timeline Animation
    function initProcessAnimation() {
        gsap.to('.process-timeline::before', {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.process-timeline',
                scrub: true,
                start: 'top 80%',
                end: 'bottom 20%'
            }
        });
    }
    
    // Initialize all animations
    function initAnimations() {
        initLoader();
        initMenuToggle();
        initScrollHeader();
        splitTextAnimation();
        initHeroAnimations();
        initSectionAnimations();
        initProcessAnimation();
        initRandomSplats(); // Add random splats to hero section
        initMouseTrail(); // Initialize mouse trail
        initPageTransitions(); // Initialize page transitions
        
        // Force GSAP to update and fix any rendering issues
        gsap.ticker.tick();
        
        // Create a test transition animation to ensure it's visible
        window.addEventListener('load', () => {
            // Wait a moment to let everything initialize
            setTimeout(() => {
                const transition = document.querySelector('.page-transition');
                const shapes = document.querySelectorAll('.transition-shape');
                
                if (transition && shapes.length) {
                    // Make sure shapes are colorful
                    shapes[0].style.background = 'linear-gradient(135deg, #e04646 0%, #fdb813 100%)';
                    shapes[1].style.background = 'linear-gradient(135deg, #1c3144 0%, #2a9d8f 100%)';
                    shapes[2].style.background = 'linear-gradient(135deg, #2a9d8f 0%, #1c3144 100%)';
                    
                    // Show a quick test animation
                    gsap.set(transition, { autoAlpha: 1 });
                    gsap.set(shapes, { scale: 0, rotation: -15 });
                    
                    const testAnim = gsap.timeline({
                        onComplete: () => {
                            gsap.to(transition, {
                                autoAlpha: 0,
                                duration: 0.5,
                                delay: 0.3
                            });
                        }
                    });
                    
                    testAnim.to(shapes, {
                        scale: 1.2,
                        rotation: 0,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    });
                }
            }, 1000);
        });
    }
    
    // Hero section random splats
    function initRandomSplats() {
        const container = document.querySelector('.random-splats');
        if (!container) return;
        
        const colors = [
            'var(--vibrant-red)',
            'var(--accent-gold)',
            'var(--teal)',
            'var(--deep-navy)',
        ];
        
        const createRandomSplat = () => {
            const splat = document.createElement('div');
            splat.className = 'hero-splat';
            
            // Randomize size
            const size = 30 + Math.random() * 120;
            splat.style.width = `${size}px`;
            splat.style.height = `${size}px`;
            
            // Randomize shape
            const borderRadius = `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% / ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`;
            splat.style.borderRadius = borderRadius;
            
            // Randomize color
            const color = colors[Math.floor(Math.random() * colors.length)];
            splat.style.backgroundColor = color;
            
            // Random position - either left or right side
            const isLeftSide = Math.random() > 0.5;
            const xPosition = isLeftSide 
                ? Math.random() * 30 // Left side: 0-30% from left
                : 70 + Math.random() * 30; // Right side: 70-100% from left
                
            const yPosition = Math.random() * 100; // Anywhere vertically
            
            splat.style.left = `${xPosition}%`;
            splat.style.top = `${yPosition}%`;
            
            // Add to DOM
            container.appendChild(splat);
            
            // Animate appearance
            gsap.fromTo(splat, 
                { scale: 0, opacity: 0, rotation: -30 + Math.random() * 60 },
                { 
                    scale: 1, 
                    opacity: 0.4, 
                    duration: 0.8, 
                    ease: 'elastic.out(1, 0.5)',
                    onComplete: () => {
                        // Gradually fade out
                        gsap.to(splat, {
                            opacity: 0,
                            duration: 4 + Math.random() * 3,
                            delay: 2 + Math.random() * 3,
                            onComplete: () => {
                                container.removeChild(splat);
                            }
                        });
                    }
                }
            );
        };
        
        // Create initial splats
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createRandomSplat();
            }, i * 300);
        }
        
        // Continue creating new splats periodically
        setInterval(() => {
            if (container.childElementCount < 20) { // Limit max number of splats
                createRandomSplat();
            }
        }, 2000);
    }
    
    // Call the main initialization function
    initAnimations();
});