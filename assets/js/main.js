/**
 * CHECKMATE – Premium Chess Academy & Coaching Center
 * Main JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initRTL();
  initHeader();
  initMobileNav();
  initCounters();
  initTiltCards();
  initParallaxHero();
  initCountdowns();
  initGalleryFilter();
  initGalleryLightbox();
  initPricingToggle();
  initVideoModal();
  initAccordions();
  initNewsletter();
  initAuthNav();
  initPhoneInputs();
});

/* ------------------------------------------------------------
   1. Preloader
   ------------------------------------------------------------ */
function initPreloader() {
  const preloader = document.getElementById('site-preloader');
  if (!preloader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 450);
  });

  // Fallback in case load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => preloader.classList.add('loaded'), 450);
  }
}

/* ------------------------------------------------------------
   2. Theme Switcher (Dark / Light) with Persistence
   ------------------------------------------------------------ */
function initTheme() {
  const savedTheme = localStorage.getItem('checkmate-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('checkmate-theme', newTheme);
      updateThemeIcons(newTheme);
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-icon-slot');
  icons.forEach(slot => {
    if (theme === 'light') {
      slot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    } else {
      slot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    }
  });
}

/* ------------------------------------------------------------
   3. RTL Toggle with Persistence & Synced Labels
   ------------------------------------------------------------ */
function initRTL() {
  const savedDir = localStorage.getItem('checkmate-dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);

  const updateRTLButtons = (dir) => {
    const isRtl = dir === 'rtl';
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn, .admin-rtl-toggle');
    rtlToggles.forEach(btn => {
      let label = btn.querySelector('.rtl-label');
      if (!label) {
        label = document.createElement('span');
        label.className = 'rtl-label';
        btn.appendChild(label);
      }
      label.textContent = isRtl ? 'LTR' : 'RTL';
      const actionText = isRtl ? 'Switch to LTR' : 'Switch to RTL';
      btn.setAttribute('title', actionText);
      btn.setAttribute('aria-label', actionText);
    });
  };

  updateRTLButtons(savedDir);

  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn, .admin-rtl-toggle');
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('checkmate-dir', newDir);
      updateRTLButtons(newDir);
      window.dispatchEvent(new CustomEvent('dirChanged', { detail: { dir: newDir } }));
    });
  });
}

/* ------------------------------------------------------------
   4. Sticky Header
   ------------------------------------------------------------ */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------
   5. Mobile Navigation
   ------------------------------------------------------------ */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const panel = document.querySelector('.mobile-nav-panel');
  if (!toggleBtn || !panel) return;

  const toggle = (state) => {
    const isOpen = state !== undefined ? state : !toggleBtn.classList.contains('open');
    toggleBtn.classList.toggle('open', isOpen);
    panel.classList.toggle('active', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggle());
  if (overlay) overlay.addEventListener('click', () => toggle(false));

  const mobileLinks = document.querySelectorAll('.mobile-nav-list > li > a.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Mobile submenu toggles
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle, .mobile-dropdown-header');
  submenuToggles.forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && !e.target.classList.contains('mobile-submenu-toggle')) return;
      const item = el.closest('.mobile-dropdown-item');
      if (item) item.classList.toggle('open');
    });
  });

  const sublinks = document.querySelectorAll('.mobile-submenu-link');
  sublinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });
}

/* ------------------------------------------------------------
   6. Custom Cursor (Disabled)
   ------------------------------------------------------------ */
function initCustomCursor() {
  // Disabled as requested: default system cursor is used
}

/* ------------------------------------------------------------
   7. Animated Counters
   ------------------------------------------------------------ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const duration = 1800;
        const start = 0;
        const startTime = performance.now();

        const updateCount = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOutQuad = 1 - (1 - progress) * (1 - progress);
          const current = Math.floor(easeOutQuad * target);
          el.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

/* ------------------------------------------------------------
   8. 3D Tilt Cards
   ------------------------------------------------------------ */
function initTiltCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('.feature-card, .program-card, .coach-card, .pricing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ------------------------------------------------------------
   9. Mouse Parallax for Hero
   ------------------------------------------------------------ */
function initParallaxHero() {
  const hero = document.querySelector('.hero-home-1');
  const heroImg = document.querySelector('.hero-bg-img');
  const floatingCards = document.querySelectorAll('.hero-stat-card');
  if (!hero || !heroImg) return;

  hero.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

    heroImg.style.transform = `scale(1.03) translate(${xRatio * -8}px, ${yRatio * -8}px)`;

    floatingCards.forEach((card, idx) => {
      const factor = (idx + 1) * 3;
      card.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    heroImg.style.transform = 'scale(1.02)';
    floatingCards.forEach(card => card.style.transform = '');
  });
}

/* ------------------------------------------------------------
   10. Tournament Countdown
   ------------------------------------------------------------ */
function initCountdowns() {
  const countdownWrappers = document.querySelectorAll('[data-countdown]');
  if (!countdownWrappers.length) return;

  countdownWrappers.forEach(wrap => {
    const targetDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 7 * 3600 * 1000); // 14 days out

    const update = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const daysEl = wrap.querySelector('.count-days');
      const hoursEl = wrap.querySelector('.count-hours');
      const minsEl = wrap.querySelector('.count-mins');
      const secsEl = wrap.querySelector('.count-secs');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  });
}

/* ------------------------------------------------------------
   11. Gallery Filter Logic
   ------------------------------------------------------------ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue) {
          item.style.display = '';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ------------------------------------------------------------
   12. Gallery Lightbox Modal
   ------------------------------------------------------------ */
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const items = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImg) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
}

/* ------------------------------------------------------------
   13. Pricing Toggle (Monthly / Yearly)
   ------------------------------------------------------------ */
function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle-wrap .toggle-switch');
  const monthlyLabel = document.querySelector('.toggle-label.monthly');
  const yearlyLabel = document.querySelector('.toggle-label.yearly');
  const priceElements = document.querySelectorAll('.price-amount[data-monthly]');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isYearly = toggle.classList.toggle('yearly');
    if (monthlyLabel && yearlyLabel) {
      monthlyLabel.classList.toggle('active', !isYearly);
      yearlyLabel.classList.toggle('active', isYearly);
    }

    priceElements.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const yearly = el.getAttribute('data-yearly');
      el.textContent = isYearly ? yearly : monthly;
    });

    const periodLabels = document.querySelectorAll('.price-period');
    periodLabels.forEach(p => {
      p.textContent = isYearly ? '/ month (billed yearly)' : '/ month';
    });
  });
}

/* ------------------------------------------------------------
   14. Video Modal
   ------------------------------------------------------------ */
function initVideoModal() {
  const triggers = document.querySelectorAll('[data-video-modal]');
  const modal = document.getElementById('video-modal');
  if (!triggers.length || !modal) return;

  const iframe = modal.querySelector('iframe');
  const closeBtn = modal.querySelector('.modal-close');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const videoSrc = btn.getAttribute('data-video-modal') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      if (iframe) iframe.src = videoSrc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ------------------------------------------------------------
   15. Accordions
   ------------------------------------------------------------ */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-header, .about-faq-question');
  items.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item') || header.closest('.about-faq-item');
      if (!parent) return;
      
      const isOpen = parent.classList.contains('active') || parent.classList.contains('open');
      
      // Close peers if in same container
      const container = parent.closest('.accordion-group') || parent.closest('.about-faq-list');
      if (container) {
        container.querySelectorAll('.accordion-item, .about-faq-item').forEach(i => {
          i.classList.remove('active');
          i.classList.remove('open');
        });
      }

      if (parent.classList.contains('about-faq-item')) {
        parent.classList.toggle('open', !isOpen);
      } else {
        parent.classList.toggle('active', !isOpen);
      }
    });
  });
}

/* Toast Generator Helper */
let lastToastMsg = '';
let lastToastTime = 0;

window.showCheckmateToast = function(msg, type = 'success') {
  const now = Date.now();
  // Prevent duplicate toasts within 1500ms
  if (msg === lastToastMsg && (now - lastToastTime) < 1500) {
    return;
  }
  lastToastMsg = msg;
  lastToastTime = now;

  let toastContainer = document.getElementById('checkmate-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'checkmate-toast-container';
    toastContainer.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #0f1523;
    color: #fff;
    border: 1px solid ${type === 'success' ? '#d4af37' : '#ef4444'};
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: auto;
    animation: toastSlideIn 0.3s ease forwards;
  `;

  toast.innerHTML = `<span>${msg}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

/* Newsletter Form Handler (clears email input & shows toast exactly once) */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.onsubmit = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const input = form.querySelector('input[type="email"], .newsletter-input');
      if (input) input.value = '';
      form.reset();
      window.showCheckmateToast('Subscribed to academy newsletter!', 'success');
      return false;
    };
  });
}

/* ------------------------------------------------------------
   16. Authentication State in Navbar (Across All Pages)
   ------------------------------------------------------------ */
function initAuthNav() {
  const userJson = localStorage.getItem('checkmate_user');
  if (!userJson) return;

  let user;
  try {
    user = JSON.parse(userJson);
  } catch (e) {
    return;
  }
  if (!user || !user.name) return;

  const role = (user.role || 'student').toLowerCase();
  const rawName = user.name.trim();
  const firstName = rawName.split(' ')[0];

  const path = window.location.pathname.replace(/\\/g, '/');
  const isInSubdir = path.includes('/admin/') || path.includes('/student/') || path.includes('/documentation/');
  const rootPrefix = isInSubdir ? '../' : '';
  const dashboardUrl = role === 'admin' ? `${rootPrefix}admin/index.html` : `${rootPrefix}student/index.html`;

  // Update Desktop Navbar Actions
  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    const loginBtn = navActions.querySelector('.btn-login');
    const joinBtn = navActions.querySelector('.btn-join');

    if (loginBtn && joinBtn) {
      const userPill = document.createElement('div');
      userPill.className = 'nav-user-info';
      userPill.innerHTML = `
        <span class="nav-user-hi">HI, <strong>${firstName.toUpperCase()}</strong></span>
        <span class="nav-user-badge role-${role}">${role.toUpperCase()}</span>
      `;

      const dashBtn = document.createElement('a');
      dashBtn.href = dashboardUrl;
      dashBtn.className = 'btn-nav-dashboard';
      dashBtn.innerHTML = `<i data-lucide="layout-dashboard" style="width: 15px;"></i> DASHBOARD`;

      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'tool-btn btn-nav-logout';
      logoutBtn.title = 'Logout';
      logoutBtn.setAttribute('aria-label', 'Logout');
      logoutBtn.innerHTML = `<i data-lucide="log-out" style="width: 15px;"></i>`;
      logoutBtn.onclick = (e) => {
        e.preventDefault();
        window.checkmateLogout();
      };

      loginBtn.replaceWith(userPill);
      joinBtn.replaceWith(dashBtn);
      dashBtn.insertAdjacentElement('afterend', logoutBtn);
    }
  }

  // Update Mobile Navigation Actions
  const mobileNavActions = document.querySelector('.mobile-nav-actions');
  if (mobileNavActions) {
    mobileNavActions.innerHTML = `
      <div style="text-align: center; margin-bottom: 0.85rem; padding: 0.75rem; background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md);">
        <div style="font-size: 0.72rem; color: var(--gold-light); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">ACTIVE SESSION (${role.toUpperCase()})</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-top: 0.2rem;">HI, ${rawName.toUpperCase()}</div>
      </div>
      <a href="${dashboardUrl}" class="btn-nav-dashboard" style="width: 100%; justify-content: center; margin-bottom: 0.65rem; padding: 0.75rem;"><i data-lucide="layout-dashboard" style="width: 16px;"></i> OPEN ${role.toUpperCase()} DASHBOARD</a>
      <button onclick="window.checkmateLogout()" class="btn-login" style="width: 100%; justify-content: center; gap: 0.5rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);"><i data-lucide="log-out" style="width: 15px;"></i> LOGOUT</button>
    `;
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

window.checkmateLogout = function() {
  localStorage.removeItem('checkmate_user');
  if (window.showCheckmateToast) {
    window.showCheckmateToast('Logged out successfully', 'success');
  }
  setTimeout(() => {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/student/') || path.includes('/admin/')) {
      window.location.href = '../index.html';
    } else {
      window.location.reload();
    }
  }, 400);
};

window.checkmateLogin = function(userData, redirect = true) {
  if (!userData) return;
  localStorage.setItem('checkmate_user', JSON.stringify(userData));
  if (redirect) {
    const role = (userData.role || 'student').toLowerCase();
    const dest = role === 'admin' ? 'admin/index.html' : 'student/index.html';
    window.location.href = dest;
  }
};

/* ------------------------------------------------------------
   Phone Number Input Restriction (Numbers only, no alphabets)
   ------------------------------------------------------------ */
function initPhoneInputs() {
  const sanitizePhone = (val) => {
    if (!val) return '';
    // Disallow alphabetic letters and any disallowed symbols
    let clean = val.replace(/[^0-9+\s\-()]/g, '');
    // Ensure '+' can only appear once at the very start
    if (clean.includes('+')) {
      const startsWithPlus = clean.trim().startsWith('+');
      clean = clean.replace(/\+/g, '');
      if (startsWithPlus) {
        clean = '+' + clean;
      }
    }
    return clean;
  };

  const bindPhone = (input) => {
    if (input.dataset.phoneRestricted) return;
    input.dataset.phoneRestricted = 'true';

    // Prevent typing of any alphabet or illegal character in real time
    input.addEventListener('keydown', (e) => {
      // Navigation / control keys
      if ([
        'Backspace', 'Delete', 'Tab', 'Enter', 'Escape',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ].includes(e.key)) {
        return;
      }

      // Keyboard shortcuts (Ctrl/Cmd + A, C, V, X, Z)
      if (e.ctrlKey || e.metaKey) return;

      // Allow '+' only at index 0 and if not already present
      if (e.key === '+') {
        if (!input.value.includes('+') && input.selectionStart === 0) {
          return;
        }
        e.preventDefault();
        return;
      }

      // Allow digits and standard phone separators
      if (/^[0-9\s\-()]$/.test(e.key)) {
        return;
      }

      // Block all letters and unsupported symbols
      e.preventDefault();
    });

    // Real-time cleanup on input (paste, autofill, virtual keyboard, IME)
    input.addEventListener('input', (e) => {
      const original = e.target.value;
      const clean = sanitizePhone(original);
      if (original !== clean) {
        e.target.value = clean;
      }
    });

    // Final scrub on blur
    input.addEventListener('blur', (e) => {
      e.target.value = sanitizePhone(e.target.value).trim();
    });
  };

  document.querySelectorAll('input[type="tel"], #reg-phone, #contact-phone').forEach(bindPhone);
}

// Fallback execution if script runs after DOM is ready
if (document.readyState !== 'loading') {
  initPhoneInputs();
}
