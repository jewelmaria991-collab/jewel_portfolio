// script.js
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveLink();
    });
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-card')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    const level = skillBar.getAttribute('data-level');
                    skillBar.style.width = level + '%';
                }
                
                if (entry.target.classList.contains('language-item')) {
                    const circleFill = entry.target.querySelector('.circle-fill');
                    const percentage = circleFill.getAttribute('data-percentage');
                    const circumference = 339.292;
                    const offset = circumference - (percentage / 100) * circumference;
                    circleFill.style.strokeDashoffset = offset;
                }
                
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-card, .language-item, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    const gradientDef = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.innerHTML = `
        <stop offset="0%" stop-color="#a8394f"/>
        <stop offset="100%" stop-color="#b8859a"/>
    `;
    gradientDef.appendChild(gradient);
    
    const firstSVG = document.querySelector('.circle-progress');
    if (firstSVG) {
        firstSVG.insertBefore(gradientDef, firstSVG.firstChild);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});