const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  try {
    const res = await fetch("http://localhost:3000/usuarios");
    if (!res.ok) throw new Error("Falha na requisição");

    const usuarios = await res.json();
    console.log("Usuários carregados:", usuarios);

    const usuario = usuarios.find(u => u.email === nome && u.senha === senha);

    if (usuario) {
      localStorage.setItem("usuarioLogado", usuario.id);
      window.location.href = "home.html";
    } else {
      alert("Nome ou senha incorretos.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o servidor.");
  }
});
