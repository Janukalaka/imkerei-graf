// Bienenluft Graf-Hof – kleines Script ohne externe Bibliotheken
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Header: Hintergrund beim Scrollen
const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
if (header && !document.body.classList.contains('page-sub')) {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// 2) Mobiles Menü
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

// 3) Zahlen hochzählen
const formatNumber = (value, decimals) =>
  value.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const plain = 'plain' in el.dataset; // z. B. Jahreszahl ohne Tausenderpunkt
  const start = plain ? target - 7 : 0;
  const duration = 1600;
  const t0 = performance.now();

  const tick = (now) => {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = start + (target - start) * eased;
    el.textContent = (plain ? Math.round(v) : formatNumber(v, decimals)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// 4) Elemente beim Scrollen einblenden + Animationen starten
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Geschwister nacheinander einblenden
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 90}ms`;
      el.classList.add('visible');
      el.querySelectorAll('[data-count]').forEach(countUp);
      el.querySelectorAll('.bar-fill').forEach((b) => (b.style.width = b.dataset.width + '%'));
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
  document.querySelectorAll('.bar-fill').forEach((b) => (b.style.width = b.dataset.width + '%'));
}

// 5) Lightbox für Fotos
const lbLinks = document.querySelectorAll('a.lb');
if (lbLinks.length) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" aria-label="Schließen">&times;</button><img alt="">';
  document.body.appendChild(box);
  const img = box.querySelector('img');
  const close = () => box.classList.remove('open');

  lbLinks.forEach((link) =>
    link.addEventListener('click', (e) => {
      e.preventDefault();
      img.src = link.href;
      img.alt = link.querySelector('img')?.alt || '';
      box.classList.add('open');
      box.querySelector('button').focus();
    })
  );
  box.addEventListener('click', (e) => { if (e.target !== img) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// 6) Jahr im Footer
const jahr = document.getElementById('jahr');
if (jahr) jahr.textContent = new Date().getFullYear();
