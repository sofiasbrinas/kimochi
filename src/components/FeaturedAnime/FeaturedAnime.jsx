import { Bookmark, Star } from 'lucide-react';
import './FeaturedAnime.css';

export default function FeaturedAnime({ anime, onSelect }) {
  if (!anime) {
    return null;
  }

  const title = anime.title.english || anime.title.romaji;

  return (
    <article className='featured-anime'>
      {anime.bannerImage && (
        <img
          className='featured-anime__background'
          src={anime.bannerImage}
          alt=''
        />
      )}

      <div className='featured-anime__overlay' />

      <div className='featured-anime__content'>
        <span className='featured-anime__label'>
          Melhor match
        </span>

        <h2 className='featured-anime__title'>
          {title}
        </h2>

        <div className='featured-anime__metadata'>
          {anime.averageScore && (
            <span>
              <Star size={16} />
              {anime.averageScore}
            </span>
          )}

          {anime.seasonYear && (
            <span>{anime.seasonYear}</span>
          )}

          {anime.episodes && (
            <span>{anime.episodes} episódios</span>
          )}
        </div>

        <div className='featured-anime__genres'>
          {anime.genres.slice(0, 3).map((genre) => (
            <span key={genre}>
              {genre}
            </span>
          ))}
        </div>

        <div className='featured-anime__actions'>
          <button
            className='featured-anime__primary-button'
            onClick={() => onSelect(anime)}
          >
            Ver detalhes
          </button>

          <button
            className='featured-anime__icon-button'
            aria-label={`Salvar ${title}`}
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}