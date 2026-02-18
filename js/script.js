document.addEventListener('DOMContentLoaded', function() {
  // Circular Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navItems = document.querySelector('.nav-items');
  
  navToggle.addEventListener('click', function() {
    navItems.classList.toggle('active');
    this.querySelector('.hamburger').classList.toggle('active');
  });
  
  // Typewriter Effect
  const typewriterElements = document.querySelectorAll('.typewriter h2');
  let currentIndex = 0;
  
  function showNextText() {
    // Hide all texts
    typewriterElements.forEach(el => el.classList.remove('active'));
    
    // Show current text
    typewriterElements[currentIndex].classList.add('active');
    
    // Move to next text or loop back
    currentIndex = (currentIndex + 1) % typewriterElements.length;
  }
  
  // Initial call and set interval
  showNextText();
  setInterval(showNextText, 3000);
  
  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navItems.classList.remove('active');
      }
    });
  });
  
  // Projects Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Animate Skill Bars on Scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('skills')) {
          animateSkillBars();
        }
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observe sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Form Submission
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', formValues);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      this.reset();
    });
  }
  
  // Scroll Indicator Animation
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    
    const indicatorDots = document.querySelectorAll('.scroll-indicator span');
    
    indicatorDots.forEach((dot, index) => {
      if (scrollPercentage > (index * 30)) {
        dot.style.opacity = '1';
      } else {
        dot.style.opacity = '0.3';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Mark body as loaded for fade-in effect
  document.body.classList.add('loaded');
  
  // Enhanced Typewriter Effect
  const typewriterElements = document.querySelectorAll('.typing-text');
  const cursor = document.querySelector('.typing-cursor');
  let currentIndex = 0;
  let isDeleting = false;
  let text = '';
  let typingSpeed = 100;
  let deleteSpeed = 50;
  let pauseTime = 2000;
  
  function typeWriter() {
    const currentText = typewriterElements[currentIndex].textContent;
    
    if (isDeleting) {
      // Remove characters
      text = currentText.substring(0, text.length - 1);
    } else {
      // Add characters
      text = currentText.substring(0, text.length + 1);
    }
    
    typewriterElements[currentIndex].textContent = text;
    typewriterElements[currentIndex].style.width = text.length + 'ch';
    
    // Determine typing speed
    let typeDelay = isDeleting ? deleteSpeed : typingSpeed;
    
    // If word is complete
    if (!isDeleting && text === currentText) {
      typeDelay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && text === '') {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % typewriterElements.length;
      typeDelay = 500;
    }
    
    setTimeout(typeWriter, typeDelay);
  }
  
  // Start the typewriter effect
  setTimeout(typeWriter, 1000);
  
  // Scroll animations for sections
  function checkScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
      const position = section.getBoundingClientRect().top;
      
      if (position < windowHeight * 0.85) {
        section.classList.add('visible');
      }
    });
  }
  
  // Initial check and scroll event listener
  checkScroll();
  window.addEventListener('scroll', checkScroll);
  
  // Enhanced hover animations
  const hoverElements = document.querySelectorAll('.project-card, .experience-item, .social-links a, .btn');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    hero.style.backgroundPosition = `0px ${rate}px`;
  });
  
  // Animate elements when they come into view
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all elements with the animate-on-scroll class
  document.querySelectorAll('.project-card, .experience-item, .skill-item').forEach(item => {
    animateOnScroll.observe(item);
  });
  
  // ... rest of your existing JavaScript code
});
(function () {
  "use strict";

  /* ── inject styles ─────────────────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
    /* Hide default cursor site-wide */
    *, *::before, *::after { cursor: none !important; }

    /* ── Outer ring ───────────────────────────────────────── */
    #cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 40px; height: 40px;
      border: 1.5px solid rgba(99, 102, 241, 0.65);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition:
        width  0.35s cubic-bezier(0.23, 1, 0.32, 1),
        height 0.35s cubic-bezier(0.23, 1, 0.32, 1),
        border-color 0.3s,
        opacity 0.3s,
        background 0.3s;
      will-change: transform;
    }

    /* ── Inner dot ────────────────────────────────────────── */
    #cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background: linear-gradient(135deg, #6366f1, #ec4899);
      border-radius: 50%;
      pointer-events: none;
      z-index: 100000;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s, width 0.2s, height 0.2s, background 0.3s;
      will-change: transform;
    }

    /* ── Hover states ─────────────────────────────────────── */
    body.cursor-hover #cursor-ring {
      width: 60px; height: 60px;
      border-color: rgba(236, 72, 153, 0.6);
      background: rgba(99, 102, 241, 0.07);
    }
    body.cursor-hover #cursor-dot {
      width: 4px; height: 4px;
      background: #ec4899;
    }

    body.cursor-click #cursor-ring {
      width: 28px; height: 28px;
      border-color: rgba(236, 72, 153, 0.9);
      background: rgba(236, 72, 153, 0.12);
    }

    /* ── Glow particle ────────────────────────────────────── */
    .cursor-particle {
      position: fixed;
      top: 0; left: 0;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
      animation: particle-fade var(--dur, 0.7s) ease-out forwards;
    }

    @keyframes particle-fade {
      0%   { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0;   transform: translate(-50%, -50%) scale(0); }
    }

    /* ── Magnetic ripple on click ─────────────────────────── */
    .cursor-ripple {
      position: fixed;
      top: 0; left: 0;
      width: 10px; height: 10px;
      border: 1.5px solid rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99997;
      transform: translate(-50%, -50%);
      animation: ripple-out 0.55s ease-out forwards;
    }

    @keyframes ripple-out {
      0%   { width: 10px;  height: 10px;  opacity: 0.8; }
      100% { width: 80px;  height: 80px;  opacity: 0; }
    }

    /* ── Background aurora blob that follows cursor slowly ── */
    #cursor-aurora {
      position: fixed;
      width: 420px; height: 420px;
      border-radius: 50%;
      background: radial-gradient(circle,
        rgba(126, 109, 168, 0.75) 0%,
        rgba(4, 18, 51, 0.29) 40%,
        transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      filter: blur(40px);
      transition: opacity 0.5s;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  /* ── DOM elements ──────────────────────────────────────── */
  const ring   = document.createElement("div"); ring.id   = "cursor-ring";
  const dot    = document.createElement("div"); dot.id    = "cursor-dot";
  const aurora = document.createElement("div"); aurora.id = "cursor-aurora";
  document.body.append(aurora, ring, dot);

  /* ── State ─────────────────────────────────────────────── */
  let mx = -200, my = -200;   // raw mouse
  let rx = -200, ry = -200;   // ring (lerped)
  let ax = -200, ay = -200;   // aurora (slower lerp)
  let raf;

  // Particle throttle
  const PARTICLE_COLORS = [
    "rgba(99,102,241,",
    "rgba(139,92,246,",
    "rgba(236,72,153,",
    "rgba(99,102,241,",
  ];
  let lastParticleTime = 0;
  const PARTICLE_INTERVAL = 40; // ms between particles

  /* ── Mouse move ─────────────────────────────────────────── */
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;

    // Move dot immediately
    dot.style.left = mx + "px";
    dot.style.top  = my + "px";

    // Spawn trail particle
    const now = performance.now();
    if (now - lastParticleTime > PARTICLE_INTERVAL) {
      spawnParticle(mx, my);
      lastParticleTime = now;
    }
  });

  /* ── Hover detection ────────────────────────────────────── */
  const hoverTargets = "a, button, .btn, .project-card, .myproject-card, .creative-card, .certificate-card, .social-links a, .filter-btn, input, textarea, .experience-item";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.add("cursor-hover");
  });
  document.addEventListener("mouseout",  (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove("cursor-hover");
  });

  /* ── Click ──────────────────────────────────────────────── */
  document.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-click");
    spawnRipple(mx, my);
  });
  document.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-click");
  });

  /* ── Particle spawner ───────────────────────────────────── */
  function spawnParticle(x, y) {
    const p   = document.createElement("div");
    const size = 3 + Math.random() * 5;
    const dur  = 0.45 + Math.random() * 0.45;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const alpha = (0.35 + Math.random() * 0.45).toFixed(2);

    p.className = "cursor-particle";
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color}${alpha});
      left:${x + (Math.random() - 0.5) * 14}px;
      top:${y + (Math.random() - 0.5) * 14}px;
      --dur:${dur}s;
      box-shadow: 0 0 ${size * 2}px ${color}0.4);
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 50);
  }

  /* ── Ripple spawner ─────────────────────────────────────── */
  function spawnRipple(x, y) {
    const r = document.createElement("div");
    r.className = "cursor-ripple";
    r.style.left = x + "px";
    r.style.top  = y + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }

  /* ── Animation loop ─────────────────────────────────────── */
  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    // Ring follows with smooth lag
    rx = lerp(rx, mx, 0.14);
    ry = lerp(ry, my, 0.14);
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";

    // Aurora follows very slowly
    ax = lerp(ax, mx, 0.04);
    ay = lerp(ay, my, 0.04);
    aurora.style.left = ax + "px";
    aurora.style.top  = ay + "px";

    raf = requestAnimationFrame(loop);
  }
  loop();

  /* ── Hide / show when cursor leaves window ──────────────── */
  document.addEventListener("mouseleave", () => {
    ring.style.opacity = "1";
    dot.style.opacity  = "1";
    aurora.style.opacity = "1";
  });
  document.addEventListener("mouseenter", () => {
    ring.style.opacity = "1";
    dot.style.opacity  = "1";
    aurora.style.opacity = "1";
  });

})();