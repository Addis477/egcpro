/* ============================================
   EGC GLOBAL - MAIN JAVASCRIPT
   Handles navigation, mobile menu, animations
   ============================================ */

// ========== MOBILE SIDE SLIDE NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS animations if available
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

  // Mobile navigation elements
  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');
  const closeNavBtn = document.getElementById('closeNavBtn');

  function openNav() {
    if (sideNav) {
      sideNav.classList.add('open');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNav() {
    if (sideNav) {
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

  // Close side nav when clicking on links
  const sideLinks = document.querySelectorAll('.side-nav a');
  sideLinks.forEach(link => {
    link.addEventListener('click', closeNav);
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
    }
  });
});

// ========== UTILITY FUNCTIONS ==========
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${message}`;
  
  const container = document.querySelector('.container');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      alertDiv.remove();
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
