# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.

**Caso de Teste** | **CT01 – Cadastro de Usuário**
 :--------------: | ------------
**Procedimento**  | 1) Clique em “Cadastrar” <br> 2) Preencha nome, email, senha e tipo de usuário <br> 3) Clique no botão “Criar conta” <br>
**Requisitos associados** | RF-001
**Resultado esperado** | Usuário cadastrado com sucesso
**Dados de entrada** | Nome: João Silva, Email: joao@email.com, Senha: 123
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Login  de usuário**
 :--------------: | ------------
**Procedimento**  | 1) Clique em “Entrar” <br> 2) Preencha email e senha <br> 3) Clique no botão “Entrar” <br>
**Requisitos associados** | RF-002
**Resultado esperado** | Usuário autenticado e redirecionado para a página inicial
**Dados de entrada** | Email: joao@email.com, Senha: 123
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT03 - Cadastrar ocorrência**
 :--------------: | ------------
**Procedimento**  | 1) Realize login <br> 2) Acesse a seção “Ocorrências” <br> 3) Clique em “Registrar Ocorrência” <br> 4) Preencha os campos (bairro, tipo, data, imagem) <br> 5) Clique em “Salvar” <br>
**Requisitos associados** | RF-003
**Resultado esperado** | Ocorrência cadastrada com sucesso
**Dados de entrada** | Barro: Jardim Belvedere, Data: 17/11/2025, Hora: 11:46,  Tipo: Assalto
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT04 - Reportar Denúncia**
 :--------------: | ------------
**Procedimento**  | 1) Realize login <br> 2) Acesse a seção “Ocorrências” <br> 3) Clique nos 3 pontos no item que desejar <br> 4) Clique em "Denunciar" <br> 5) Informe a descrição (motivo) <br> 6) Clique em “Enviar” <br>
**Requisitos associados** | RF-004
**Resultado esperado** | Denúncia registrada com sucesso
**Dados de entrada** | Descrição: A ocorrência era falsa, e esse fato não aconteceu.
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT05 - Confirmar ocorrência**
 :--------------: | ------------
**Procedimento**  | 1) Realize login <br> 2) Acesse a seção “Ocorrências” <br> 3) Clique nos 3 pontos no item que desejar <br> 4) Clique em "Confirmar" <br>
**Requisitos associados** | RF-005
**Resultado esperado** | Ocorrência confirmada
**Dados de entrada** | 
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT06 - Cadastrar Atividade Suspeita**
 :--------------: | ------------
**Procedimento**  | 1) Realize login <br> 2) Acessar “Gerenciamento de informações criticas” <br> 3)Clicar em “Novo Registro” <br> 4) Preencher tipo (veículo/pessoa), descrição, local e anexar foto <br> 5) PClicar em “Salvar” <br>
**Requisitos associados** | RF-006
**Resultado esperado** | Registro de atividade suspeita salvo
**Dados de entrada** | Tipo: Veículo suspeito, Descrição: Carro rondando a rua repetidamente, Foto: carro_suspeito.png
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT07 - Analisar Ocorrências**
 :--------------: | ------------
**Procedimento**  | 1) Realize login <br> 2) Acessar “Análise de Ocorrências” <br> 3) Selecionar uma ocorrência <br> 4) Clicar em “Excluir” <br>
**Requisitos associados** | RF-007
**Resultado esperado** | Ocorrência excluída com sucesso
**Dados de entrada** | Ocorrência ID 215
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT08 - Ranking de Bairros (Ocorrências)**
 :--------------: | ------------
**Procedimento**  | 1) Realize login <br> 2) Acessar “Ranking de Bairros” <br> 3) Visualizar ranking <br> 
**Requisitos associados** | RF-008
**Resultado esperado** | O sistema deve exibir corretamente o ranking dos bairros baseado nas ocorrências armazenadas, ordenando conforme os níveis de segurança. 
**Dados de entrada** | 
**Resultado obtido** | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Criar conta parte 1*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/u/s!AhD2JqpOUvJChapRtRSQ9vPzbNLwGA?e=mxZs6t| 

|*Caso de Teste*                                 |*CT02 - Criar conta parte 2*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é um novo morador e deseja criar uma conta no aplicativo Os Guardiões. Realize seu cadastro com nome, email e senha. |
| 2             | Você acabou de se mudar para um bairro e deseja registrar uma ocorrência de segurança. Registre uma 
ocorrência informando tipo, bairro, data e imagem. |
| 3             | Você encontrou uma ocorrência suspeita no aplicativo e deseja denunciá-la. Acesse a ocorrência e envie 
uma denúncia informando o motivo. |
| 4             | Você deseja consultar quais bairros são mais seguros e mais perigosos na sua cidade. Acesse o Ranking de Bairros e visualize o nível de segurança. |

## Registro de Testes de Usabilidade

Cenário 1: Você é um novo morador e deseja criar uma conta no aplicativo Os Guardiões. Realize seu cadastro com nome, email e senha.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: "O cadastro é simples e direto." 
    "Achei tudo fácil de entender."


Cenário 2: Você acabou de se mudar para um bairro e deseja registrar uma ocorrência de segurança. Registre uma 
ocorrência informando tipo, bairro, data e imagem. 

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: "A imagem demora um pouquinho para anexar."

Cenário 3: Você encontrou uma ocorrência suspeita no aplicativo e deseja denunciá-la. Acesse a ocorrência e envie 
uma denúncia informando o motivo.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 18.64 segundos                          |
| 3       | SIM             | 4                    | 25.39 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.33                | 22.04 segundos                       |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 7.90 segundos |


    Comentários dos usuários: “Achei fácil denunciar.”

Cenário 4: Você deseja consultar quais bairros são mais seguros e mais perigosos na sua cidade. Acesse o Ranking de Bairros e visualize o nível de segurança.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 29.14 segundos                          |
| 2       | SIM             | 5                    | 34.88 segundos                          |
| 3       | SIM             | 5                    | 27.03 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.33                | 30.35 segundos                       |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 10.44 segundos |


    Comentários dos usuários: “Gostei do gráfico, bem claro.” 
    “Fácil de entender o bairro mais seguro e o mais perigoso.”

## Avaliação dos Testes de Usabilidade

Os resultados demonstram que a aplicação apresenta excelente taxa de sucesso, visto que todos os usuários conseguiram concluir todos os cenários com êxito.

A satisfação subjetiva foi consistentemente alta, variando entre 4 (Bom) e 5 (Ótimo) em todos os testes, indicando boa aceitação e facilidade de uso da plataforma.

Houve diferença entre o tempo médio dos usuários e o tempo do especialista, o que é esperado, já que o desenvolvedor possui conhecimento prévio da interface e da navegação.

Os comentários indicam pontos de melhoria:
  maior visibilidade de botões (como o menu de opções nas ocorrências);
  mais opções de filtros e autocomplete;
  aprimoramento na fluidez do upload de imagens.



