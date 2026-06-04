/* KINEMA – main.js */

const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
const navLinks  = document.querySelectorAll('.nav-link');

// Navbar – cambia estilo al hacer scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
// Aseguramos el estado inicial si la página ya está scrolleada
navbar.classList.toggle('scrolled', window.scrollY > 40);

// Menú hamburguesa
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  navMenu.setAttribute('aria-hidden', !isOpen);
});

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
  });
});

// Active nav link según sección visible
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Scroll animations con Intersection Observer
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Escalonamos los hijos del mismo padre para un efecto cascada
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-animate]')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 90);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animatedEls.forEach(el => observer.observe(el));

// Highlight del día actual en horarios
const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const today = days[new Date().getDay()];

document.querySelectorAll('.hours-list li').forEach(row => {
  const label = row.querySelector('span');
  if (label && label.textContent.trim().toLowerCase() === today) {
    row.style.background = 'rgba(0,181,168,.12)';
    row.style.borderRadius = '6px';
    row.style.paddingInline = '.5rem';
    const strong = row.querySelector('strong');
    if (strong) strong.style.color = 'var(--accent)';
  }
});
