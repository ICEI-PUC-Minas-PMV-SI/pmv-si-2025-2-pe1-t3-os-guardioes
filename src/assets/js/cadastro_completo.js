document.addEventListener("DOMContentLoaded", () => {
  const Pessoa = document.getElementById("tipoPessoa");
  const cpf    = document.getElementById("cpf");
  const cnpj   = document.getElementById("cnpj");
  const sexo   = document.getElementById("sexo");
  const idade  = document.getElementById("idade");
  const cep    = document.getElementById("cep");
  const numero = document.getElementById("numero");

  // 🔹 Função para alternar campos conforme tipo de pessoa
  function atualizarCamposPessoa() {
    if (Pessoa.value === "fisica") {
      cpf.style.display   = "inline-block";
      cpf.required        = true;
      cnpj.style.display  = "none";
      cnpj.required       = false;
      sexo.style.display  = "inline-block";
      idade.style.display = "inline-block";
    } else if (Pessoa.value === "juridica") {
      cnpj.style.display  = "inline-block";
      cnpj.required       = true;
      cpf.style.display   = "none";
      cpf.required        = false;
      sexo.style.display  = "none";
      idade.style.display = "none";
    } else {
      cpf.style.display   = "none";
      cnpj.style.display  = "none";
      sexo.style.display  = "none";
      idade.style.display = "none";
    }
  }

  // 🔹 Executar uma vez ao carregar a página (corrige o bug do “ficar travado”)
  atualizarCamposPessoa();

  // 🔹 Atualizar quando o usuário mudar o tipo
  Pessoa.addEventListener("change", atualizarCamposPessoa);

  // 🔹 Aplicar máscaras
  function aplicarMascara(input, tipo) {
    let valor = input.value.replace(/\D/g, "");

    if (tipo === "cpf") {
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (tipo === "cnpj") {
      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }

    if (tipo === "celular") {
      valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
      valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    if (tipo === "cep") {
      valor = valor.replace(/(\d{5})(\d{3})$/, "$1-$2");
    }

    input.value = valor;
  }

  cpf.addEventListener("input", (e) => aplicarMascara(e.target, "cpf"));
  cnpj.addEventListener("input", (e) => aplicarMascara(e.target, "cnpj"));
  document.getElementById("celular").addEventListener("input", (e) => aplicarMascara(e.target, "celular"));
  cep.addEventListener("input", (e) => aplicarMascara(e.target, "cep"));

  // 🔹 Permitir apenas números em idade e número
  ["idade", "numero"].forEach(id => {
    document.getElementById(id).addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  });

  // 🔹 Consultar endereço pelo CEP (ViaCEP)
  cep.addEventListener("blur", async () => {
    const cepLimpo = cep.value.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return; // só consulta se tiver 8 dígitos

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("uf").value = data.uf || "";

      // 🔸 Focar automaticamente no campo número
      numero.focus();

    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao consultar o CEP. Verifique sua conexão.");
    }
  });
});
