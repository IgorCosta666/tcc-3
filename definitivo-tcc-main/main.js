 const elementos = document.querySelectorAll('.animar, .animar-esquerda, .animar-direita');

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('ativo');
      } else {
        entrada.target.classList.remove('ativo'); 
      }
    });
  }, {
    threshold: 0.1
  });

  elementos.forEach(el => observador.observe(el));
