/* ============================================
   EGC GLOBAL - MAIN JAVASCRIPT v2.0
   Handles navigation, mobile menu, animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== INITIALIZE AOS ANIMATIONS ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-in-out'
    });
  }

  // ========== MOBILE SIDE SLIDE NAVIGATION ==========
  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');
  const closeNavBtn = document.getElementById('closeNavBtn');

  function openNav() {
    if (sideNav && navOverlay) {
      sideNav.classList.add('open');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNav() {
    if (sideNav && navOverlay) {
      sideNav.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openNav);
  }
  
  if (closeNavBtn) {
    closeNavBtn.addEventListener('click', closeNav);
  }
  
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close side nav when clicking on links (mobile only)
  const sideLinks = document.querySelectorAll('.side-nav a');
  sideLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't close if it's an external link or hash link that needs to navigate
      const href = this.getAttribute('href');
      if (href && !href.startsWith('http') && href !== '#') {
        closeNav();
      } else if (href === '#') {
        e.preventDefault();
        closeNav();
      } else {
        closeNav();
      }
    });
  });

  // ========== ACTIVE PAGE HIGHLIGHT ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.side-nav a, .desktop-nav a');
  
  allNavLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && linkHref === 'index.html') {
      link.classList.add('active');
    } else if (currentPage === '' && linkHref === 'index.html') {
      link.classList.add('active');
    }
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== COUNTER ANIMATION ==========
  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  // Intersection Observer for counters
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          if (!isNaN(target)) {
            animateCounter(counter, target);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe counter sections
  const counterSections = document.querySelectorAll('.stats-section, .counter-container');
  counterSections.forEach(section => {
    observer.observe(section);
  });

  // ========== LAZY LOAD IMAGES ==========
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ========== STICKY HEADER EFFECT ==========
  const header = document.querySelector('.top-bar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(10, 12, 15, 0.95)';
      header.style.backdropFilter = 'blur(16px)';
    } else {
      header.style.background = 'rgba(10, 12, 15, 0.85)';
      header.style.backdropFilter = 'blur(12px)';
    }
    
    lastScroll = currentScroll;
  });

  // ========== BACK TO TOP BUTTON ==========
  const createBackToTopButton = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.id = 'backToTop';
    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: #000;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      z-index: 98;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });
  };
  
  createBackToTopButton();

  // ========== PRELOADER (Optional) ==========
  const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  };
  
  window.addEventListener('load', hidePreloader);
});

// ========== UTILITY FUNCTIONS ==========
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  const container = document.querySelector('.container');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      alertDiv.style.opacity = '0';
      setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
  }
}

// Save to localStorage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get from localStorage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
  return re.test(phone) || phone.length >= 9;
}
