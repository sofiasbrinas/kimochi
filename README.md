# Kimochi

Kimochi é uma aplicação web de descoberta de animes baseada no sentimento que o usuário deseja experimentar.

Em vez de começar a busca por título, a aplicação propõe uma pergunta:

> **O que você quer sentir?**

A partir da escolha de um mood, o Kimochi consulta a API pública da AniList e apresenta uma recomendação principal acompanhada de outras opções relacionadas.

---

## Problemática

Catálogos de anime oferecem uma grande quantidade de títulos, gêneros e informações, mas essa variedade também pode tornar a escolha do que assistir cansativa.

O Kimochi parte da seguinte questão:

> Como utilizar dados de uma API pública para ajudar o usuário a encontrar animes de acordo com o tipo de experiência ou sentimento que deseja naquele momento?

A aplicação transforma dados disponibilizados pela AniList em uma experiência de descoberta baseada em moods, permitindo que o usuário refine os resultados utilizando filtros e consulte informações dos títulos recomendados.

---

## Objetivo

O projeto foi desenvolvido como parte de um desafio de consumo de API pública utilizando React + Vite.

Além dos requisitos técnicos, o projeto também explora conceitos de UX/UI aplicados a produtos de entretenimento e descoberta de conteúdo, com foco em reduzir a fadiga de decisão e tornar a busca por animes mais clara, visual e interativa.

---

## Funcionalidades

- Seleção de anime por mood
- Integração com a AniList GraphQL API
- Filtro por formato
- Filtro por status
- Filtro por gênero
- Filtro por quantidade de episódios
- Filtro por duração dos episódios
- Anime em destaque
- Grid de recomendações
- Modal com detalhes do anime
- Sinopse expansível
- Estados de carregamento
- Estado de erro
- Estado sem resultados
- Interface responsiva
- Navegação adaptada para desktop, tablet e mobile

---

## Moods disponíveis

- Conforto
- Emocional
- Engraçado
- Romântico
- Intenso
- Reflexivo
- Aventureiro
- Nostálgico

Cada mood é associado a gêneros e tags utilizados na consulta da AniList.

---

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- Axios
- Lucide React
- AniList GraphQL API
- Git
- GitHub
- Vercel

---

## API utilizada

O projeto utiliza a API GraphQL pública da AniList:

`https://graphql.anilist.co`

As consultas utilizam informações como:

- gênero
- tags
- formato
- status
- número de episódios
- duração
- avaliação média

Os resultados são atualmente ordenados pela avaliação da AniList.

---

## Estrutura do projeto

```text
src/
├── components/
│   ├── AnimeCard/
│   ├── AnimeDetails/
│   ├── AnimeGrid/
│   ├── FeaturedAnime/
│   ├── FilterPanel/
│   ├── MoodCard/
│   ├── MoodGrid/
│   ├── ResultsState/
│   └── Sidebar/
├── data/
│   └── moods.js
├── services/
│   └── anilist.js
├── styles/
│   ├── global.css
│   ├── reset.css
│   └── variables.css
├── App.css
├── App.jsx
└── main.jsx
```

---

## Como executar o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd kimochi
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação será iniciada no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para testar o build localmente:

```bash
npm run preview
```

---

## Design e UX

A interface foi construída com foco em:

- redução da fadiga de decisão
- hierarquia visual
- feedback de carregamento, erro e ausência de resultados
- navegação responsiva
- apresentação editorial das recomendações
- consistência entre componentes
- clareza na exploração dos resultados

A direção visual utiliza uma interface escura, minimalista e inspirada em produtos de streaming e descoberta de conteúdo.

---

## Tratamento de estados

A aplicação possui estados específicos para diferentes momentos da experiência.

### Loading

Exibido enquanto a aplicação aguarda a resposta da AniList.

### Empty state

Exibido quando nenhuma recomendação corresponde à combinação escolhida pelo usuário.

### Error state

Exibido quando ocorre algum problema durante a consulta à API.

Esses estados ajudam a comunicar ao usuário o que está acontecendo durante a interação com a aplicação.

---

## Sistema de recomendação atual

O Kimochi traduz cada mood em uma combinação de gêneros e tags utilizadas na consulta à AniList.

Além do mood, o usuário pode refinar a busca utilizando filtros de:

- formato
- status
- gênero
- quantidade de episódios
- duração por episódio

A AniList retorna uma lista de animes compatíveis com os critérios informados.

Atualmente, os resultados são ordenados pela avaliação média da AniList, e o primeiro item retornado é utilizado como o destaque principal da recomendação.

---

## Responsividade

A interface possui adaptações para diferentes tamanhos de tela.

### Desktop

- navegação lateral
- grid de moods em múltiplas colunas
- painel de filtros estruturado
- múltiplas colunas de recomendações

### Tablet

- navegação adaptada
- redução de espaçamentos
- reorganização dos grids
- filtros reorganizados

### Mobile

- navegação compacta
- moods reorganizados
- filtros empilhados
- grid de recomendações adaptado
- tipografia e espaçamentos reduzidos

---

## 🤖 Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto para:

- planejamento da arquitetura
- estudo de React
- revisão de código
- debugging
- estruturação de componentes
- sugestões de UX/UI
- revisão de responsividade
- documentação

### Prompt utilizado

> "Estou desenvolvendo uma aplicação React + Vite chamada Kimochi que utiliza a API GraphQL da AniList para recomendar animes de acordo com o mood selecionado pelo usuário. Quero organizar a aplicação utilizando componentes reutilizáveis e permitir que filtros como formato, gênero, quantidade de episódios e duração alterem a consulta. Explique de forma didática como organizar essa responsabilidade entre os componentes e o serviço responsável pela API."

### Objetivo do prompt

Utilizei esse prompt para compreender como separar as responsabilidades da aplicação, mantendo a interface componentizada e concentrando a lógica de comunicação com a AniList em um serviço específico.

A IA também foi utilizada para auxiliar na identificação de erros, compreender mensagens retornadas pela API e revisar decisões relacionadas à responsividade e experiência do usuário.

---

## Aprendizados

Durante o desenvolvimento do Kimochi foram praticados conceitos como:

- componentização em React
- gerenciamento de estado com `useState`
- consumo de API com Axios
- requisições GraphQL
- renderização condicional
- manipulação de arrays
- comunicação entre componentes por props
- tratamento de loading, erro e empty state
- organização de CSS por componente
- responsividade
- Git e versionamento por branches
- integração com API externa
- organização de fluxo de interface com foco em UX

---

## Próximas melhorias

Algumas evoluções planejadas para o projeto:

- sistema de favoritos com persistência
- utilização de `localStorage`
- refinamento do fluxo de recomendação
- configuração guiada antes da recomendação
- maior variedade na escolha do anime em destaque
- melhoria da lógica de matching
- filtros recolhíveis
- melhoria da hierarquia entre configuração e resultados
- refinamentos de acessibilidade
- melhorias adicionais para mobile

---

## 🌐 Deploy

A aplicação está publicada na Vercel:

**https://kimochi-chi.vercel.app/**

---

## Repositório

GitHub:

`https://github.com/sofiasbrinas/kimochi/tree/main`

---

## Status

Versão inicial funcional e publicada.

O projeto continua em desenvolvimento.