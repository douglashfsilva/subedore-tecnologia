const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const revealItems = document.querySelectorAll('.reveal');
const projectForm = document.getElementById('project-form');
const projectSummary = document.getElementById('project-summary');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

projectForm.addEventListener('submit', event => {
  event.preventDefault();

  const summary = projectSummary.value.trim();
  const lines = [
    'Olá, Douglas! Vi o site da Subedore Tecnologia e gostaria de falar sobre um projeto.'
  ];

  if (summary) {
    lines.push('', `Minha ideia: ${summary}`);
  }

  const whatsappUrl = `https://wa.me/5538988018881?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();
