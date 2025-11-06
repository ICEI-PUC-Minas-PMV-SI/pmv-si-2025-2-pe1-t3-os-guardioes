const API_URL = "http://localhost:3000/usuarios";

async function cadastrarCompleto(event) {
  event.preventDefault();

  const tipoPessoa = document.getElementById("tipoPessoa").value;
  const nome       = document.querySelector('input[placeholder="Nome"]').value.trim();
  const email      = document.querySelector('input[placeholder="E-mail"]').value.trim();
  const sexo       = document.getElementById("sexo").value;
  const cpf        = document.getElementById("cpf").value;
  const cnpj       = document.getElementById("cnpj").value;
  const celular    = document.getElementById("celular").value;
  const idade      = document.getElementById("idade").value;
  const cep        = document.getElementById("cep").value;
  const rua        = document.getElementById("rua").value;
  const bairro     = document.getElementById("bairro").value;
  const numero     = document.getElementById("numero").value;
  const cidade     = document.getElementById("cidade").value;
  const uf         = document.getElementById("uf").value;

  const user = {
    tipoPessoa,
    nome,
    email,
    sexo: tipoPessoa === "fisica" ? sexo : "",
    cpf: tipoPessoa === "fisica" ? cpf : "",
    cnpj: tipoPessoa === "juridica" ? cnpj : "",
    celular,
    idade: tipoPessoa === "fisica" ? idade : "",
    cep,
    rua,
    bairro,
    numero,
    cidade,
    uf,
    senha: "" // será preenchida na próxima etapa
  };

  // Salvar os dados no localStorage até criar a senha
  localStorage.setItem("novoUsuario", JSON.stringify(user));

  window.location.href = "cadastro_simplificado.html";
}
