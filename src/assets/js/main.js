// URL do JSON Server
const API_URL = "http://localhost:3000/usuarios";

// Função de login
async function login(event) {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const senha = document.querySelector('#senha').value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    // Busca os usuários no JSON Server
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao acessar servidor");

    const usuarios = await resp.json();

    // Procura o usuário pelo email e senha
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      alert("E-mail ou senha incorretos!");
      return;
    }

    // Salva dados do usuário logado
    localStorage.setItem("userId", usuario.id);
    localStorage.setItem("userName", usuario.nome);
    localStorage.setItem("userCidade", usuario.cidade || "");
    localStorage.setItem("userBairro", usuario.bairro || "");
    localStorage.setItem("userUF", usuario.uf || "");

    // Redireciona
    window.location.href = "home.html";

  } catch (erro) {
    console.error(erro);
    alert("Erro ao conectar ao servidor.");
  }
}
