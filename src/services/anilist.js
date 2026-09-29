import axios from 'axios';

// Endereço oficial da API GraphQL da AniList
const ANILIST_URL = 'https://graphql.anilist.co';

// Query simples para testar se a API está respondendo.
// Vamos buscar 10 animes populares.
const ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        isAdult: false
        sort: POPULARITY_DESC
      ) {
        id

        title {
          romaji
          english
        }

        coverImage {
          large
        }

        averageScore

        episodes

        genres
      }
    }
  }
`;

export async function getAnimeList() {
  const variables = {
    page: 1,
    perPage: 10,
  };

  const response = await axios.post(ANILIST_URL, {
    query: ANIME_QUERY,
    variables,
  });

  return response.data.data.Page.media;
}