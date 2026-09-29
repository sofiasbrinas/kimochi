import {
  CloudSun,
  Heart,
  Laugh,
  Flame,
  Brain,
  Compass,
  Sparkles,
  Flower2,
} from 'lucide-react';
import './MoodCard.css';

const moodIcons = {
  comforting: CloudSun,
  emotional: Heart,
  funny: Laugh,
  romantic: Flower2,
  intense: Flame,
  reflective: Brain,
  adventurous: Compass,
  nostalgic: Sparkles,
};

export default function MoodCard({
  mood,
  selected,
  onSelect,
}) {
  const Icon = moodIcons[mood.id] || Sparkles;

  return (
    <button
      type='button'
      className={`mood-card ${
        selected
          ? 'mood-card--selected'
          : ''
      }`}
      onClick={() => onSelect(mood.id)}
    >
      <div className='mood-card__icon'>
        <Icon size={20} />
      </div>

      <div className='mood-card__content'>
        <h3 className='mood-card__title'>
          {mood.name}
        </h3>

        <p className='mood-card__description'>
          {mood.description}
        </p>
      </div>
    </button>
  );
}