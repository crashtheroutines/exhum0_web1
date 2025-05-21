const sections = document.querySelectorAll('.section');
let current = 0;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  current = index;
}

let isScrolling = false;

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  isScrolling = true;
  if (e.deltaY > 0) {
    scrollToSection(current + 1);
  } else {
    scrollToSection(current - 1);
  }

  setTimeout(() => { isScrolling = false; }, 800); // защита от быстрого скролла
});
