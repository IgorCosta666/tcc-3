//mobile 
// hamburguer
const btn = document.querySelector(".hamburguer");
const menu = document.querySelector("nav.menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  } else {
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }
});



