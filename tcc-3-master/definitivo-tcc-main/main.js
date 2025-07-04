  document.getElementById("ano").textContent = new Date().getFullYear();

  
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 2000);

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    } else {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }
  });



  //mobile 
  // hamburguer
const btn = document.querySelector(".hamburguer");
const menu = document.querySelector("nav.menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});