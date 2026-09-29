import { Bookmark, CalendarDays, Clock3, Star } from 'lucide-react';
import './FeaturedAnime.css';

export default function FeaturedAnime({
  anime,
  onSelect,
}) {
  const title =
    anime.title.english ||
    anime.title.romaji;

  return (
    <article className='featured-anime'>
      <img
        className='featured-anime__image'
        src={
          anime.bannerImage ||
          anime.coverImage.extraLarge ||
          anime.coverImage.large
        }
        alt={title}
      />

      <div className='featured-anime__overlay' />

      <div className='featured-anime__content'>
        <span className='featured-anime__badge'>
          Melhor match
        </span>

        <h3 className='featured-anime__title'>
          {title}
        </h3>

        <div className='featured-anime__metadata'>
          {anime.averageScore && (
            <span className='featured-anime__metadata-item'>
              <Star size={15} />
              {anime.averageScore}
            </span>
          )}

          {anime.seasonYear && (
            <span className='featured-anime__metadata-item'>
              <CalendarDays size={15} />
              {anime.seasonYear}
            </span>
          )}

          {anime.episodes && (
            <span className='featured-anime__metadata-item'>
              <Clock3 size={15} />
              {anime.episodes} episódios
            </span>
          )}
        </div>

        <div className='featured-anime__genres'>
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className='featured-anime__genre'
            >
              {genre}
            </span>
          ))}
        </div>

        <div className='featured-anime__actions'>
          <button
            type='button'
            className='featured-anime__button'
            onClick={() => onSelect(anime)}
          >
            Ver detalhes
          </button>

          <button
            type='button'
            className='featured-anime__bookmark'
            aria-label='Adicionar aos favoritos'
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}