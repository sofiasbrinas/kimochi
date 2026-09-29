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
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        isAdult: false
        genre_in: $genres
        tag_in: $tags
        format: $format
        status: $status
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
  const combinedGenres = [
    ...mood.genres,
    ...(filters.genre ? [filters.genre] : []),
  ];

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
  };

  const response = await axios.post(ANILIST_URL, {
    query: ANIME_QUERY,
    variables,
  });

  return response.data.data.Page.media;
}