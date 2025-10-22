const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const numeroInput = document.getElementById('numero');

let debounceTimer;

// Formatar CEP enquanto digita
cepInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5, 8);
  e.target.value = value;

  // Debounce: só busca CEP quando parar de digitar por 500ms
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => buscarCEP(value), 500);
});

async function buscarCEP(cep) {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (!data.erro) {
      ruaInput.value = data.logradouro || '';
      bairroInput.value = data.bairro || '';
      cidadeInput.value = data.localidade || '';
      ufInput.value = data.uf || '';
      numeroInput.focus();
    } else {
      ruaInput.value = '';
      bairroInput.value = '';
      cidadeInput.value = '';
      ufInput.value = '';
      alert('CEP não encontrado!');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao buscar o CEP!');
  }
}