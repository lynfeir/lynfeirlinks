// Enhanced Portfolio JavaScript with Modern Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initCursor();
    initNavigation();
    initParticles();
    initNeuralNetwork();
    initTypewriter();
    initScrollEffects();
    initProjectFiltering();
    initStatsAnimation();
    initSkillsAnimation();
    initFormEffects();
    initFloatingShapes();
    initGlitchEffect();
    
    // Custom Cursor
    function initCursor() {
        const cursor = document.querySelector('.cursor-follower');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (!cursor || !cursorDot) return;
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            dotX += (mouseX - dotX) * 0.8;
            dotY += (mouseY - dotY) * 0.8;
            
            cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
            
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(1.5)';
                cursorDot.style.transform += ' scale(2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursorDot.style.transform = cursorDot.style.transform.replace(' scale(2)', '');
            });
        });
    }
    
    // Enhanced Navigation
    function initNavigation() {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Smooth scrolling with offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Enhanced Particle System
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            createAdvancedParticle(particlesContainer);
        }
    }
    
    function createAdvancedParticle(container) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 10;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${getParticleColor()};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: 
                particleFloat ${duration}s infinite linear,
                particleTwinkle ${Math.random() * 4 + 2}s infinite alternate;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size + 3}px ${getParticleColor()};
            z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Add random movement
        setInterval(() => {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            const newLeft = currentLeft + (Math.random() - 0.5) * 2 * direction;
            const newTop = currentTop + (Math.random() - 0.5) * 2;
            
            if (newLeft >= 0 && newLeft <= 100) {
                particle.style.left = newLeft + '%';
            }
            if (newTop >= 0 && newTop <= 100) {
                particle.style.top = newTop + '%';
            }
        }, duration * 100);
    }
    
    function getParticleColor() {
        const colors = ['#6e4ff6', '#07cdff', '#ff3e7f', '#ffffff', '#bc4ff6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Neural Network Animation
    function initNeuralNetwork() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const nodes = [];
        const nodeCount = 50;
        const connectionDistance = 150;
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1
            });
        }
        
        function animateNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(110, 79, 246, 0.6)';
                ctx.fill();
                
                // Draw connections
                nodes.slice(i + 1).forEach(otherNode => {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    if (distance < connectionDistance) {
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(7, 205, 255, ${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateNetwork);
        }
        
        animateNetwork();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Typewriter Effect
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;
        
        const text = typewriterElement.getAttribute('data-text');
        typewriterElement.textContent = '';
        
        let i = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Glitch Effect
    function initGlitchEffect() {
        const glitchText = document.querySelector('.glowing-text');
        if (!glitchText) return;
        
        setInterval(() => {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = 'gradientShift 3s infinite, textGlow 2s infinite alternate';
            }, 10);
        }, 3000);
    }
    
    // Scroll Effects
    function initScrollEffects() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('skills-section')) {
                        animateSkills();
                    }
                    if (entry.target.classList.contains('about-section')) {
                        animateStats();
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(section);
        });
        
        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Project Filtering with Enhanced Effects
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category').toLowerCase();
                    
                    if (filter === 'all' || filter === category) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8) rotateY(90deg)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) rotateY(0deg)';
                            }, 50);
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8) rotateY(-90deg)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Stats Animation
    function initStatsAnimation() {
        window.animateStats = function() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const progressRings = document.querySelectorAll('.progress-ring circle');
            
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target'));
                const ring = progressRings[index];
                const circumference = 2 * Math.PI * 30; // radius = 30
                
                if (ring) {
                    ring.style.strokeDasharray = circumference;
                    ring.style.strokeDashoffset = circumference;
                }
                
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    stat.textContent = Math.floor(current) + '+';
                    
                    if (ring) {
                        const progress = current / target;
                        const offset = circumference - (progress * circumference);
                        ring.style.strokeDashoffset = offset;
                    }
                }, 50);
            });
        };
    }
    
    // Skills Animation
    function initSkillsAnimation() {
        window.animateSkills = function() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width;
                    
                    // Add particle effect
                    const glow = bar.querySelector('.skill-glow');
                    if (glow) {
                        setTimeout(() => {
                            glow.style.animationPlayState = 'running';
                        }, 1000);
                    }
                }, index * 200);
            });
        };
    }
    
    // Form Effects
    function initFormEffects() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                createInputParticles(this);
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Submit button effects
        const submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                if (form.checkValidity()) {
                    createButtonRipple(this, e);
                }
            });
        }
    }
    
    function createInputParticles(input) {
        const rect = input.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #07cdff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                animation: inputParticle 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    function createButtonRipple(button, event) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Floating Shapes Animation
    function initFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 100;
                const randomY = (Math.random() - 0.5) * 100;
                const randomRotation = Math.random() * 360;
                
                shape.style.transform = `
                    translate(${randomX}px, ${randomY}px) 
                    rotate(${randomRotation}deg)
                `;
            }, 8000 + (index * 1000));
        });
    }
    
    // Add CSS animations dynamically
    function addDynamicStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes particleTwinkle {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(0.8);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }
            
            @keyframes inputParticle {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    addDynamicStyles();
    
    // Performance optimization
    let ticking = false;
    
    function updateAnimations() {
        // Update cursor position and other animations
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    // Mouse move optimization
    document.addEventListener('mousemove', requestTick);
    
    // Initialize intersection observer for performance
    const observerOptions = {
        root: null,
        threshold: 0.1
    };
    
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.project-card, .skill-item, .stat-item').forEach(el => {
        performanceObserver.observe(el);
    });
    
    // Preload critical animations
    function preloadAnimations() {
        const preloadElements = [
            '.glowing-text',
            '.typewriter',
            '.morphing-btn',
            '.hologram-btn'
        ];
        
        preloadElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.willChange = 'transform, opacity';
            }
        });
    }
    
    preloadAnimations();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Clean up animations and event listeners
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
        });
    });
    
    console.log('🚀 Enhanced portfolio loaded with modern effects!');
});