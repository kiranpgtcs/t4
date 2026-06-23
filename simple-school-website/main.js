/* ==========================================================================
   APEX INTERNATIONAL SCHOOL - INTERACTIVE JS LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initAnimatedStats();
  initAcademicsTabs();
  initFormValidation();
});

/**
 * 1. Header Scroll Effect
 * Toggles a class on the header when the user scrolls down.
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load in case page is refreshed while scrolled
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * 2. Mobile Menu Toggle
 * Opens and closes the mobile nav menu when the burger menu is clicked.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // Animate the burger menu bars into an 'X'
    const spans = menuToggle.querySelectorAll('span');
    if (mainNav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking links
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/**
 * 3. Animated Stats Counters
 * Uses IntersectionObserver to animate counts up when stats are visible.
 */
function initAnimatedStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const countUp = (element) => {
    const target = +element.getAttribute('data-target');
    const suffix = element.getAttribute('data-suffix') || '';
    const speed = 200; // Alter duration speed
    const step = target / speed;
    let current = 0;

    const updateCount = () => {
      current += step;
      if (current < target) {
        element.innerText = Math.floor(current) + suffix;
        setTimeout(updateCount, 1);
      } else {
        element.innerText = target + suffix;
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * 4. Academics Tabs Switcher
 * Handles switching between primary, middle, and high school academic programs.
 */
function initAcademicsTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanel = btn.getAttribute('data-tab');

      // Deactivate all buttons and panels
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Activate clicked button and panel
      btn.classList.add('active');
      const panel = document.getElementById(targetPanel);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });
}

/**
 * 5. Interactive Form Validations and Submissions
 * Captures submissions and offers pretty validation feedback.
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.interactive-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('[required]');
      
      inputs.forEach(input => {
        // Clear previous custom error borders
        input.style.borderColor = '';
        
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#EF4444'; // Red outline
        }
      });
      
      if (!isValid) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Simulate successful submit feedback
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry...';
      
      setTimeout(() => {
        submitBtn.innerHTML = '✓ Submitted Successfully!';
        submitBtn.style.backgroundColor = '#10B981'; // Green
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          alert('Thank you! Your inquiry has been logged. An admissions counselor will connect with you soon.');
        }, 2000);
      }, 1500);
    });
  });
}
