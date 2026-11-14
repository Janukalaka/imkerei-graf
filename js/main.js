// Imkerei – kleines Script ohne externe Bibliotheken

// 1) Mobiles Menü auf- und zuklappen
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const offen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', offen);
  });
  // Menü schließen, wenn ein Link angeklickt wird
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    })
  );
}

// 2) Aktuelles Jahr im Footer
const jahr = document.getElementById('jahr');
if (jahr) jahr.textContent = new Date().getFullYear();

// 3) Einfache Lightbox für die Galerie
//    Funktioniert, sobald in .gallery echte Bilder als <a href="gross.jpg"><img ...></a> stehen.
const galerieLinks = document.querySelectorAll('.gallery a');
if (galerieLinks.length) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button aria-label="Schließen">&times;</button><img alt="">';
  document.body.appendChild(box);
  const boxImg = box.querySelector('img');

  const schliessen = () => box.classList.remove('open');

  galerieLinks.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault();
      boxImg.src = link.href;
      boxImg.alt = link.querySelector('img')?.alt || '';
      box.classList.add('open');
    })
  );
  box.addEventListener('click', e => { if (e.target !== boxImg) schliessen(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') schliessen(); });
}
