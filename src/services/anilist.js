import axios from 'axios';

// Endpoint oficial da API GraphQL da AniList.
const ANILIST_URL = 'https://graphql.anilist.co';

// A query recebe gêneros e tags dinamicamente.
//
// Isso permite que diferentes moods utilizem
// diferentes combinações de filtros.
const ANIME_QUERY = `
  query (
    $page: Int
    $perPage: Int
    $genres: [String]
    $tags: [String]
    $format: MediaFormat
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        isAdult: false
        genre_in: $genres
        tag_in: $tags
        format: $format
        sort: SCORE_DESC
      ) {
        id

        title {
          romaji
          english
        }

        coverImage {
          large
          color
        }

        bannerImage

        description

        genres

        averageScore

        episodes

        duration

        seasonYear

        status
      }
    }
  }
`;

// Busca animes utilizando os filtros definidos
// no mood selecionado pelo usuário.
export async function getAnimeByMood(mood, filters) {
  const variables = {
    page: 1,
    perPage: 12,

    // Se não houver gêneros ou tags,
    // enviamos undefined em vez de um array vazio.
    genres: mood.genres.length > 0 ? mood.genres : undefined,
    tags: mood.tags.length > 0 ? mood.tags : undefined,
    format: filters.format || undefined,
  };

  const response = await axios.post(ANILIST_URL, {
    query: ANIME_QUERY,
    variables,
  });

  return response.data.data.Page.media;
}