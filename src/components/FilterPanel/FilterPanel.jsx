import './FilterPanel.css';

export default function FilterPanel({ filters, onChange }) {
  const formats = [
    { label: 'Todos', value: null },
    { label: 'TV', value: 'TV' },
    { label: 'Filme', value: 'MOVIE' },
    { label: 'OVA', value: 'OVA' },
  ];

  const statuses = [
    { label: 'Todos', value: null },
    { label: 'Em exibição', value: 'RELEASING' },
    { label: 'Finalizado', value: 'FINISHED' },
  ];

  const genres = [
    { label: 'Todos', value: null },
    { label: 'Ação', value: 'Action' },
    { label: 'Aventura', value: 'Adventure' },
    { label: 'Comédia', value: 'Comedy' },
    { label: 'Drama', value: 'Drama' },
    { label: 'Fantasia', value: 'Fantasy' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Slice of Life', value: 'Slice of Life' },
    { label: 'Mistério', value: 'Mystery' },
    { label: 'Psicológico', value: 'Psychological' },
    { label: 'Sci-Fi', value: 'Sci-Fi' },
    { label: 'Sobrenatural', value: 'Supernatural' },
  ];

  const episodeRanges = [
    { label: 'Qualquer', value: null },
    { label: 'Curto', value: 'SHORT' },
    { label: 'Médio', value: 'MEDIUM' },
    { label: 'Longo', value: 'LONG' },
  ];

  function handleFormatChange(format) {
    onChange({
      ...filters,
      format,
    });
  }

  function handleStatusChange(status) {
    onChange({
      ...filters,
      status,
    });
  }

  function handleGenreChange(genre) {
    onChange({
      ...filters,
      genre,
    });
  }

  function handleEpisodeRangeChange(episodeRange) {
    onChange({
      ...filters,
      episodeRange,
    });
  }

  return (
    <section className='filter-panel'>
      <div className='filter-panel__group filter-panel__group--format'>
        <p className='filter-panel__label'>
          Formato
        </p>

        <div className='filter-panel__options'>
          {formats.map((format) => (
            <button
              key={format.label}
              className={`filter-panel__button ${
                filters.format === format.value
                  ? 'filter-panel__button--active'
                  : ''
              }`}
              onClick={() => handleFormatChange(format.value)}
            >
              {format.label}
            </button>
          ))}
        </div>
      </div>

      <div className='filter-panel__group filter-panel__group--status'>
        <p className='filter-panel__label'>
          Status
        </p>

        <div className='filter-panel__options'>
          {statuses.map((status) => (
            <button
              key={status.label}
              className={`filter-panel__button ${
                filters.status === status.value
                  ? 'filter-panel__button--active'
                  : ''
              }`}
              onClick={() => handleStatusChange(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className='filter-panel__group filter-panel__group--genre'>
        <p className='filter-panel__label'>
          Gênero
        </p>

        <div className='filter-panel__options'>
          {genres.map((genre) => (
            <button
              key={genre.label}
              className={`filter-panel__button ${
                filters.genre === genre.value
                  ? 'filter-panel__button--active'
                  : ''
              }`}
              onClick={() => handleGenreChange(genre.value)}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      <div className='filter-panel__group filter-panel__group--episodes'>
        <p className='filter-panel__label'>
          Quantidade de Episódios
        </p>

        <div className='filter-panel__options'>
          {episodeRanges.map((range) => (
            <button
              key={range.label}
              className={`filter-panel__button ${
                filters.episodeRange === range.value
                  ? 'filter-panel__button--active'
                  : ''
              }`}
              onClick={() => handleEpisodeRangeChange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}