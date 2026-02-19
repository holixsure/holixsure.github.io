// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update theme icon
  updateThemeIcon(newTheme);
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (themeToggle) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.title = `Switch to ${nextTheme} mode`;
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}

// Initialize theme based on user preference or stored value
function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
  
  // Update theme icon
  updateThemeIcon(initialTheme);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Theme toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && mobileMenuToggle && !nav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
      nav.classList.remove('active');
    }
  });
});

// Table of Contents functionality
function initTOC() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('h2, h3');
  
  if (!tocLinks.length || !sections.length) return;
  
  // Add IDs to sections if they don't have them
  sections.forEach(section => {
    if (!section.getAttribute('id')) {
      const sectionText = section.textContent.trim();
      const sectionId = sectionText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-_]/g, '');
      section.setAttribute('id', sectionId);
    }
  });
  
  // Update TOC links to match section IDs
  tocLinks.forEach((link, index) => {
    if (index < sections.length) {
      const sectionId = sections[index].getAttribute('id');
      link.setAttribute('href', '#' + sectionId);
    }
  });
  
  // Smooth scroll for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight current section on scroll
  window.addEventListener('scroll', function() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSection = '#' + section.getAttribute('id');
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  });
}

// Update theme when system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
  }
});

// Initialize TOC when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTOC();
});