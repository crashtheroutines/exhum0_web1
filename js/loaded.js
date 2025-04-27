const loader = document.querySelector('.project-loader');
const inactiveSection = document.querySelector('.project-section.inactive');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      inactiveSection.classList.remove('hidden');
      inactiveSection.classList.add('visible');
      loader.style.display = 'none';
      observer.disconnect(); // чтобы не повторялось
    }
  });
}, {
  rootMargin: '0px',
  threshold: 0.5
});

observer.observe(loader);
