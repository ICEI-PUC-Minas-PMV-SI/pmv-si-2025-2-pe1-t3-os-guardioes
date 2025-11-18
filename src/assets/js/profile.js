const API_URL = "http://localhost:3000/usuarios";

function mostrarCamposFisica(tipo) {
    const dadosFisica = document.getElementById("dadosFisica");

    if (tipo === "fisica") {
        dadosFisica.style.display = "block";
    } else {
        dadosFisica.style.display = "none";
        document.getElementById("idade").value = "";
        document.getElementById("sexo").value = "";
    }
}

document.getElementById("tipoPessoa").addEventListener("change", (e) => {
    mostrarCamposFisica(e.target.value);
});

async function carregarPerfil() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Usuário não está logado.");
        window.location.href = "login.html";
        return;
    }

    try {
        const resp = await fetch(`${API_URL}/${userId}`);
        if (!resp.ok) throw new Error("Erro ao buscar usuário");

        const usuario = await resp.json();

        document.getElementById("nomeExibicao").innerText = usuario.nome || "Nome";
        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("email").value = usuario.email || "";
        document.getElementById("tipoPessoa").value = usuario.tipoPessoa || "fisica";
        document.getElementById("cpfCnpj").value = usuario.cpf || usuario.cnpj || "";
        document.getElementById("celular").value = usuario.celular || "";

        document.getElementById("rua").value = usuario.rua || "";
        document.getElementById("numero").value = usuario.numero || "";
        document.getElementById("bairro").value = usuario.bairro || "";
        document.getElementById("cidade").value = usuario.cidade || "";
        document.getElementById("uf").value = usuario.uf || "";
        document.getElementById("cep").value = usuario.cep || "";
        document.getElementById("complemento").value = usuario.complemento || "";

        document.getElementById("notificacoes").checked = usuario.receberNovidades || false;

        // CAMPOS PESSOA FÍSICA
        document.getElementById("idade").value = usuario.idade || "";
        document.getElementById("sexo").value = usuario.sexo || "";

        // mostra/esconde automaticamente
        mostrarCamposFisica(usuario.tipoPessoa);

    } catch (e) {
        console.error(e);
        alert("Erro ao carregar perfil.");
    }
}

async function salvarPerfil() {
    const userId = localStorage.getItem("userId");

    const tipoPessoa = document.getElementById("tipoPessoa").value;

    const payload = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        tipoPessoa,
        cpf: tipoPessoa === "fisica" ? document.getElementById("cpfCnpj").value : "",
        cnpj: tipoPessoa === "juridica" ? document.getElementById("cpfCnpj").value : "",
        celular: document.getElementById("celular").value,

        idade: tipoPessoa === "fisica" ? document.getElementById("idade").value : null,
        sexo: tipoPessoa === "fisica" ? document.getElementById("sexo").value : null,

        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        uf: document.getElementById("uf").value,
        cep: document.getElementById("cep").value,
        complemento: document.getElementById("complemento").value,

        receberNovidades: document.getElementById("notificacoes").checked,
    };

    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (novaSenha || confirmarSenha) {
        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }
        payload.senha = novaSenha;
    }

    try {
        const resp = await fetch(`${API_URL}/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!resp.ok) throw new Error("Erro ao salvar");

        alert("Alterações salvas com sucesso!");

    } catch (e) {
        console.error(e);
        alert("Erro ao salvar alterações.");
    }
}

document.getElementById("btnSalvar").addEventListener("click", salvarPerfil);

// Carregar perfil ao abrir
carregarPerfil();
