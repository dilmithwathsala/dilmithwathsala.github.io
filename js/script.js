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