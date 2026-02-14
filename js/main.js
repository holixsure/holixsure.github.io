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

// Update theme when system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
  }
});