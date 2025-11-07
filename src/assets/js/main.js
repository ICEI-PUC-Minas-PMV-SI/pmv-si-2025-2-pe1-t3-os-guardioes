// URL base do JSON Server (onde estão seus usuários)
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
    // Busca todos os usuários do JSON Server
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao acessar servidor");

    const usuarios = await resp.json();

    // Verifica se há usuário com e-mail e senha correspondentes
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      // Salva o usuário logado no localStorage
      localStorage.setItem("userId", usuario.id);
      localStorage.setItem("userName", usuario.nome);
      localStorage.setItem("userCidade", usuario.cidade);
      localStorage.setItem("userBairro", usuario.bairro);
      localStorage.setItem("userUF", usuario.uf); // <-- faltava essa linha!

      // Redireciona
      window.location.href = "home.html";
    } else {
      alert("E-mail ou senha incorretos!");
    }

  } catch (e) {
    console.error(e);
    alert("Erro ao conectar ao servidor: " + e.message);
  }
}
