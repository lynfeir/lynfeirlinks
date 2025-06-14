// scripts.js
function dismissWarning() {
  document.body.classList.add('mobile-warning-dismissed');
  document.querySelector('.mobile-warning').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
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
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || filter === category) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Animated skill bars
    function animateSkillBars() {
      const skillBars = document.querySelectorAll('.skill-progress');
      
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
    
    // Initialize particle background
    function initParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
      }
    }
    
    function createParticle(container) {
      const particle = document.createElement('div');
      
      // Randomize particle properties
      const size = Math.random() * 3 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // Set particle style
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${getRandomColor()};
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: ${Math.random() * 0.6 + 0.2};
        animation: twinkle ${duration}s infinite ${delay}s;
        box-shadow: 0 0 ${size + 2}px ${getRandomColor(true)};
      `;
      
      container.appendChild(particle);
    }
    
    function getRandomColor(glow = false) {
      const colors = glow ? 
        ['rgba(110, 79, 246, 0.8)', 'rgba(7, 205, 255, 0.8)', 'rgba(255, 62, 127, 0.8)'] :
        ['#6e4ff6', '#07cdff', '#ff3e7f', '#ffffff'];
      
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Add CSS animation for particles
    function addParticleStyles() {
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerHTML = `
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.7);
          }
          50% {
            opacity: 0.7;
            transform: scale(1);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to your server
        // For now we'll just show an alert
        alert(`Thank you ${name} for your message! We'll get back to you soon.`);
        
        // Reset the form
        contactForm.reset();
      });
    }
    
    // Reveal animations on scroll
    function initScrollReveal() {
      const sections = document.querySelectorAll('section');
      
      const revealSection = function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
            
            // If it's the skills section, animate the skill bars
            if (entry.target.classList.contains('skills-section')) {
              animateSkillBars();
            }
          }
        });
      };
      
      const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
      });
      
      sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
      });
      
      // Add CSS for section reveals
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerHTML = `
        .section-hidden {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s;
        }
        
        .revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });
  
    
    // Initialize everything
    addParticleStyles();
    initParticles();
    initScrollReveal();
    
    // Set initial skill bar widths
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const width = bar.style.width;
      bar.style.setProperty('--width', width);
    });
  });