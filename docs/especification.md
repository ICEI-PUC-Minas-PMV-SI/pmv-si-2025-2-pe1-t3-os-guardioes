# Especificações do Projeto

Esta seção tem como objetivo detalhar as especificações gerais do projeto de uma plataforma digital voltada à segurança comunitária em bairros de Belo Horizonte com alta vulnerabilidade à criminalidade.

Para isso, utilizamos as seguintes técnicas e ferramentas:

- Mapa de Personas: representação de usuários típicos com base em entrevistas, dados e comportamento esperado.

- Histórias de Usuário: definição dos desejos, necessidades e funcionalidades esperadas da plataforma, a partir da perspectiva das personas.

- Requisitos Funcionais e Não Funcionais: definição técnica do escopo do sistema.

- Levantamento de Restrições: identificação de limitações impostas ao projeto.

- Planejamento estratégico: atraves do miro.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

Érica tem 39 anos, é esteticista e mora no bairro Guarani, em Belo Horizonte.
Conhecida pelos vizinhos por ser comunicativa e prestativa, Érica gosta de ir à praça para conversar, caminhar e cuidar da saúde. Usa bastante o WhatsApp e redes sociais para manter contato com amigos e clientes. Apesar de gostar da convivência com a comunidade, já teve o celular roubado durante um passeio com o filho, o que a deixou mais preocupada com a segurança do bairro. Seu sonho é abrir o próprio negócio, mas acredita que precisa de um ambiente mais seguro para isso. Ela procura uma solução que a ajude a se manter informada sobre o que acontece na região e que facilite o diálogo com outros moradores.

Ana é autônoma, vive na periferia de Belo Horizonte e sente-se insegura ao andar sozinha pelas ruas.
Ela se preocupa com a segurança do bairro e gostaria de se manter atualizada sobre os acontecimentos da região. Ana sente falta de apoio por parte das autoridades e muitas vezes não sabe a quem recorrer em casos de violência ou ameaças. Seu sonho é viver com mais tranquilidade, podendo circular pelo bairro sem medo. Está em busca de uma ferramenta simples e acessível, que permita receber alertas de segurança e que a conecte com os vizinhos para formar uma rede de proteção comunitária.

Ana é autônoma, vive na periferia de Belo Horizonte e sente-se insegura ao andar sozinha pelas ruas.
Ela se preocupa com a segurança do bairro e gostaria de se manter atualizada sobre os acontecimentos da região. Ana sente falta de apoio por parte das autoridades e muitas vezes não sabe a quem recorrer em casos de violência ou ameaças. Seu sonho é viver com mais tranquilidade, podendo circular pelo bairro sem medo. Está em busca de uma ferramenta simples e acessível, que permita receber alertas de segurança e que a conecte com os vizinhos para formar uma rede de proteção comunitária.

João é dono de uma pizzaria e tem enfrentado dificuldades para manter seu negócio funcionando à noite.
Já foi vítima de tentativa de roubo durante entregas e percebe que muitos clientes evitam sair de casa após determinado horário por medo da criminalidade. João quer garantir a segurança dos entregadores e dos consumidores, e acredita que a união entre comerciantes pode ajudar a combater a violência local. Seu sonho é abrir uma segunda unidade da pizzaria, mas ele sabe que precisa de um ambiente mais seguro para expandir. Ele procura uma solução prática, que conecte os lojistas e ofereça um canal de alerta rápido e confiável.

----------------------------------------------------------------------------------------------------
Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Morador | Registrar uma aividade suspeita           | Para ajudar a proteger meu bairro             |
|Comerciante | Registrar situações de risco          | Para ajudar a proteger os negócios e meus clientes            |
|Policial       | Gerar mapa de calor do bairro                 | Intensificar o patrulhamento |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |
|Moderador       | Investigar possíveis denúncias falsas            | Aumentar confiabilidade da ferramenta |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | ALTA |  
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês   | MÉDIA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
