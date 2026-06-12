/* ============================================
   UFC Georgia — Main JavaScript
   Handles: Navigation, Theme, Countdown, Counters,
   Carousel, Fighter Search/Modal, Forms, FAQ, Scroll
   ============================================ */

'use strict';

/* ---------- Fighter Database ---------- */
const fighters = [
  {
    id: 'merab',
    name: 'Merab Dvalishvili',
    nickname: 'The Machine',
    record: '19-4-0',
    division: 'Bantamweight Champion',
    country: 'Georgia',
    image: 'images/merab-dvalishvili.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=800&fit=crop',
    bio: 'Merab Dvalishvili is a Georgian professional mixed martial artist and the current UFC Bantamweight Champion. Born in Tbilisi, Georgia, Merab moved to the United States to pursue his wrestling career before transitioning to MMA. Known for his relentless cardio, elite wrestling, and record-breaking takedown numbers, he captured the UFC Bantamweight title in September 2024 by defeating Sean O\'Malley at UFC 306.',
    stats: { wins: 19, losses: 4, takedowns: 162 }
  },
  {
    id: 'ilia',
    name: 'Ilia Topuria',
    nickname: 'El Matador',
    record: '16-0-0',
    division: 'Featherweight Champion',
    country: 'Georgia / Spain',
    image: 'images/ilia-topuria.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1599058945522-28d584b6f5ff?w=600&h=800&fit=crop',
    bio: 'Ilia Topuria is an undefeated Georgian-Spanish professional mixed martial artist and the UFC Featherweight Champion. Born in Halle, Germany to Georgian parents, Topuria represents both Georgia and Spain. He is known for his devastating knockout power, elite grappling, and perfect 16-0 record. He became champion by knocking out Alexander Volkanovski at UFC 298 and defended his title against Max Holloway at UFC 308.',
    stats: { wins: 16, losses: 0, knockouts: 6 }
  },
  {
    id: 'giga',
    name: 'Giga Chikadze',
    nickname: 'Ninja',
    record: '14-4-0',
    division: 'Featherweight',
    country: 'Georgia',
    image: 'images/giga-chikadze.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=800&fit=crop',
    bio: 'Giga Chikadze is a Georgian kickboxer and mixed martial artist competing in the UFC Featherweight division. A former GLORY kickboxing world champion, Chikadze is known for his dynamic striking, particularly his signature "Giga Kick" — a devastating lead leg kick that has finished multiple opponents in the Octagon.',
    stats: { wins: 14, losses: 4, knockouts: 7 }
  },
  {
    id: 'roman',
    name: 'Roman Dolidze',
    nickname: 'The Caucasian',
    record: '15-3-0',
    division: 'Middleweight',
    country: 'Georgia',
    image: 'images/roman-dolidze.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop',
    bio: 'Roman Dolidze is a Georgian mixed martial artist competing in the UFC Middleweight division. A former national wrestling champion in Georgia, Dolidze brings a powerful grappling base combined with improving striking. He has earned multiple Performance of the Night bonuses with his aggressive fighting style.',
    stats: { wins: 15, losses: 3, submissions: 4 }
  }
];

/* ---------- Gallery Slides Data ---------- */
const gallerySlides = [
  {
    image: 'images/gallery-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&h=500&fit=crop',
    title: 'Merab Dvalishvili — UFC Champion',
    caption: 'Bantamweight champion Merab Dvalishvili raises the UFC belt in victory'
  },
  {
    image: 'images/gallery-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1599058945522-28d584b6f5ff?w=900&h=500&fit=crop',
    title: 'Ilia Topuria — El Matador',
    caption: 'Featherweight champion Ilia Topuria celebrates with the UFC title'
  },
  {
    image: 'images/gallery-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&h=500&fit=crop',
    title: 'Giga Chikadze — Ninja',
    caption: 'Georgian striking specialist Giga Chikadze victorious in the Octagon'
  },
  {
    image: 'images/gallery-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&h=500&fit=crop',
    title: 'Ilia Topuria in the Octagon',
    caption: 'El Matador prepares for battle inside the UFC Octagon'
  },
  {
    image: 'images/gallery-5.jpg',
    fallback: 'https://images.unsplash.com/photo-1517438476312-10d79c0771a8?w=900&h=500&fit=crop',
    title: 'Merab Dvalishvili — The Machine',
    caption: 'Merab Dvalishvili connects with the crowd after a dominant performance'
  },
  {
    image: 'images/gallery-6.jpg',
    fallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=500&fit=crop',
    title: 'Championship Glory',
    caption: 'Georgian fighters continue to make history on the global MMA stage'
  }
];

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollEffects();
  initBackToTop();
  initCountdown();
  initStatCounters();
  initFighterSearch();
  initFighterModal();
  initCarousel();
  initScrollReveal();
  initRegistrationForm();
  initContactForm();
  initFAQ();
  initImageFallbacks();
});

/* ---------- Theme Toggle (LocalStorage + Window Event) ---------- */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ufc-georgia-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ufc-georgia-theme', next);
      updateThemeIcon(next);
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'ufc-georgia-theme' && event.newValue) {
      document.documentElement.setAttribute('data-theme', event.newValue);
      updateThemeIcon(event.newValue);
    }
  });
}

function updateThemeIcon(theme) {
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/* ---------- Navigation (Mouse + Keyboard Events) ---------- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks ? navLinks.querySelectorAll('a') : [];

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Scroll Effects ---------- */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (navbar) {
      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    lastScroll = currentScroll;
  });
}

/* ---------- Back to Top (Window Scroll Event) ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ---------- Countdown Timer ---------- */
function initCountdown() {
  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minutesEl = document.getElementById('countdownMinutes');
  const secondsEl = document.getElementById('countdownSeconds');
  const eventNameEl = document.getElementById('countdownEventName');

  if (!daysEl) return;

  const nextEvent = new Date('2026-06-28T22:00:00-04:00');
  if (eventNameEl) {
    eventNameEl.textContent = 'UFC 317 — T-Mobile Arena, Las Vegas';
  }

  function updateCountdown() {
    const now = new Date();
    const diff = nextEvent - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ---------- Animated Statistics Counters ---------- */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  let animated = false;

  function animateCounters() {
    if (animated) return;

    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animated = true;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();

        function step(timestamp) {
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            counter.textContent = target + suffix;
          }
        }

        requestAnimationFrame(step);
      }
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();
}

/* ---------- Fighter Search (Input + Keyboard Events) ---------- */
function initFighterSearch() {
  const searchInput = document.getElementById('fighterSearch');
  const cards = document.querySelectorAll('.fighter-card');
  const display = document.getElementById('clickedFighterDisplay');

  if (!searchInput) return;

  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const name = card.getAttribute('data-name').toLowerCase();
      const nickname = card.getAttribute('data-nickname').toLowerCase();
      const division = card.getAttribute('data-division').toLowerCase();
      const match = name.includes(query) || nickname.includes(query) || division.includes(query);
      card.classList.toggle('hidden', !match);
    });
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const visible = document.querySelector('.fighter-card:not(.hidden)');
      if (visible) {
        visible.click();
      }
    }
  });

  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      const fighterName = card.getAttribute('data-name');
      if (display) {
        display.textContent = `You selected: ${fighterName}`;
        display.classList.add('visible');
      }
      openFighterModal(card.getAttribute('data-id'));
      event.stopPropagation();
    });

    card.addEventListener('mouseenter', (event) => {
      card.style.borderColor = 'var(--color-red)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'transparent';
    });
  });
}

/* ---------- Fighter Modal (DOM Manipulation) ---------- */
function initFighterModal() {
  const overlay = document.getElementById('fighterModal');
  const closeBtn = document.getElementById('modalClose');

  if (!overlay) return;

  closeBtn.addEventListener('click', closeFighterModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeFighterModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('active')) {
      closeFighterModal();
    }
  });
}

function openFighterModal(fighterId) {
  const fighter = fighters.find(f => f.id === fighterId);
  if (!fighter) return;

  const overlay = document.getElementById('fighterModal');
  const modalImage = document.getElementById('modalImage');
  const modalName = document.getElementById('modalName');
  const modalNickname = document.getElementById('modalNickname');
  const modalBio = document.getElementById('modalBio');
  const modalStats = document.getElementById('modalStats');

  modalImage.src = fighter.image;
  modalImage.alt = fighter.name;
  modalImage.onerror = function () { this.src = fighter.fallbackImage; };
  modalName.textContent = fighter.name;
  modalNickname.textContent = fighter.nickname + ' — ' + fighter.division;
  modalBio.textContent = fighter.bio;

  modalStats.innerHTML = '';
  Object.entries(fighter.stats).forEach(([key, value]) => {
    const statEl = document.createElement('div');
    statEl.className = 'modal-stat';
    statEl.innerHTML = `<span class="value">${value}</span><span class="label">${key}</span>`;
    modalStats.appendChild(statEl);
  });

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFighterModal() {
  const overlay = document.getElementById('fighterModal');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ---------- Image Carousel (Mouse Events) ---------- */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  const thumbsContainer = document.getElementById('galleryThumbs');

  if (!track) return;

  let currentIndex = 0;
  let autoplayInterval;
  const totalSlides = gallerySlides.length;

  gallerySlides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = 'carousel-slide';
    slideEl.innerHTML = `
      <img src="${slide.image}" alt="${slide.title}" data-fallback="${slide.fallback}"
           onerror="this.src=this.dataset.fallback">
      <div class="carousel-caption">
        <h4>${slide.title}</h4>
        <p>${slide.caption}</p>
      </div>`;
    track.appendChild(slideEl);

    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    }

    if (thumbsContainer) {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
      thumb.innerHTML = `<img src="${slide.image}" alt="${slide.title}" data-fallback="${slide.fallback}"
                              onerror="this.src=this.dataset.fallback">`;
      thumb.addEventListener('click', () => goToSlide(index));
      thumbsContainer.appendChild(thumb);
    }
  });

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  document.addEventListener('keydown', (event) => {
    if (!track.closest('.gallery-section')) return;
    if (event.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (event.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }

  startAutoplay();

  let touchStartX = 0;
  track.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    const diff = touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  }, { passive: true });
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ---------- Registration Form Validation ---------- */
function initRegistrationForm() {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  const fields = {
    firstName: { required: true, minLength: 2, pattern: /^[A-Za-z\u10A0-\u10FF\s'-]+$/ },
    lastName: { required: true, minLength: 2, pattern: /^[A-Za-z\u10A0-\u10FF\s'-]+$/ },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { required: true, pattern: /^\+?[\d\s\-()]{8,20}$/ },
    birthDate: { required: true, custom: validateAge },
    password: { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ },
    confirmPassword: { required: true, match: 'password' },
    favoriteFighter: { required: true }
  };

  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  Object.keys(fields).forEach(fieldName => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!input) return;

    input.addEventListener('input', (event) => {
      validateField(fieldName, event.target);
      updateProgress();
    });

    input.addEventListener('blur', (event) => {
      validateField(fieldName, event.target);
      updateProgress();
    });

    input.addEventListener('focus', (event) => {
      event.target.parentElement.classList.add('focused');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input && !validateField(fieldName, input)) {
        isValid = false;
      }
    });

    if (isValid) {
      showNotification('Registration successful! Welcome to UFC Georgia.');
      form.reset();
      updateProgress();
      document.querySelectorAll('.validation-message').forEach(msg => {
        msg.textContent = '';
        msg.className = 'validation-message';
      });
      document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
    }
  });

  function validateField(name, input) {
    const rules = fields[name];
    const messageEl = input.parentElement.querySelector('.validation-message');
    let error = '';

    const value = input.value.trim();

    if (rules.required && !value) {
      error = 'This field is required';
    } else if (value && rules.minLength && value.length < rules.minLength) {
      error = `Minimum ${rules.minLength} characters required`;
    } else if (value && rules.pattern && !rules.pattern.test(value)) {
      if (name === 'email') error = 'Please enter a valid email address';
      else if (name === 'phone') error = 'Please enter a valid phone number';
      else if (name === 'password') error = 'Must include uppercase, lowercase, and a number';
      else error = 'Invalid format';
    } else if (rules.match) {
      const matchInput = form.querySelector(`[name="${rules.match}"]`);
      if (value !== matchInput.value) {
        error = 'Passwords do not match';
      }
    } else if (rules.custom) {
      error = rules.custom(value);
    }

    input.classList.toggle('valid', !error && value);
    input.classList.toggle('invalid', !!error);

    if (messageEl) {
      messageEl.textContent = error || (value ? 'Looks good!' : '');
      messageEl.className = 'validation-message ' + (error ? 'error' : value ? 'success' : '');
    }

    return !error;
  }

  function validateAge(value) {
    if (!value) return 'This field is required';
    const birth = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 18) return 'You must be at least 18 years old';
    if (age > 120) return 'Please enter a valid birth date';
    return '';
  }

  function updateProgress() {
    const total = Object.keys(fields).length;
    let filled = 0;

    Object.keys(fields).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input && input.value.trim() && validateField(fieldName, input)) {
        filled++;
      }
    });

    const percent = Math.round((filled / total) * 100);
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressText) progressText.textContent = percent + '% Complete';
  }
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('[name="contactName"]');
    const email = form.querySelector('[name="contactEmail"]');
    const subject = form.querySelector('[name="contactSubject"]');
    const message = form.querySelector('[name="contactMessage"]');
    let valid = true;

    [name, email, subject, message].forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('invalid');
        valid = false;
      } else {
        field.classList.remove('invalid');
        field.classList.add('valid');
      }
    });

    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('invalid');
      valid = false;
    }

    if (valid) {
      showNotification('Message sent! We will respond within 24 hours.');
      form.reset();
      [name, email, subject, message].forEach(f => f.classList.remove('valid', 'invalid'));
    }
  });
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', (event) => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }

      event.currentTarget.setAttribute('aria-expanded', !isActive);
    });

    question.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        question.click();
      }
    });
  });
}

/* ---------- Notification System ---------- */
function showNotification(message) {
  let notification = document.querySelector('.notification');

  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
}

/* ---------- Image Fallback Handler ---------- */
function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function handler() {
      if (this.dataset.fallback && this.src !== this.dataset.fallback) {
        this.src = this.dataset.fallback;
      }
      this.removeEventListener('error', handler);
    });
  });
}

/* ---------- Window Resize Handler ---------- */
window.addEventListener('resize', () => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  if (window.innerWidth > 768 && navLinks) {
    navLinks.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
  }
});

/* ---------- Page Visibility API ---------- */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = 'Come back — UFC Georgia awaits!';
  } else {
    document.title = document.querySelector('title')?.getAttribute('data-original') ||
      'UFC Georgia — Official Fan Community';
  }
});

const pageTitle = document.querySelector('title');
if (pageTitle && !pageTitle.getAttribute('data-original')) {
  pageTitle.setAttribute('data-original', pageTitle.textContent);
}
