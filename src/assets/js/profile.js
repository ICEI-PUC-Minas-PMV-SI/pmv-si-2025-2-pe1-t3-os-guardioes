// Seletores
const tipoPessoa = document.getElementById('tipoPessoa');
const cpfCnpjInput = document.getElementById('cpfCnpj');
const celularInput = document.getElementById('celular');
const fotoPerfil = document.getElementById('fotoPerfil');
const btnFoto = document.getElementById('btnFoto');

// Máscaras
function aplicarMascara(valor, tipo) {
  if (tipo === 'cpf') {
    return valor.replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (tipo === 'cnpj') {
    return valor.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  } else if (tipo === 'celular') {
    return valor.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }
  return valor;
}

// Troca placeholder ao mudar tipo de pessoa
tipoPessoa.addEventListener('change', () => {
  if (tipoPessoa.value === 'fisica') {
    cpfCnpjInput.placeholder = "000.000.000-00";
  } else {
    cpfCnpjInput.placeholder = "00.000.000/0000-00";
  }
  cpfCnpjInput.value = "";
});

// Máscaras ao digitar
cpfCnpjInput.addEventListener('input', () => {
  if (tipoPessoa.value === 'fisica') {
    cpfCnpjInput.value = aplicarMascara(cpfCnpjInput.value, 'cpf');
  } else {
    cpfCnpjInput.value = aplicarMascara(cpfCnpjInput.value, 'cnpj');
  }
});

celularInput.addEventListener('input', () => {
  celularInput.value = aplicarMascara(celularInput.value, 'celular');
});

// Seleção de foto
btnFoto.addEventListener('click', () => {
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.accept = 'image/*';
  inputFile.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        fotoPerfil.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  inputFile.click();
});

// Carregar dados do usuário
document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("usuarioLogado");
  if (!userId) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/usuarios/${userId}`);
    const usuario = await res.json();
    if (!usuario) {
      alert("Usuário não encontrado.");
      return;
    }

    // Preencher informações do perfil
    document.querySelector(".profile-info h2").textContent = usuario.nome || "";
    document.querySelector(".profile-info p").textContent = usuario.email || "";

    // Campos do perfil
    document.querySelector('input[placeholder="Nome"]').value = usuario.nome || "";
    document.querySelector('input[placeholder="E-mail"]').value = usuario.email || "";

    // Tipo de pessoa
    if (usuario.categoria === "morador" || usuario.categoria === "comerciante") {
      tipoPessoa.value = 'fisica';
      cpfCnpjInput.placeholder = "000.000.000-00";
    } else {
      tipoPessoa.value = 'juridica';
      cpfCnpjInput.placeholder = "00.000.000/0000-00";
    }

    cpfCnpjInput.value = usuario.cpf || "";
    celularInput.value = usuario.celular || "";

    // Endereço
    document.querySelector('input[placeholder="Rua"]').value = usuario.rua || "";
    document.querySelector('input[placeholder="Número"]').value = usuario.numero || "";
    document.querySelector('input[placeholder="Bairro"]').value = usuario.bairro || "";
    document.querySelector('input[placeholder="Cidade"]').value = usuario.cidade || "";
    document.querySelector('input[placeholder="Estado"]').value = usuario.uf || "";
    document.querySelector('#cep').value = usuario.cep || "";
    document.querySelector('input[placeholder="Complemento"]').value = usuario.complemento || "";

    // Notificações
    document.querySelector('#notificacoes').checked = usuario.receberNovidades || false;

  } catch (err) {
    console.error(err);
    alert("Erro ao carregar o perfil.");
  }

  // Logout
  document.querySelector(".logout-btn").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
  });
});

const btnSalvar = document.getElementById('btnSalvar');

btnSalvar.addEventListener('click', async () => {
  const userId = localStorage.getItem("usuarioLogado");
  if (!userId) return;

  // Monta objeto com dados atualizados
  const dadosAtualizados = {
    nome: document.querySelector('input[placeholder="Nome"]').value,
    email: document.querySelector('input[placeholder="E-mail"]').value,
    categoria: tipoPessoa.value === 'fisica' ? 'morador' : 'empresa', // ou outro mapeamento
    cpf: cpfCnpjInput.value,
    celular: celularInput.value,
    rua: document.querySelector('input[placeholder="Rua"]').value,
    numero: document.querySelector('input[placeholder="Número"]').value,
    bairro: document.querySelector('input[placeholder="Bairro"]').value,
    cidade: document.querySelector('input[placeholder="Cidade"]').value,
    uf: document.querySelector('input[placeholder="Estado"]').value,
    cep: document.querySelector('#cep').value,
    complemento: document.querySelector('input[placeholder="Complemento"]').value,
    receberNovidades: document.querySelector('#notificacoes').checked
  };

  try {
    const res = await fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PUT', // json-server usa PUT para atualizar registro
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    });

    if (res.ok) {
      alert("Perfil atualizado com sucesso!");
    } else {
      alert("Erro ao salvar perfil.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar perfil.");
  }
});
