// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Custom Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Hide cursor when not moving
let mouseTimer;
document.addEventListener('mousemove', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    }, 2000);
});

// Typing Animation
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation on hero
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    setTimeout(() => {
        typeWriter(typingElement, 'Software Architect • 15 Years Journey', 50);
    }, 1500);
});

// Hero Canvas Animation with PixiJS
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const app = new PIXI.Application({
        view: canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        background: 0x0a0a0a,
        antialias: true
    });

    // Create particle system
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = new PIXI.Graphics();
        particle.beginFill(0x00d4ff, Math.random() * 0.5 + 0.1);
        particle.drawCircle(0, 0, Math.random() * 3 + 1);
        particle.endFill();
        
        particle.x = Math.random() * app.screen.width;
        particle.y = Math.random() * app.screen.height;
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        particle.alpha = Math.random() * 0.5 + 0.2;
        
        particles.push(particle);
        app.stage.addChild(particle);
    }

    // Animation loop
    app.ticker.add(() => {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x > app.screen.width) particle.x = 0;
            if (particle.x < 0) particle.x = app.screen.width;
            if (particle.y > app.screen.height) particle.y = 0;
            if (particle.y < 0) particle.y = app.screen.height;
            
            particle.alpha = Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.3 + 0.3;
        });
    });

    // Resize handler
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
}

// Skills Canvas Animation
function initSkillsCanvas() {
    const canvas = document.getElementById('skills-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const nodes = [];
    const nodeCount = 50;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x > canvas.width) node.x = 0;
            if (node.x < 0) node.x = canvas.width;
            if (node.y > canvas.height) node.y = 0;
            if (node.y < 0) node.y = canvas.height;
            
            // Draw connections
            nodes.slice(i + 1).forEach(otherNode => {
                const distance = Math.sqrt(
                    Math.pow(node.x - otherNode.x, 2) + 
                    Math.pow(node.y - otherNode.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 - distance / 300})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.stroke();
                }
            });
            
            // Draw node
            ctx.beginPath();
            ctx.fillStyle = `rgba(0, 212, 255, ${node.alpha})`;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// GSAP Animations
function initGSAPAnimations() {
    // Navigation animation
    gsap.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Hero content animations
    gsap.timeline()
        .from('.hero-title .title-text', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .from('.title-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-description p', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Skills animation
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });

    // Contact items animation
    gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });

    // Parallax effects
    gsap.utils.toArray('.hero-bg').forEach(bg => {
        gsap.to(bg, {
            scrollTrigger: {
                trigger: bg,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: -200,
            ease: 'none'
        });
    });
}

// Mo.js Animations for Interactive Elements
function initMoAnimations() {
    // Burst animation for skill items
    const burstAnimation = new mojs.Burst({
        radius: { 0: 100 },
        angle: 45,
        count: 10,
        children: {
            shape: 'line',
            stroke: '#00d4ff',
            strokeWidth: { 6: 0 },
            scale: 1,
            scaleX: { 1: 0 },
            degreeShift: 'rand(-90, 90)',
            radius: 'rand(20, 40)',
            delay: 'rand(0, 150)',
            isRunLess: true
        }
    });

    // Add click events to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', (e) => {
            burstAnimation
                .tune({ x: e.pageX, y: e.pageY })
                .replay();
        });
    });

    // Timeline marker pulse animation
    const timelinePulse = new mojs.Shape({
        shape: 'circle',
        radius: { 0: 30 },
        fill: 'transparent',
        stroke: '#00d4ff',
        strokeWidth: { 3: 0 },
        opacity: { 1: 0 },
        duration: 1000,
        easing: 'ease.out'
    });

    // Trigger pulse on timeline markers
    document.querySelectorAll('.timeline-marker').forEach(marker => {
        const rect = marker.getBoundingClientRect();
        setInterval(() => {
            timelinePulse
                .tune({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                })
                .replay();
        }, 2000);
    });
}

// ScrollMagic Controller
function initScrollMagic() {
    const controller = new ScrollMagic.Controller();

    // Timeline scene
    const timelineScene = new ScrollMagic.Scene({
        triggerElement: '.timeline',
        triggerHook: 0.8,
        duration: '80%'
    })
    .setClassToggle('.timeline', 'active')
    .addTo(controller);

    // Skills scene
    const skillsScene = new ScrollMagic.Scene({
        triggerElement: '.skills',
        triggerHook: 0.7,
        duration: '100%'
    })
    .on('enter', () => {
        document.querySelectorAll('.skill-level').forEach((level, i) => {
            setTimeout(() => {
                level.style.animation = 'skillFill 2s ease forwards';
            }, i * 100);
        });
    })
    .addTo(controller);

    // Navigation highlighting
    document.querySelectorAll('section').forEach(section => {
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.3,
            duration: section.offsetHeight
        })
        .setClassToggle(`.nav-links a[href="#${section.id}"]`, 'active')
        .addTo(controller);
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetElement,
                offsetY: 80
            },
            ease: 'power2.inOut'
        });
    });
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a small delay for staggered animations
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, delay);
        }
    });
}, observerOptions);

// Observe all scroll-triggered elements
const scrollElements = document.querySelectorAll(
    '.fade-in, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .timeline-item, .skill-category'
);

scrollElements.forEach(el => {
    scrollObserver.observe(el);
});

// Progressive reveal for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    const progressiveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Add marker animation
                    const marker = entry.target.querySelector('.timeline-marker');
                    if (marker) {
                        marker.style.animation = 'pulse 2s infinite';
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    progressiveObserver.observe(item);
});

// Skills animation with staggered delay
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Animate skill bars inside
                    const skillLevels = entry.target.querySelectorAll('.skill-level');
                    skillLevels.forEach((level, i) => {
                        setTimeout(() => {
                            level.style.animation = 'skillFill 2s ease forwards';
                        }, i * 150);
                    });
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    skillObserver.observe(category);
});

// Particle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.98) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add js-enabled class for progressive enhancement
    document.body.classList.add('js-enabled');
    
    initHeroCanvas();
    initSkillsCanvas();
    initGSAPAnimations();
    initMoAnimations();
    initScrollMagic();
    
    // Add loading animation
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
});

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Update any ongoing animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Throttle scroll events
window.addEventListener('scroll', requestTick);

// Resize handler
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});