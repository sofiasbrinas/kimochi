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

  return (
    <section className='filter-panel'>
      <div className='filter-panel__group'>
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

      <div className='filter-panel__group'>
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
    </section>
  );
}