# Template padrão do site

Layout padrão do site (HTML e CSS) que será utilizado em todas as páginas com a definição de identidade visual, aspectos de responsividade e iconografia.

Explique as guias de estilo utilizadas no seu projeto.

## Design

O layout é responsivo e projetado com foco em clareza, acessibilidade e navegação simplificada. As principais áreas são:
- **Cabeçalho fixo:** com fundo Roxo Primário (#370A54).
- **Rodapé padrão:** com logo e redes sociais.
- **Área de conteúdo central:** com cartões e modais bem definidos, com bordas arredondadas e fundo claro (#F3F8F8) para destaque das informações.


## Cores
A paleta é inspirada nos tons de roxo, com foco em contraste acessível e coerência entre as cores:
- **Roxo Primário (#370A54):** cabeçalhos, textos principais.
- **Roxo Secundário (#874FAD):** botões ativos, textos e destaques.
- **Roxo Terciário (#9781A6):** links e interações.
- **Texto Claro (#7A4D98):** detalhes e descrições.
- **Texto Escuro (#090909):** textos principais.
- **Branco (#FFFFFF):** cartões e formulários.
- **Botão Desativado (#B2B2B2):** estados inativos.

## Tipografia
A fonte principal utilizada no projeto é Open-Sans, por ser uma tipografia moderna, legível e versátil.

| Função                 | Fonte     | Peso     | Tamanho aproximado |
| ---------------------- | --------- | ---------| ------------------ |
| Título da página       | Poppins   | Bold     | 20–24px            |
| Títulos de seção       | Poppins   | SemiBold | 18–20px            |
| Rótulos de componentes | Poppins   | Medium   | 14–16px            |
| Corpo do texto         | Poppins   | Regular  | 14–16px    

### Padronização de Botões
- **Primários:** fundo Roxo Secundário, texto branco, cantos arredondados.
- **Secundários:** fundo Roxo Terciário ou tom neutro (#9B99A4).
- **Desativados:** cor #B2B2B2, texto branco.
- **Padding:** entre 0.4rem e 1rem.

## Iconografia
<img width="32" height="32" alt="facebook" src="https://github.com/user-attachments/assets/a152ed7f-24bd-4476-9b3b-c9d541a34ec2" />
<img width="32" height="32" alt="twitter" src="https://github.com/user-attachments/assets/d8efa9a5-4dd9-4dec-a83a-3715a1eb5077" />
<img width="32" height="32" alt="instagram" src="https://github.com/user-attachments/assets/84eb76d6-3017-4efe-9ce3-b343c72b49b2" />
<img width="32" height="32" alt="Confirmacao_2" src="https://github.com/user-attachments/assets/d21588fe-7d7d-41c8-934a-405859e2fbe3" />
<img width="32" height="32" alt="icons8-notícias-falsas-100" src="https://github.com/user-attachments/assets/4765a746-bd25-4815-b1aa-c17ccb16bae6" />
<img width="32" height="32" alt="icons8-policial-masculino-100" src="https://github.com/user-attachments/assets/70958f97-0cee-44dc-9f41-f5ce92fa7aaa" />
<img width="32" height="32" alt="icons8-transporte-100" src="https://github.com/user-attachments/assets/4f8dee15-97b7-484e-a2cd-c8de33ffee01" />
<img width="32" height="32" alt="Logo" src="https://github.com/user-attachments/assets/6f4f3f27-0121-4d6c-ab24-28aee6b9dd7f" />

## Componentes
- **Mapa de Pontos de Risco:** Local, nome, status, botão de detalhes.
- **Cards de Ocorrências:** título, local, data, descrição, fotos.
- **Formulários responsivos:** com labels flutuantes e validação de campos.
- **Botões de ação:** com hierarquia visual clara.
- **Modais:** sobreposição com fundo opaco e animação suave.
- **Rodapé:** com layout flexível e links úteis.

## Responsividade
- O site é otimizado para telas pequenas (até 768px), médias (768–1024px) e grandes (acima de 1024px).
- Menus se adaptam ao rodapé em dispositivos móveis.
- Cards se reorganizam em colunas ou blocos.
Exemplo de centralização:
  ```css
  main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
  ````
