import './AnimeCard.css';

export default function AnimeCard({ anime, onSelect }) {
  const title = anime.title.english || anime.title.romaji;

  return (
    <article className='anime-card'>
      <button
        className='anime-card__button'
        onClick={() => onSelect(anime)}
        aria-label={`Ver detalhes de ${title}`}
      >
        <div className='anime-card__image-wrapper'>
          <img
            className='anime-card__image'
            src={anime.coverImage.large}
            alt={`Capa do anime ${title}`}
          />
        </div>

        <div className='anime-card__content'>
          <h3 className='anime-card__title'>{title}</h3>

          <div className='anime-card__metadata'>
            {anime.seasonYear && <span>{anime.seasonYear}</span>}

            {anime.episodes && (
              <span>{anime.episodes} episódios</span>
            )}
          </div>

          <div className='anime-card__genres'>
            {anime.genres.slice(0, 2).map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>
      </button>
    </article>
  );
}