document.getElementById('formSenha').addEventListener('submit', async function(event) {
  event.preventDefault();

  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha !== confirmarSenha) {
    alert('As senhas não conferem!');
    return;
  }

  // Recupera o usuário temporário do localStorage
  const usuarioTemp = JSON.parse(localStorage.getItem('usuarioTemp'));

  if (!usuarioTemp) {
    alert('Erro: dados do usuário não encontrados.');
    return;
  }

  // Adiciona a senha ao objeto
  usuarioTemp.senha = senha;

  // Faz o POST para o JSON Server
  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioTemp)
    });

    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      localStorage.removeItem('usuarioTemp');
      window.location.href = 'login.html'; // ou outra tela de destino
    } else {
      alert('Erro ao salvar usuário.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Falha na conexão com o servidor.');
  }
});
