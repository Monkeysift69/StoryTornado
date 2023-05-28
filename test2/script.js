const sections = document.querySelectorAll('.parallax');
let currentSectionIndex = 0;
let isScrolling = false;
let scrollDirection = '';

function fadeInTextElements(section) {
  const fadeElements = section.querySelectorAll('.fade-in');

  fadeElements.forEach((fadeElement) => {
    fadeElement.style.opacity = 1;
    fadeElement.classList.add('fade-in-done');
  });
}

function fadeOutTextElements(section, delay) {
  const fadeElements = section.querySelectorAll('.fade-in');

  fadeElements.forEach((fadeElement) => {
    setTimeout(() => {
      fadeElement.style.opacity = 0;
      fadeElement.classList.remove('fade-in-done');
    }, delay);
  });
}

function handleScrollAndFade() {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const fadeElements = section.querySelectorAll('.fade-in');
        const delay = 50000; // Adjust the delay value as needed

        if (
          scrollPosition >= rect.top &&
          scrollPosition < rect.bottom - windowHeight * 0.7
        ) {
          if (index !== currentSectionIndex) {
            isScrolling = true;

            fadeOutTextElements(sections[currentSectionIndex], delay);
            fadeInTextElements(section);

            currentSectionIndex = index;
          }
        }  
      });

      isScrolling = false;
      scrollDirection = '';
    });
  }
}

function handleWheel(event) {
  if (event.deltaY > 0) {
    scrollDirection = 'down';
  } else if (event.deltaY < 0) {
    scrollDirection = 'up';
  }
}

window.addEventListener('wheel', handleWheel);
window.addEventListener('scroll', handleScrollAndFade);

sections.forEach((section) => {
  const fadeElements = section.querySelectorAll('.fade-in');

  fadeElements.forEach((fadeElement) => {
    fadeElement.style.opacity = 0;
  });
});
