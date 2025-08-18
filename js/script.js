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