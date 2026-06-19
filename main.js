// ─── CAROUSELS ────────────────────────────────────────────────
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const carousel = document.getElementById(btn.dataset.target);
    const itemWidth = carousel.querySelector('.p').offsetWidth + 10;
    carousel.scrollBy({ left: btn.dataset.dir * itemWidth * 3, behavior: 'smooth' });
  });
});

// ─── NAV SCROLL ───────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 60);
});

// ─── HAMBURGER ────────────────────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
  navLinks.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-label', 'Abrir menú');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ─── FADE IN ──────────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('on'), i * 65);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });
document.querySelectorAll('.fi').forEach(el => io.observe(el));

// ─── VIDEOS ───────────────────────────────────────────────────
document.querySelectorAll('.vid').forEach(card => {
  const v = card.querySelector('video');
  if (!v) return;

  // Click para play/pause
  card.addEventListener('click', () => {
    if (v.paused) {
      // Pausar todos los demás
      document.querySelectorAll('.vid video').forEach(ov => {
        if (ov !== v) { ov.pause(); ov.closest('.vid').classList.remove('playing'); }
      });
      v.play();
      card.classList.add('playing');
    } else {
      v.pause();
      card.classList.remove('playing');
    }
  });

  // Al terminar (si no es loop) quitar estado playing
  v.addEventListener('ended', () => card.classList.remove('playing'));
});

// ─── LIGHTBOX ─────────────────────────────────────────────────
const imgs = [...document.querySelectorAll('.carousel img')];
let cur = 0;

function openLB(i) {
  cur = i;
  document.getElementById('lb-img').src = imgs[cur].src;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLB() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}

imgs.forEach((img, i) => img.closest('.p').addEventListener('click', () => openLB(i)));
document.getElementById('lb-x').addEventListener('click', closeLB);
document.getElementById('lb').addEventListener('click', e => { if (e.target.id === 'lb') closeLB(); });
document.getElementById('lb-prev').addEventListener('click', () => {
  cur = (cur - 1 + imgs.length) % imgs.length;
  document.getElementById('lb-img').src = imgs[cur].src;
});
document.getElementById('lb-next').addEventListener('click', () => {
  cur = (cur + 1) % imgs.length;
  document.getElementById('lb-img').src = imgs[cur].src;
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') document.getElementById('lb-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lb-next').click();
});
