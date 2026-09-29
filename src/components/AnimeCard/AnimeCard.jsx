import { Star } from 'lucide-react';
import './AnimeCard.css';

export default function AnimeCard({
  anime,
  onSelect,
}) {
  const title =
    anime.title.english ||
    anime.title.romaji;

  return (
    <button
      type='button'
      className='anime-card'
      onClick={() => onSelect(anime)}
    >
      <div className='anime-card__image-wrapper'>
        <img
          className='anime-card__image'
          src={
            anime.coverImage.extraLarge ||
            anime.coverImage.large}
          alt={title}
        />

        {anime.averageScore && (
          <span className='anime-card__score'>
            <Star size={13} />

            {anime.averageScore}
          </span>
        )}
      </div>

      <div className='anime-card__content'>
        <h3 className='anime-card__title'>
          {title}
        </h3>

        <div className='anime-card__metadata'>
          {anime.seasonYear && (
            <span>
              {anime.seasonYear}
            </span>
          )}

          {anime.episodes && (
            <>
              <span className='anime-card__separator'>
                •
              </span>

              <span>
                {anime.episodes} episódios
              </span>
            </>
          )}
        </div>

        <div className='anime-card__genres'>
          {anime.genres
            .slice(0, 2)
            .map((genre) => (
              <span
                key={genre}
                className='anime-card__genre'
              >
                {genre}
              </span>
            ))}
        </div>
      </div>
    </button>
  );
}