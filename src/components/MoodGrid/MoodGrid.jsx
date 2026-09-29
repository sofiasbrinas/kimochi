import MoodCard from '../MoodCard/MoodCard';
import './MoodGrid.css';

export default function MoodGrid({
  moods,
  selectedMood,
  onSelectMood,
}) {
  return (
    <div className='mood-grid'>
      {moods.map((mood) => (
        <MoodCard
          key={mood.id}
          mood={mood}
          selected={selectedMood === mood.id}
          onSelect={onSelectMood}
        />
      ))}
    </div>
  );
}