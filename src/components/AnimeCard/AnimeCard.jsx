import './AnimeCard.css';

export default function AnimeCard({ anime }) {
  const title = anime.title.english || anime.title.romaji;

  return (
    <article className='anime-card'>
      <img
        className='anime-card__image'
        src={anime.coverImage.large}
        alt={`Capa do anime ${title}`}
      />

      <div className='anime-card__content'>
        <h3 className='anime-card__title'>{title}</h3>

        {anime.seasonYear && (
          <p className='anime-card__year'>
            {anime.seasonYear}
          </p>
        )}

        {anime.averageScore && (
          <p className='anime-card__score'>
            Nota: {anime.averageScore}
          </p>
        )}
      </div>
    </article>
  );
}