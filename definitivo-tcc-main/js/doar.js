document.addEventListener('DOMContentLoaded', () => {
  const valoresBtns = document.querySelectorAll('.valor');
  const metodoBtns = document.querySelectorAll('.metodo-btn');
  const btnFeitoAbrir = document.getElementById('btnFeitoAbrir');
  const btnFeitoFinal = document.getElementById('btnFeitoFinal');

  const modal = document.getElementById('modalDoacao');
  const fecharModalBtn = document.getElementById('fecharModal');
  const confirmacaoDiv = document.getElementById('confirmacaoMetodo');
  const metodoEscolhidoSpan = document.getElementById('metodoEscolhido');
  const btnConfirmarMetodo = document.getElementById('btnConfirmarMetodo');
  const btnCancelarMetodo = document.getElementById('btnCancelarMetodo');
  const formDoacao = document.getElementById('formDoacao');
  const btnDoar = document.getElementById('btnDoar');
  const anonimoCheckbox = document.getElementById('anonimo');
  const nomeInput = document.getElementById('nome');
  const estadoSelect = document.getElementById('estado');
  const cpfInput = document.getElementById('cpf');
  const cartaoCampos = document.getElementById('cartaoCampos');
  const numeroCartaoInput = document.getElementById('numeroCartao');
  const senhaCartaoInput = document.getElementById('senhaCartao');
  const qrCodePIX = document.getElementById('qrCodePIX');

  let metodoSelecionado = null;
  let valorSelecionado = null;

  valoresBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      valoresBtns.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
      valorSelecionado = btn.getAttribute('data-valor');
      checarForm();
    });
  });

  metodoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      metodoBtns.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
      metodoSelecionado = btn.getAttribute('data-metodo');
      checarForm();
    });
  });

  function checarForm() {
    if (valorSelecionado && metodoSelecionado) {
      btnFeitoAbrir.disabled = false;
      btnFeitoAbrir.style.opacity = '1';
      btnFeitoAbrir.style.cursor = 'pointer';
    } else {
      btnFeitoAbrir.disabled = true;
      btnFeitoAbrir.style.opacity = '0.5';
      btnFeitoAbrir.style.cursor = 'not-allowed';
    }
  }

  checarForm();

  btnFeitoAbrir.addEventListener('click', () => {
    metodoEscolhidoSpan.textContent = metodoSelecionado;
    confirmacaoDiv.style.display = 'block';
    formDoacao.style.display = 'none';
    qrCodePIX.style.display = 'none';
    btnFeitoFinal.style.display = 'none';

    nomeInput.value = '';
    estadoSelect.value = '';
    cpfInput.value = '';
    numeroCartaoInput.value = '';
    senhaCartaoInput.value = '';
    anonimoCheckbox.checked = false;

    nomeInput.disabled = false;
    estadoSelect.disabled = false;
    cpfInput.disabled = false;
    numeroCartaoInput.disabled = false;
    senhaCartaoInput.disabled = false;

    cartaoCampos.style.display =
      metodoSelecionado === 'Crédito' || metodoSelecionado === 'Débito'
        ? 'block'
        : 'none';

    modal.style.display = 'flex';
  });

  fecharModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  btnCancelarMetodo.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  btnConfirmarMetodo.addEventListener('click', () => {
    confirmacaoDiv.style.display = 'none';
    formDoacao.style.display = 'block';
  });

  anonimoCheckbox.addEventListener('change', () => {
    const anon = anonimoCheckbox.checked;
    nomeInput.disabled = anon;
    estadoSelect.disabled = anon;
    cpfInput.disabled = anon;
    numeroCartaoInput.disabled = anon || (metodoSelecionado !== 'Crédito' && metodoSelecionado !== 'Débito');
    senhaCartaoInput.disabled = anon || (metodoSelecionado !== 'Crédito' && metodoSelecionado !== 'Débito');
    btnDoar.disabled = anon ? false : true;
  });

  function validarCampos() {
    if (anonimoCheckbox.checked) return true;
    if (!nomeInput.value.trim()) return false;
    if (!estadoSelect.value) return false;
    if (!cpfInput.value.trim()) return false;
    if (metodoSelecionado === 'Crédito' || metodoSelecionado === 'Débito') {
      if (!numeroCartaoInput.value.trim()) return false;
      if (!senhaCartaoInput.value.trim()) return false;
    }
    return true;
  }

  function checarCampos() {
    btnDoar.disabled = !validarCampos();
  }

  [nomeInput, estadoSelect, cpfInput, numeroCartaoInput, senhaCartaoInput].forEach(el => {
    el.addEventListener('input', checarCampos);
  });

  formDoacao.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (metodoSelecionado === 'PIX') {
      formDoacao.style.display = 'none';
      qrCodePIX.style.display = 'block';
      btnFeitoFinal.textContent = 'Confirmar pagamento';
      btnFeitoFinal.style.display = 'inline-block';
      btnFeitoFinal.disabled = false;
    } else {
      alert('Obrigado pela sua doação!');
      modal.style.display = 'none';
      resetarTudo();
    }
  });

  btnFeitoFinal.addEventListener('click', () => {
    alert('Pagamento confirmado! Obrigado pela sua doação.');
    modal.style.display = 'none';
    resetarTudo();
  });

  function resetarTudo() {
    valoresBtns.forEach(b => b.classList.remove('selecionado'));
    metodoBtns.forEach(b => b.classList.remove('selecionado'));
    valorSelecionado = null;
    metodoSelecionado = null;
    btnFeitoAbrir.disabled = true;
    btnFeitoAbrir.style.opacity = '0.5';
    btnFeitoAbrir.style.cursor = 'not-allowed';
    formDoacao.reset();
    cartaoCampos.style.display = 'none';
    qrCodePIX.style.display = 'none';
    btnDoar.disabled = true;
    btnFeitoFinal.style.display = 'none';
  }
});
