import { useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Star,
  X,
} from 'lucide-react';
import './AnimeDetails.css';

export default function AnimeDetails({
  anime,
  onClose,
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const title =
    anime.title.english ||
    anime.title.romaji;

  const cleanDescription =
    anime.description
      ? anime.description.replace(/<[^>]*>/g, '')
      : 'Descrição não disponível.';

  return (
    <div className='anime-details'>
      <button
        type='button'
        className='anime-details__backdrop'
        aria-label='Fechar detalhes'
        onClick={onClose}
      />

      <article
        className={`anime-details__modal ${
          isDescriptionExpanded
            ? 'anime-details__modal--expanded'
            : ''
        }`}
      >
        <button
          type='button'
          className='anime-details__close'
          aria-label='Fechar'
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className='anime-details__visual'>
          <img
            className='anime-details__cover'
            src={
              anime.coverImage.extraLarge ||
              anime.coverImage.large
            }
            alt={title}
          />
        </div>

        <div className='anime-details__content'>
          <span className='anime-details__eyebrow'>
            Detalhes do anime
          </span>

          <h2 className='anime-details__title'>
            {title}
          </h2>

          <div className='anime-details__metadata'>
            {anime.averageScore && (
              <span className='anime-details__metadata-item'>
                <Star size={15} />
                {anime.averageScore}
              </span>
            )}

            {anime.seasonYear && (
              <span className='anime-details__metadata-item'>
                <CalendarDays size={15} />
                {anime.seasonYear}
              </span>
            )}

            {anime.episodes && (
              <span className='anime-details__metadata-item'>
                <Clock3 size={15} />
                {anime.episodes} episódios
              </span>
            )}

            {anime.duration && (
              <span className='anime-details__metadata-item'>
                {anime.duration} min
              </span>
            )}
          </div>

          <div className='anime-details__genres'>
            {anime.genres.map((genre) => (
              <span
                key={genre}
                className='anime-details__genre'
              >
                {genre}
              </span>
            ))}
          </div>

          <div className='anime-details__divider' />

          <div className='anime-details__description'>
            <span className='anime-details__description-label'>
              Sinopse
            </span>

            <p
              className={`anime-details__description-text ${
                isDescriptionExpanded
                  ? 'anime-details__description-text--expanded'
                  : ''
              }`}
            >
              {cleanDescription}
            </p>

            <button
              type='button'
              className='anime-details__description-toggle'
              onClick={() =>
                setIsDescriptionExpanded(
                  !isDescriptionExpanded,
                )
              }
            >
              {isDescriptionExpanded
                ? 'Mostrar menos'
                : 'Ler mais'}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}