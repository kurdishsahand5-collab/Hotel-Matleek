// ============================
// NAV SCROLL EFFECT
// ============================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ============================
// MOBILE MENU
// ============================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  burger.innerHTML = isOpen
    ? '<span style="transform:rotate(45deg) translate(5px,5px)"></span><span style="transform:rotate(-45deg) translate(5px,-5px)"></span>'
    : '<span></span><span></span>';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  burger.innerHTML = '<span></span><span></span>';
}

// ============================
// REVEAL ON SCROLL
// ============================
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (i % 4) * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ============================
// TESTIMONIAL SLIDER (mobile)
// ============================
const track = document.getElementById('testiTrack');
const dotsContainer = document.getElementById('testiDots');
const cards = track ? track.querySelectorAll('.testi-card') : [];
let currentTesti = 0;

function buildDots() {
  if (window.innerWidth > 768) return;
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi__dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToTesti(i));
    dotsContainer.appendChild(dot);
  });
}

function goToTesti(idx) {
  if (window.innerWidth > 768) return;
  currentTesti = idx;
  cards.forEach((card, i) => {
    card.style.display = i === idx ? 'block' : 'none';
  });
  document.querySelectorAll('.testi__dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function initTesti() {
  if (window.innerWidth <= 768) {
    buildDots();
    cards.forEach((card, i) => {
      card.style.display = i === 0 ? 'block' : 'none';
    });
    currentTesti = 0;
  } else {
    cards.forEach(card => card.style.display = '');
    dotsContainer.innerHTML = '';
  }
}

window.addEventListener('resize', initTesti);
initTesti();

// ============================
// FORM SUBMISSION
// ============================
function submitForm(e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
  e.target.reset();
}

// ============================
// SMOOTH ANCHOR OFFSET (for fixed nav)
// ============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================
// PARALLAX HERO SUBTLE
// ============================
const heroBg = document.querySelector('.hero__bg');

window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  heroBg.style.transform = `scale(1.08) translateY(${scrolled * 0.25}px)`;
}, { passive: true });
