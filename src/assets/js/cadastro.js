// assets/js/cadastro.js
// Esse arquivo funciona tanto em cadastro_completo.html quanto em cadastro_simplificado.html
// Fluxo: passo 1 -> salva parcial no localStorage; passo 2 -> completa e faz POST no json-server.

const API_USUARIOS = "http://localhost:3000/usuarios";
const STORAGE_KEY = "cadastro_parcial";

// elementos de CEP (podem não existir em todas as telas, então verificamos)
const docInput = document.getElementById('cpf');
const celularInput = document.getElementById('celular');
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const numeroInput = document.getElementById('numero');

let debounceTimer;

if (celularInput) {
  celularInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // remove tudo que não é número

    if (value.length > 11) value = value.slice(0, 11); // limita a 11 dígitos

    if (value.length > 2) {
      // adiciona parênteses no DDD
      value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }

    e.target.value = value;
  });
}

if (docInput) {
  docInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // remove tudo que não é número

    if (value.length > 11) value = value.slice(0, 11); // CPF tem no máximo 11 dígitos

    // aplica máscara: 000.000.000-00
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = value;
  });
}

// só configura listener de CEP se o campo existir
if (cepInput) {
  cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5, 8);
    e.target.value = value;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => buscarCEP(value), 500);
  });
}

async function buscarCEP(cep) {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (!data.erro) {
      if (ruaInput) ruaInput.value = data.logradouro || '';
      if (bairroInput) bairroInput.value = data.bairro || '';
      if (cidadeInput) cidadeInput.value = data.localidade || '';
      if (ufInput) ufInput.value = data.uf || '';
      if (numeroInput) numeroInput.focus();
    } else {
      if (ruaInput) ruaInput.value = '';
      if (bairroInput) bairroInput.value = '';
      if (cidadeInput) cidadeInput.value = '';
      if (ufInput) ufInput.value = '';
      alert('CEP não encontrado!');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao buscar o CEP!');
  }
}


// detecta qual tela estamos analisando pela presença de campos-chaves
const isCadastroCompleto = !!document.querySelector('input[placeholder="Nome"]') && !!document.querySelector('input[placeholder="E-mail"]') && !!document.getElementById('cep');
const isCadastroSimplificado = !!document.querySelector('select') && [...document.querySelectorAll('input[type="password"]')].length >= 2;

// pega o form (se existir)
const form = document.querySelector('.form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isCadastroCompleto) {
      // coleta apenas os campos da tela completa e salva no localStorage
      const parcial = {
        nome: (document.querySelector('input[placeholder="Nome"]')?.value || "").trim(),
        email: (document.querySelector('input[placeholder="E-mail"]')?.value || "").trim(),
        cpf: (document.querySelector('input[placeholder="CPF"]')?.value || "").trim(),
        celular: (document.querySelector('input[placeholder="Celular"]')?.value || "").trim(),
        idade: (document.querySelector('input[placeholder="Idade"]')?.value || "").trim(),
        cep: (cepInput?.value || "").trim(),
        rua: (ruaInput?.value || "").trim(),
        bairro: (bairroInput?.value || "").trim(),
        numero: (numeroInput?.value || "").trim(),
        complemento: (document.querySelector('input[placeholder="Complemento"]')?.value || "").trim(),
        cidade: (cidadeInput?.value || "").trim(),
        uf: (ufInput?.value || "").trim(),
        aceitarPolitica: !!document.querySelector('.checkbox-group input')?.checked,
        receberNovidades: !!document.querySelectorAll('.checkbox-group input')[1]?.checked,
        imagem: ""
      };

      // validações mínimas
      if (!parcial.nome || !parcial.email) {
        alert("Preencha pelo menos Nome e E-mail.");
        return;
      }

      // salva no localStorage e redireciona para o passo 2
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parcial));
      // redireciona para o próximo passo (cadastro_simplificado.html)
      window.location.href = "cadastro_simplificado.html";
      return;
    }

    if (isCadastroSimplificado) {
      // Recupera parcial
      const parcialStr = localStorage.getItem(STORAGE_KEY);
      if (!parcialStr) {
        // Se o usuário acessou esse passo sem preencher o anterior, informamos
        alert("Por favor preencha o cadastro completo primeiro.");
        // opcional: redirecionar ao começo
        window.location.href = "cadastro_completo.html";
        return;
      }

      const parcial = JSON.parse(parcialStr);

      // pega campos desta tela
      const selects = document.querySelectorAll('select');
      const sexo = selects[0]?.value || "";
      const categoria = selects[1]?.value || "";
      const senha = (document.querySelectorAll('input[type="password"]')[0]?.value || "").trim();
      const confirma = (document.querySelectorAll('input[type="password"]')[1]?.value || "").trim();

      if (!senha || !confirma) {
        alert("Preencha a senha e a confirmação.");
        return;
      }
      if (senha !== confirma) {
        alert("As senhas não coincidem.");
        return;
      }

      // monta usuário final
      const usuarioFinal = {
        ...parcial,
        sexo,
        categoria,
        senha
      };

      // opcional: sanitizar/transformar dados (ex: idade -> number)
      if (usuarioFinal.idade) {
        const n = Number(usuarioFinal.idade);
        usuarioFinal.idade = isNaN(n) ? usuarioFinal.idade : n;
      }

      // POST para o json-server
      try {
        const resp = await fetch(API_USUARIOS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuarioFinal)
        });

        if (!resp.ok) throw new Error(`Status ${resp.status}`);

        // sucesso: limpa storage e redireciona para login
        localStorage.removeItem(STORAGE_KEY);
        alert("Cadastro criado com sucesso!");
        window.location.href = "login.html";
      } catch (err) {
        console.error("Erro ao salvar usuário:", err);
        alert("Erro ao salvar usuário. Verifique o servidor (json-server) e o console.");
      }

      return;
    }

    // Se chegou aqui, formulário desconhecido (evitar erro)
    alert("Formulário desconhecido. Atualize a página e tente novamente.");
  });
}
