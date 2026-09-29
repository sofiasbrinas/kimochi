import { useState } from 'react';
import MoodGrid from './components/MoodGrid/MoodGrid';
import { moods } from './data/moods';

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <main>
      <h1>Kimochi</h1>
      <p>O que você quer sentir?</p>

      <MoodGrid
        moods={moods}
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />

      {selectedMood && <p>Mood selecionado: {selectedMood}</p>}
    </main>
  );
}