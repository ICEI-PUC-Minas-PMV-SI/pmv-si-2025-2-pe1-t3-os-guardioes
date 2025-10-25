# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| O sistema deve exibir uma tela inicial com as opções “Criar uma conta” e “Entrar”, sendo o primeiro contato do usuário com o aplicativo. | Filipe Lima | index.html |
|RF-002| O sistema deve permitir que o usuário faça login informando nome e senha, com a opção de recuperar a senha caso a tenha esquecido. | Filipe Lima | login.html |
|RF-003| O sistema deve permitir que o usuário recupere sua senha informando o e-mail cadastrado. | Filipe Lima | esqueceu_senha.html |
|RF-004| O sistema deve permitir o cadastro simplificado do usuário, com campos de informações pessoais e endereço, além de opções para aceitar políticas de privacidade e receber novidades por e-mail. | Filipe Lima | cadastro_simplificado.html |
|RF-005| O sistema deve permitir que o usuário complete o cadastro criando uma senha e informando o sexo e a categoria (morador ou comerciante). | Filipe Lima | cadastro_completo..html |
|RF-006| Descrição | Claire H. | home.html |
|RF-007| Descrição | Claire H. | occurrences.html |
|RF-008| Descrição | Claire H. | occurrences_reports.html |
|RF-009| Descrição | Claire H. | info.html |
|RF-0010| Descrição | Claire H. | profile.html |
|RF-0011| Descrição | Claire H. | politics.html |
|RF-0012| Descrição | Daniel Leâo | dashboard.html |

## Descrição das estruturas:

## Login
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| login.html     | Formulário de autenticação  | Tela de login do usuário        |                                                |
| Nome           | Texto             | Nome do usuário cadastrado                | Yude                                          |
| Senha       | Texto (senha)        | Senha do usuário para acesso ao sistema| ******** |
| Link “Esqueceu sua senha?”  | Link  | Redireciona o usuário para a página de recuperação de senha | esqueceu_senha.html         |

## Esqueceu Senha
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| esqueceu_senha.html| Formulário de recuperação| Tela para o usuário redefinir sua senha| |
| E-mail           | Texto              | Endereço de e-mail cadastrado para envio do link de recuperação| Yude@gmail.com      |
| Botão “Enviar link de recuperação”           | Botão              | Envia solicitação de redefinição de senha|                                        |

## Cadastro Simplificado
| Nome                         | Tipo                                    | Descrição                                           | Exemplo                                           |
| ---------------------------- | --------------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| `cadastro_simplificado.html` | Formulário de dados pessoais e endereço | Etapa inicial de criação de conta                   | —                                                 |
| Nome                         | Texto                                   | Nome completo do usuário                            | Yude                                     |
| E-mail                       | Texto                                   | E-mail do usuário                                   | Yude@gmail.com |
| CPF                          | Texto (número)                          | Cadastro de Pessoa Física                           | 123.456.789-00                                    |
| Celular                      | Texto                                   | Número de celular do usuário                        | 4002-8922                                   |
| Idade                        | Número (inteiro)                        | Idade do usuário                                    | 28                                                |
| Rua                          | Texto                                   | Nome da rua                                         | Rua das Acácias                                   |
| Número                       | Texto                                   | Número do endereço                                  | 123                                               |
| Complemento                  | Texto                                   | Detalhes adicionais do endereço                     | Apto 202                                          |
| Bairro                       | Texto                                   | Bairro onde o usuário mora                          | Floresta                                          |
| Cidade                       | Texto                                   | Cidade do usuário                                   | Belo Horizonte                                    |
| CEP                          | Texto (número)                          | Código de endereçamento postal                      | 30150-230                                         |
| UF                           | Texto                                   | Estado do usuário                                   | MG                                                |
| Aceitar políticas            | Booleano (Sim/Não)                      | Confirmação de leitura das políticas de privacidade | Sim                                               |
| Receber novidades            | Booleano (Sim/Não)                      | Preferência de recebimento de e-mails               | Sim                                               |
| Botão “Salvar”               | Botão                                   | Salva os dados e avança para o cadastro completo    | —                                                 |


## Cadastro Completo
| Nome                     | Tipo                                  | Descrição                                       | Exemplo   |
| ------------------------ | ------------------------------------- | ----------------------------------------------- | --------- |
| `cadastro_completo.html` | Formulário de finalização do cadastro | Etapa final de criação da conta                 | —         |
| Sexo                     | Seleção                               | Sexo do usuário                                 | Masculino |
| Categoria                | Seleção                               | Tipo de usuário                                 | Morador   |
| Senha                    | Texto (senha)                         | Senha criada pelo usuário (mínimo 8 caracteres) | ********  |
| Confirmação              | Texto (senha)                         | Confirmação da senha digitada                   | ********  |
| Botão “Criar conta”      | Botão                                 | Finaliza o cadastro e cria a conta              | —         |


## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |

## Modelo
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |
| Nome           | Tipo              | Descrição                                 | Exemplo                                        |






