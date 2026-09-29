import './MoodCard.css';

export default function MoodCard({ mood, selected, onSelect }) {
  return (
    <button
      className={`mood-card ${selected ? 'mood-card--selected' : ''}`}
      onClick={() => onSelect(mood.id)}
    >
      <h3>{mood.name}</h3>

      <p>{mood.description}</p>
    </button>
  );
}