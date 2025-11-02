// Recupera lista de usuários do localStorage ou cria lista vazia
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Função para cadastrar novo usuário (cadastro completo)
function cadastrarCompleto(event) {
  event.preventDefault();

  const nome = document.querySelector('input[placeholder="Nome"]').value;
  const email = document.querySelector('input[placeholder="E-mail"]').value;
  const senha = prompt("Crie uma senha para sua conta:");

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    alert("Este e-mail já está cadastrado!");
    return;
  }

  const novoUsuario = { nome, email, senha };
  usuarios.push(novoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

// Função para cadastro simplificado
function cadastrarSimplificado(event) {
  event.preventDefault();

  const sexo = document.querySelector("select:nth-of-type(1)").value;
  const categoria = document.querySelector("select:nth-of-type(2)").value;
  const senha = document.querySelector('input[placeholder="Senha"]').value;
  const confirma = document.querySelector('input[placeholder="Confirmação de senha"]').value;

  if (!sexo || !categoria || !senha || !confirma) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha !== confirma) {
    alert("As senhas não coincidem!");
    return;
  }

  const email = prompt("Digite seu e-mail para cadastro:");
  const nome = prompt("Digite seu nome completo:");

  if (!email || !nome) {
    alert("Cadastro cancelado.");
    return;
  }

  const novoUsuario = { nome, email, senha, sexo, categoria };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}

// Função de login
function login(event) {
  event.preventDefault();

  const nome = document.querySelector('input[placeholder="Nome"]').value;
  const senha = document.querySelector('input[placeholder="Senha"]').value;

  const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);

  if (usuario) {
    alert(`Bem-vindo, ${usuario.nome}!`);
    window.location.href = "home.html";
  } else {
    alert("Nome ou senha incorretos!");
  }
}

// Função para "Esqueceu a senha"
function esqueceuSenha(event) {
  event.preventDefault();

  const email = document.querySelector('input[type="email"]').value;
  const usuario = usuarios.find(u => u.email === email);

  if (usuario) {
    alert("Um link de redefinição de senha foi enviado para o seu e-mail (simulado).");
  } else {
    alert("E-mail não encontrado!");
  }
}

[
  {
    "nome": "Filipe",
    "email": "filipe@email.com",
    "senha": "1234",
    "sexo": "masculino",
    "categoria": "morador"
  }
]

