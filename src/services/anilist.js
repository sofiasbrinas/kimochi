import axios from 'axios';

const ANILIST_URL = 'https://graphql.anilist.co';

const ANIME_QUERY = `
  query (
    $page: Int
    $perPage: Int
    $genres: [String]
    $tags: [String]
    $format: MediaFormat
    $status: MediaStatus
    $episodeLesser: Int
    $episodeGreater: Int
    $durationLesser: Int
    $durationGreater: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        isAdult: false
        genre_in: $genres
        tag_in: $tags
        format: $format
        status: $status
        episodes_lesser: $episodeLesser
        episodes_greater: $episodeGreater
        duration_lesser: $durationLesser
        duration_greater: $durationGreater
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

export async function getAnimeByMood(mood, filters) {
  // Combina os gêneros definidos pelo mood com o gênero
  // adicional escolhido manualmente pelo usuário.
  const combinedGenres = [
    ...mood.genres,
    ...(filters.genre ? [filters.genre] : []),
  ];

  // Limites usados para filtrar pela quantidade de episódios.
  let episodeLesser;
  let episodeGreater;

  if (filters.episodeRange === 'SHORT') {
    episodeLesser = 13;
  }

  if (filters.episodeRange === 'MEDIUM') {
    episodeGreater = 12;
    episodeLesser = 27;
  }

  if (filters.episodeRange === 'LONG') {
    episodeGreater = 26;
  }

  // Limites usados para filtrar pela duração de cada episódio.
  let durationLesser;
  let durationGreater;

  if (filters.durationRange === 'SHORT') {
    durationLesser = 15;
  }

  if (filters.durationRange === 'STANDARD') {
    durationGreater = 14;
    durationLesser = 31;
  }

  if (filters.durationRange === 'LONG') {
    durationGreater = 30;
  }

  const variables = {
    page: 1,
    perPage: 12,

    genres:
      combinedGenres.length > 0
        ? combinedGenres
        : undefined,

    tags:
      mood.tags.length > 0
        ? mood.tags
        : undefined,

    format: filters.format || undefined,
    status: filters.status || undefined,

    episodeLesser,
    episodeGreater,

    durationLesser,
    durationGreater,
  };

  const response = await axios.post(ANILIST_URL, {
    query: ANIME_QUERY,
    variables,
  });

  return response.data.data.Page.media;
}