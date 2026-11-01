/* ==========================================================================
   PORTFÓLIO CÉSAR ASSUNÇÃO DA SILVA JR — SCRIPT.JS
   Interações, Animações, Meteoros e Funcionalidades
   ========================================================================== */

(function () {
  'use strict';

  // ================================================================
  // UTILITY HELPERS
  // ================================================================
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ================================================================
  // 1. HEADER — Scroll state & active nav link
  // ================================================================
  const header = $('#header');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let currentId = '';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  // Throttled scroll handler
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateHeader();
        updateActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ================================================================
  // 2. MOBILE MENU
  // ================================================================
  const mobileToggle = $('#mobileToggle');
  const mobileNav = $('#mobileNav');
  const mobileLinks = $$('.mobile-nav-link');

  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileNav.removeAttribute('hidden');
    // Trigger reflow for animation
    void mobileNav.offsetHeight;
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!mobileNav.classList.contains('is-open')) {
        mobileNav.setAttribute('hidden', '');
      }
    }, 400);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('is-open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // ================================================================
  // 3. SMOOTH SCROLL for anchor links
  // ================================================================
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = $(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ================================================================
  // 4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ================================================================
  const revealItems = $$('.reveal-item');

  // Assign diagonal directions to make the reveal dynamic
  const directions = [
    'reveal-from-left',
    'reveal-from-right',
    'reveal-from-bottom',
    'reveal-from-bottom-left',
    'reveal-from-bottom-right',
    'reveal-from-top-left',
    'reveal-from-top-right',
  ];

  // Assign directions based on item position and index
  revealItems.forEach((item, index) => {
    // Determine direction based on index pattern for visual variety
    const section = item.closest('section');
    const sectionItems = $$('.reveal-item', section);
    const localIndex = sectionItems.indexOf(item);

    let direction;

    if (section && section.id === 'inicio') {
      // Hero: cascade from left/bottom
      const heroDirections = [
        'reveal-from-left',
        'reveal-from-left',
        'reveal-from-bottom-left',
        'reveal-from-bottom',
        'reveal-from-right',
      ];
      direction = heroDirections[localIndex % heroDirections.length];
    } else {
      // Other sections: alternate diagonal directions
      const patterns = [
        'reveal-from-bottom-left',
        'reveal-from-bottom',
        'reveal-from-bottom-right',
        'reveal-from-left',
        'reveal-from-right',
      ];
      direction = patterns[localIndex % patterns.length];
    }

    item.classList.add(direction);

    // Add stagger delay within sections
    if (localIndex > 0) {
      const delay = Math.min(localIndex, 5);
      item.classList.add(`reveal-delay-${delay}`);
    }
  });

  // Create the observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Remove revealed class so it re-animates when scrolling back
          entry.target.classList.remove('revealed');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // ================================================================
  // 5. METEOR SHOWER EFFECT (Canvas-based)
  // ================================================================
  function initMeteors() {
    const heroSection = $('#inicio');
    if (!heroSection) return;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'meteorCanvas';
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const ctx = canvas.getContext('2d');
    let meteors = [];
    let animFrame;
    let width, height;

    function resize() {
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Meteor class
    class Meteor {
      constructor() {
        this.reset();
      }

      reset() {
        // Start from random position along top or right edge
        const startEdge = Math.random();
        if (startEdge < 0.7) {
          // From top
          this.x = Math.random() * width * 1.2;
          this.y = -20;
        } else {
          // From right
          this.x = width + 20;
          this.y = Math.random() * height * 0.5;
        }

        // Diagonal angle (going down-left mostly)
        const angle = (Math.PI / 4) + (Math.random() * Math.PI / 6); // 45° - 75°
        this.speed = 3 + Math.random() * 6;
        this.vx = -Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;

        // Visual properties
        this.length = 40 + Math.random() * 120;
        this.thickness = 0.8 + Math.random() * 1.8;
        this.opacity = 0.15 + Math.random() * 0.5;

        // Color: blue, white, or purple
        const colors = [
          { r: 96, g: 165, b: 250 },   // blue-400
          { r: 167, g: 139, b: 250 },   // purple-400
          { r: 200, g: 210, b: 255 },   // white-blue
          { r: 129, g: 140, b: 248 },   // indigo
          { r: 255, g: 255, b: 255 },   // pure white
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Lifecycle
        this.life = 0;
        this.maxLife = 60 + Math.random() * 80;
        this.alive = true;

        // Trail positions
        this.trail = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Store trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.length / 2) {
          this.trail.shift();
        }

        // Fade out near end of life
        if (this.life > this.maxLife * 0.7) {
          this.opacity *= 0.96;
        }

        // Check if dead
        if (
          this.life > this.maxLife ||
          this.opacity < 0.02 ||
          this.x < -100 ||
          this.y > height + 100
        ) {
          this.alive = false;
        }
      }

      draw(ctx) {
        if (this.trail.length < 2) return;

        const { r, g, b } = this.color;

        // Draw luminous trail
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineWidth = this.thickness;

        // Main trail with gradient
        const trailLen = this.trail.length;
        for (let i = 1; i < trailLen; i++) {
          const t = i / trailLen;
          const alpha = t * this.opacity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = this.thickness * t;
          ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
          ctx.stroke();
        }

        // Bright head glow
        const headX = this.trail[trailLen - 1].x;
        const headY = this.trail[trailLen - 1].y;

        const glowRadius = this.thickness * 4;
        const glow = ctx.createRadialGradient(
          headX, headY, 0,
          headX, headY, glowRadius
        );
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.8})`);
        glow.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.3})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(headX, headY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Spawn control
    const maxMeteors = 8;
    let spawnTimer = 0;
    let spawnInterval = 30 + Math.random() * 60;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Spawn new meteors at varying intervals
      spawnTimer++;
      if (spawnTimer >= spawnInterval && meteors.length < maxMeteors) {
        meteors.push(new Meteor());
        spawnTimer = 0;
        spawnInterval = 20 + Math.random() * 70;
      }

      // Update and draw
      meteors.forEach((m) => {
        m.update();
        m.draw(ctx);
      });

      // Remove dead meteors
      meteors = meteors.filter((m) => m.alive);

      animFrame = requestAnimationFrame(animate);
    }

    // Start with a few meteors already visible
    for (let i = 0; i < 3; i++) {
      const m = new Meteor();
      m.life = Math.random() * 30;
      meteors.push(m);
    }

    animate();

    // Pause when not visible
    const meteorObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animFrame) animate();
        } else {
          cancelAnimationFrame(animFrame);
          animFrame = null;
        }
      },
      { threshold: 0 }
    );
    meteorObserver.observe(heroSection);
  }

  // ================================================================
  // 6. PROFILE PHOTO SETUP
  // ================================================================
  function initProfilePhoto() {
    const photoArea = $('#profilePhotoArea');
    const avatarDisplay = $('#avatarDisplay');
    const btnUpload = $('#btnUploadPreview');
    const btnReset = $('#btnResetPhoto');
    const fileInput = $('#localPhotoInput');

    if (!photoArea) return;

    // Load the actual profile photo
    const profileImg = document.createElement('img');
    profileImg.src = 'assets/foto-cesar.jpg';
    profileImg.alt = 'César Assunção da Silva Jr — Foto de Perfil';
    profileImg.className = 'profile-photo-img';
    profileImg.loading = 'eager';
    profileImg.draggable = false;

    profileImg.onload = () => {
      photoArea.insertBefore(profileImg, photoArea.firstChild);
      photoArea.classList.add('has-photo');
      if (avatarDisplay) avatarDisplay.style.display = 'none';
    };

    profileImg.onerror = () => {
      // If photo doesn't load, keep the monogram avatar
      console.info('Profile photo not found, showing avatar placeholder.');
    };

    // Upload preview functionality
    if (btnUpload && fileInput) {
      btnUpload.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
          const existingImg = $('img.profile-photo-img', photoArea);
          if (existingImg) {
            existingImg.src = ev.target.result;
          } else {
            const img = document.createElement('img');
            img.src = ev.target.result;
            img.alt = 'Preview da foto de perfil';
            img.className = 'profile-photo-img';
            img.draggable = false;
            photoArea.insertBefore(img, photoArea.firstChild);
          }
          photoArea.classList.add('has-photo');
          if (avatarDisplay) avatarDisplay.style.display = 'none';
          if (btnReset) btnReset.style.display = 'inline-flex';
        };
        reader.readAsDataURL(file);
      });
    }

    // Reset photo
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const img = $('img.profile-photo-img', photoArea);
        if (img) img.remove();
        photoArea.classList.remove('has-photo');
        if (avatarDisplay) avatarDisplay.style.display = '';
        btnReset.style.display = 'none';
        fileInput.value = '';
      });
    }
  }

  // ================================================================
  // 7. COPY EMAIL FUNCTIONALITY
  // ================================================================
  function initCopyEmail() {
    const btnCopy = $('#btnCopyEmail');
    const emailText = $('#emailText');
    const feedbackText = $('#copyFeedbackText');

    if (!btnCopy || !emailText) return;

    btnCopy.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        btnCopy.classList.add('copied');
        if (feedbackText) feedbackText.textContent = 'Copiado!';
        setTimeout(() => {
          btnCopy.classList.remove('copied');
          if (feedbackText) feedbackText.textContent = 'Copiar';
        }, 2500);
      } catch {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btnCopy.classList.add('copied');
        if (feedbackText) feedbackText.textContent = 'Copiado!';
        setTimeout(() => {
          btnCopy.classList.remove('copied');
          if (feedbackText) feedbackText.textContent = 'Copiar';
        }, 2500);
      }
    });
  }

  // ================================================================
  // 8. FOOTER — Current Year
  // ================================================================
  function initFooterYear() {
    const yearEl = $('#currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ================================================================
  // 9. CARD TILT EFFECT (subtle 3D on hover for project cards)
  // ================================================================
  function initCardTilt() {
    const cards = $$('.project-card, .skill-category-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ================================================================
  // 10. PARALLAX SUBTLE EFFECT for ambient glows
  // ================================================================
  function initParallax() {
    const glows = $$('.ambient-glow');
    if (glows.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      glows.forEach((glow, i) => {
        const speed = (i + 1) * 0.03;
        glow.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // ================================================================
  // INITIALIZATION
  // ================================================================
  function init() {
    updateHeader();
    updateActiveNav();
    initMeteors();
    initProfilePhoto();
    initCopyEmail();
    initFooterYear();
    initCardTilt();
    initParallax();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

