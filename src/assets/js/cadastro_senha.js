async function validar() {
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  // 1. Validações de Senha
  if (senha === "" || confirmarSenha === "") {
    alert("Por favor, preencha os campos de senha.");
    return;
  }

  if (senha.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  // 2. Recuperar os dados da tela anterior
  // O JSON.parse converte o texto do localStorage de volta para um Objeto JavaScript
  const cadastroParcial = JSON.parse(localStorage.getItem("cadastroParcial"));

  if (!cadastroParcial) {
    alert("Erro: Nenhum dado de cadastro encontrado. Comece novamente.");
    window.location.href = "cadastro_completo.html"; // Manda voltar se não tiver dados
    return;
  }

  // 3. Montar o Usuário Completo
  // O operador ... (spread) pega tudo que estava no cadastroParcial e joga aqui dentro
  const usuarioCompleto = {
    ...cadastroParcial, 
    senha: senha // Adiciona a senha ao objeto
  };

  try {
    // 4. Enviar para o Banco de Dados (JSON Server)
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioCompleto)
    });

    if (response.ok) {
      alert("Cadastro finalizado com sucesso! Você já pode fazer login.");
      
      // Limpa os dados temporários do navegador para segurança
      localStorage.removeItem("cadastroParcial");
      
      // Redireciona para o login ou home
      window.location.href = "login.html"; 
    } else {
      alert("Erro ao salvar o usuário. Tente novamente.");
    }

  } catch (error) {
    console.error("Erro:", error);
    alert("Erro de conexão com o servidor.");
  }
}