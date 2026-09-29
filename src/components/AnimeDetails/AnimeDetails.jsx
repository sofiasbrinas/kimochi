import { X } from 'lucide-react';
import './AnimeDetails.css';

export default function AnimeDetails({ anime, onClose }) {
  if (!anime) {
    return null;
  }

  const title = anime.title.english || anime.title.romaji;

  return (
    <div className='anime-details'>
      <div className='anime-details__panel'>
        <button
          className='anime-details__close'
          onClick={onClose}
          aria-label='Fechar detalhes'
        >
          <X size={20} />
        </button>

        <img
          className='anime-details__image'
          src={anime.coverImage.large}
          alt={`Capa do anime ${title}`}
        />

        <div className='anime-details__content'>
          <h2>{title}</h2>

          <div className='anime-details__metadata'>
            {anime.seasonYear && <span>{anime.seasonYear}</span>}
            {anime.episodes && <span>{anime.episodes} episódios</span>}
            {anime.duration && <span>{anime.duration} min</span>}
            {anime.averageScore && <span>Nota {anime.averageScore}</span>}
          </div>

          <div className='anime-details__genres'>
            {anime.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          {anime.description && (
            <p className='anime-details__description'>
              {anime.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}