
const TEXTO_BOTAO_CONFIRMAR = 'Confirmar pagamento';
function isMetodoCartao(metodo) {
  return metodo === 'Crédito' || metodo === 'Débito';
}

document.addEventListener('DOMContentLoaded', () => {
  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => document.querySelectorAll(sel);

  const btn = qs(".hamburguer");
  const menu = qs("nav.menu");
  const valoresBtns = qsa('.valor');
  const metodoBtns = qsa('.metodo-btn');
  const btnFeitoAbrir = qs('#btnFeitoAbrir');
  const btnfinal = qs('#btn-final');
  const obrigado = qs('#obrigado');

  const modal = qs('#modalDoacao');
  const fecharModalBtn = qs('#fecharModal');
  const confirmacaoDiv = qs('#confirmacaoMetodo');
  const metodoEscolhidoSpan = qs('#metodoEscolhido');
  const btnConfirmarMetodo = qs('#btnConfirmarMetodo');
  const btnCancelarMetodo = qs('#btnCancelarMetodo');
  const formDoacao = qs('#formDoacao');
  const btnDoar = qs('#btnDoar');
  const anonimoCheckbox = qs('#anonimo');

  const nomeInput = qs('#nome');
  const estadoSelect = qs('#estado');
  const cpfInput = qs('#cpf');
  const numeroCartaoInput = qs('#numeroCartao');
  const CVCCartaoInput = qs('#CVCCartao');
  const mesValidade = qs('#mesValidade');
  const anoValidade = qs('#anoValidade');
  const cartaoCampos = qs('#cartaoCampos');
  const qrCodePIX = qs('#qrCodePIX');

  let metodoSelecionado = null;
  let valorSelecionado = null;

  btn.addEventListener("click", () => menu.classList.toggle("active"));

  valoresBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      valoresBtns.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
      valorSelecionado = btn.dataset.valor;
      toggleBtnFeito();
    });
  });

  metodoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      metodoBtns.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
      metodoSelecionado = btn.dataset.metodo;
      toggleBtnFeito();
    });
  });

  function toggleBtnFeito() {
    const ativo = valorSelecionado && metodoSelecionado;
    btnFeitoAbrir.disabled = !ativo;
    btnFeitoAbrir.style.opacity = ativo ? '1' : '0.5';
    btnFeitoAbrir.style.cursor = ativo ? 'pointer' : 'not-allowed';
  }

  function exibirModalConfirmacao() {
    metodoEscolhidoSpan.textContent = metodoSelecionado;
    confirmacaoDiv.style.display = 'block';
    formDoacao.style.display = 'none';
    qrCodePIX.style.display = 'none';
    btnfinal.style.display = 'none';
    cartaoCampos.style.display = isMetodoCartao(metodoSelecionado) ? 'block' : 'none';
    modal.style.display = 'flex';
  }

  btnFeitoAbrir.addEventListener('click', () => {
    btnFeitoAbrir.disabled = true;
    formDoacao.reset();
    exibirModalConfirmacao();
  });

  fecharModalBtn.addEventListener('click', () => modal.style.display = 'none');
  btnCancelarMetodo.addEventListener('click', () => modal.style.display = 'none');

  btnConfirmarMetodo.addEventListener('click', () => {
    confirmacaoDiv.style.display = 'none';
    formDoacao.style.display = 'block';
    nomeInput.focus();
  });

  anonimoCheckbox.addEventListener('change', () => {
    const anon = anonimoCheckbox.checked;
    nomeInput.disabled = anon;
    estadoSelect.disabled = anon;
    cpfInput.disabled = anon;

    const cartao = isMetodoCartao(metodoSelecionado);
    numeroCartaoInput.disabled = !cartao;
    CVCCartaoInput.disabled = !cartao;
    mesValidade.disabled = !cartao;
    anoValidade.disabled = !cartao;

    checarCampos();
  });

  function validarCampos() {
    if (!anonimoCheckbox.checked) {
      if (!nomeInput.value.trim() || !estadoSelect.value || !cpfInput.value.trim()) return false;
    }
    if (isMetodoCartao(metodoSelecionado)) {
      if (!numeroCartaoInput.value.trim() || !CVCCartaoInput.value.trim() || !mesValidade.value || !anoValidade.value) return false;
    }
    return true;
  }

  function checarCampos() {
    btnDoar.disabled = !validarCampos();
  }

  [nomeInput, estadoSelect, cpfInput, numeroCartaoInput, CVCCartaoInput, mesValidade, anoValidade].forEach(el => {
    el.addEventListener('input', checarCampos);
  });

  cpfInput.addEventListener('input', () => {
    cpfInput.value = cpfInput.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  });

  formDoacao.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarCampos()) return alert('Preencha todos os campos corretamente.');

    if (metodoSelecionado === 'PIX') {
      formDoacao.style.display = 'none';
      qrCodePIX.style.display = 'block';
    }
    mostrarBotaoFinal();
  });

  function mostrarBotaoFinal() {
    btnfinal.textContent = TEXTO_BOTAO_CONFIRMAR;
    btnfinal.style.display = 'inline-block';
    btnfinal.disabled = false;
  }

  btnfinal.addEventListener('click', () => {
    formDoacao.style.display = 'none';
    qrCodePIX.style.display = 'none';
    confirmacaoDiv.style.display = 'none';
    btnfinal.style.display = 'none';
    obrigado.style.display = 'flex';

    setTimeout(() => {
      modal.style.display = 'none';
      resetarTudo();
      obrigado.style.display = 'none';
    }, 2000);
  });

  function resetarTudo() {
    valoresBtns.forEach(b => b.classList.remove('selecionado'));
    metodoBtns.forEach(b => b.classList.remove('selecionado'));
    valorSelecionado = null;
    metodoSelecionado = null;
    toggleBtnFeito();
    formDoacao.reset();
    cartaoCampos.style.display = 'none';
    qrCodePIX.style.display = 'none';
    btnDoar.disabled = true;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
