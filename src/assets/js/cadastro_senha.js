document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSenha");
  const senha = document.getElementById("senha");
  const confirmarSenha = document.getElementById("confirmarSenha");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (senha.value !== confirmarSenha.value) {
      alert("As senhas não coincidem!");
      return;
    }

    // 🔹 Recuperar os dados salvos da tela anterior (ou cria lista vazia)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 🔹 Aqui você poderia pegar os dados do cadastro completo
    const nome = localStorage.getItem("nomeUsuario");
    const email = localStorage.getItem("emailUsuario");

    if (!nome || !email) {
      alert("Erro: dados do cadastro não encontrados.");
      return;
    }

    // 🔹 Criar o usuário e salvar
    const novoUsuario = { nome, email, senha: senha.value };
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Conta criada com sucesso!");
    window.location.href = "login.html";
  });
});
