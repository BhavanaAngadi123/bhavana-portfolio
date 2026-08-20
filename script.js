const currentUrl = new URL(window.location.href);
if (currentUrl.searchParams.has('utm_source')) {
  currentUrl.searchParams.delete('utm_source');
  const cleanQuery = currentUrl.searchParams.toString();
  const cleanUrl = `${currentUrl.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${currentUrl.hash}`;
  window.history.replaceState({}, document.title, cleanUrl);
}

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion) {
  revealItems.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(el => observer.observe(el));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.25, 0.55] });
  sections.forEach(section => sectionObserver.observe(section));
}
