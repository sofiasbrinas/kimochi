# Kimochi

Kimochi é uma aplicação web de descoberta de animes baseada no sentimento que o usuário deseja experimentar.

Em vez de começar a busca por título, a aplicação propõe uma pergunta:

> O que você quer sentir?

A partir da escolha de um mood, o Kimochi consulta a API pública da AniList e apresenta uma recomendação principal acompanhada de outras opções relacionadas.

## Objetivo

O projeto foi desenvolvido como parte de um desafio de consumo de API pública utilizando React e Vite.

Além dos requisitos técnicos, o projeto também explora conceitos de UX/UI aplicados a produtos de entretenimento e descoberta de conteúdo.

## Funcionalidades

- Seleção de anime por mood
- Integração com a AniList GraphQL API
- Filtros por formato
- Filtros por status
- Filtros por gênero
- Filtros por quantidade de episódios
- Filtros por duração dos episódios
- Anime em destaque
- Grid de recomendações
- Modal com detalhes do anime
- Sinopse expansível
- Estados de carregamento
- Estado de erro
- Estado sem resultados
- Interface responsiva
- Navegação adaptada para desktop, tablet e mobile

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

## API

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
├── App.jsx
└── main.jsx
```

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

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para testar o build localmente:

```bash
npm run preview
```

## Design e UX

A interface foi construída com foco em:

- redução da fadiga de decisão
- hierarquia visual
- feedback de carregamento e erro
- navegação responsiva
- apresentação editorial das recomendações
- consistência entre componentes
- clareza na exploração dos resultados

A direção visual utiliza uma interface escura, minimalista e inspirada em produtos de streaming e descoberta de conteúdo.

## Tratamento de estados

A aplicação possui estados específicos para diferentes momentos da experiência.

### Loading

Exibido enquanto a aplicação aguarda a resposta da AniList.

### Empty state

Exibido quando nenhuma recomendação corresponde à combinação escolhida pelo usuário.

### Error state

Exibido quando ocorre algum problema durante a consulta à API.

Esses estados ajudam a comunicar ao usuário o que está acontecendo durante a interação com a aplicação.

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

## Responsividade

A interface possui adaptações para diferentes tamanhos de tela.

### Desktop

- navegação lateral
- grid de moods em múltiplas colunas
- painel de filtros estruturado
- quatro colunas de recomendações

### Tablet

- navegação adaptada
- redução de espaçamentos
- reorganização dos grids
- filtros reorganizados

### Mobile

- navegação compacta
- moods reorganizados
- filtros empilhados
- grid de recomendações em duas colunas
- tipografia e espaçamentos reduzidos

## Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento do projeto para:

- planejamento da arquitetura
- estudo de React
- revisão de código
- debugging
- estruturação de componentes
- sugestões de UX/UI
- revisão de responsividade
- documentação

As decisões de implementação, testes, ajustes e integração foram realizadas durante o desenvolvimento do projeto.

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

## Deploy

O projeto será publicado utilizando a Vercel.

Após o deploy, o link da aplicação poderá ser adicionado aqui:

`Em breve`

## Repositório

GitHub:

`https://github.com/sofiasbrinas/kimochi/tree/main`

## Status

Versão inicial funcional.

O projeto continua em desenvolvimento.