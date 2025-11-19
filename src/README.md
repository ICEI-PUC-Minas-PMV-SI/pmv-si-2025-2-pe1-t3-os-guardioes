# Como Rodar o JSON Server no Projeto Os Guardiões
Este guia atualizado explica como configurar e executar os JSON Servers usando sua estrutura de diretórios atual.

## Pré-requisitos
Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- [Git](https://git-scm.com/)

> **Dica:** Para conferir se já possui, rode no terminal:
> ```bash
> node -v
> npm -v
> git --version
> ```

## Passo 1: Clonar o Repositório
No terminal, execute:

> ```bash
> git clone https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe1-t4-blue-guardians.git
> ```

## Passo 2: Instalar Dependências
Execute no terminal (na raiz do projeto):

```bash
npm install
```
## Passo 3: Iniciar os Servidores
Execute o comando dentro da pasta api (C:\source\assets\api):

```bash
npm run start
```

Isso iniciará:
Servidor principal na porta 3001 com db.json

## Comandos Git Úteis
Para atualizar seu repositório local com a versão mais recente do GitHub:

> ```bash
> git pull origin main
> ```

Para enviar suas alterações:

> ```bash
> git add .
> git commit -m "Descrição do que foi alterado"
> git push origin main
> ```

