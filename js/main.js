// ===================================
// Main JavaScript File
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initActiveLinks();
    initSmoothScroll();
    initStatsCounter();
    initProjectFilters();
    initBackToTop();
    initTypingEffect();        // New terminal typing
    initParticles();            // Interactive particles
    initMatrixRain();           // Matrix background
    initCustomCursor();         // Custom cursor
    init3DTilt();               // 3D tilt on cards
    initScrollReveal();         // Scroll reveal animations
    initContactForm();          // Contact form handling
});

// ===================================
// Navbar scroll effect
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// Mobile menu toggle
// ===================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animate toggle icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// Active link highlighting on scroll
// ===================================
function initActiveLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// Smooth scrolling for navigation links
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Animated statistics counter
// ===================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        stat.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ===================================
// Project filtering
// ===================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===================================
// Back to top button
// ===================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Terminal typing effect
// ===================================
function initTypingEffect() {
    const terminalElement = document.getElementById('typingText');
    if (!terminalElement) return;
    
    const terminalLines = [
        '> system.execute("hacker_mode")',
        '> init --cyber',
        '> alias engineer="root"',
        '> Welcome, Admin',
        '> ./configure --enable-security',
        '> sudo hack-the-planet'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeTerminal() {
        const currentLine = terminalLines[lineIndex];
        if (isDeleting) {
            terminalElement.textContent = currentLine.substring(0, charIndex - 1);
            charIndex--;
        } else {
            terminalElement.textContent = currentLine.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentLine.length) {
            isDeleting = true;
            setTimeout(typeTerminal, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % terminalLines.length;
            setTimeout(typeTerminal, 500);
        } else {
            setTimeout(typeTerminal, isDeleting ? 50 : 100);
        }
    }
    
    typeTerminal();
}

// ===================================
// Interactive particles (canvas)
// ===================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticlesArray();
    }
    
    function initParticlesArray() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: `rgba(0, 245, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Move
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });
        requestAnimationFrame(drawParticles);
    }
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        particles.forEach(p => {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                p.vx += dx * 0.0002;
                p.vy += dy * 0.0002;
            }
        });
    });
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
}

// ===================================
// Matrix rain effect
// ===================================
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 14;
    const columns = width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// ===================================
// Custom cursor
// ===================================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ===================================
// 3D tilt effect on cards
// ===================================
function init3DTilt() {
    const cards = document.querySelectorAll('.about-card, .skill-category, .project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ===================================
// Scroll reveal animations
// ===================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .timeline-item, .stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ===================================
// Contact form handling (prevent default, show alert)
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form - in a real website, this would send an email.');
        form.reset();
    });
}