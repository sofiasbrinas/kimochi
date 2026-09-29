import './FilterPanel.css';

export default function FilterPanel({ filters, onChange }) {
  const formats = [
    { label: 'Todos', value: null },
    { label: 'TV', value: 'TV' },
    { label: 'Filme', value: 'MOVIE' },
    { label: 'OVA', value: 'OVA' },
  ];

  function handleFormatChange(format) {
    onChange({
      ...filters,
      format,
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
    </section>
  );
}