# Template padrão do site

Layout padrão do site (HTML e CSS) que será utilizado em todas as páginas com a definição de identidade visual, aspectos de responsividade e iconografia.

Explique as guias de estilo utilizadas no seu projeto.

## Design

O layout é responsivo e projetado com foco em clareza, acessibilidade e navegação simplificada. As principais áreas são:
- **Cabeçalho fixo:** com fundo Roxo Primário (#370A54).
- **Rodapé padrão:** com logo e redes sociais.
- **Área de conteúdo central:** com cartões e modais bem definidos, com bordas arredondadas e fundo claro (#F3F8F8) para destaque das informações.


## Cores
A paleta é inspirada nos tons oceânicos, com foco em contraste acessível e coerência ambiental:
- **Roxo Primário (#370A54):** cabeçalhos, textos principais.
- **Roxo Secundário (#874FAD):** botões ativos, textos e destaques.
- **Roxo Terciário (#9781A6):** links e interações.
- **Texto Claro (#7A4D98):** detalhes e descrições.
- **Texto Escuro (#090909):** textos principais.
- **Branco (#FFFFFF):** cartões e formulários.
- **Botão Desativado (#B2B2B2):** estados inativos.

## Tipografia
A fonte principal utilizada no projeto é Poppins, por ser uma tipografia moderna, legível e versátil.

| Função                 | Fonte     | Peso     | Tamanho aproximado |
| ---------------------- | --------- | ---------| ------------------ |
| Título da página       | Open-Sans | Bold     | 20–24px            |
| Títulos de seção       | Open-Sans | SemiBold | 18–20px            |
| Rótulos de componentes | Open-Sans | Medium   | 14–16px            |
| Corpo do texto         | Open-Sans | Regular  | 14–16px    

### Padronização de Botões
- **Primários:** fundo Azul Primário, texto branco, cantos arredondados.
- **Secundários:** fundo Azul Secundário ou tom neutro (#9B99A4).
- **Desativados:** cor #B2B2B2, texto branco.
- **Padding:** entre 0.4rem e 1rem.

## Iconografia



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
