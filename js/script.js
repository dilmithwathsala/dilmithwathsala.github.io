document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    let theme = 'day';

    try {
      theme = window.localStorage.getItem('portfolio-theme') === 'night' ? 'night' : 'day';
    } catch (error) {
      console.warn('Unable to read the saved theme preference.', error);
    }

    function applyTheme(nextTheme) {
      theme = nextTheme;
      document.documentElement.dataset.theme = theme;
      themeToggle.setAttribute('aria-pressed', String(theme === 'night'));
      themeToggle.setAttribute(
        'aria-label',
        theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'
      );

      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-moon', theme === 'day');
        icon.classList.toggle('fa-sun', theme === 'night');
      }
    }

    applyTheme(theme);

    themeToggle.addEventListener('click', function () {
      applyTheme(theme === 'day' ? 'night' : 'day');

      try {
        window.localStorage.setItem('portfolio-theme', theme);
      } catch (error) {
        console.warn('Unable to save the theme preference.', error);
      }
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('active');
      this.classList.toggle('active', isOpen);
      this.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealItems = document.querySelectorAll(
    '.hero-container, .hero-content, .hero-visual, .section-header, .about-content, .experience-item, .certificate-card, .myproject-card, .creative-card, .project-card, .music-card, .music-more, .contact-container, .contact-item, .detail-item, .info-item, .metric-item'
  );

  revealItems.forEach(function (item) {
    item.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
});