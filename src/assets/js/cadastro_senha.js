document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSenha");
  const senha = document.getElementById("senha");
  const confirmarSenha = document.getElementById("confirmarSenha");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (senha.value !== confirmarSenha.value) {
      alert("As senhas não coincidem!");
      return;
    }

    // 🔹 Recupera os dados salvos da tela 1
    const dadosParciais = JSON.parse(localStorage.getItem("cadastroParcial"));

    if (!dadosParciais) {
      alert("Erro: dados do cadastro não encontrados.");
      return;
    }

    // 🔹 Junta tudo: primeira tela + senha
    const usuarioCompleto = {
      ...dadosParciais,
      senha: senha.value
    };

    // 🔹 Faz o POST para o JSON-server /backend
    try {
      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioCompleto)
      });

      alert("Cadastro concluído com sucesso!");
      localStorage.removeItem("cadastroParcial");
      window.location.href = "login.html";

    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar o usuário no servidor.");
    }
  });
});
