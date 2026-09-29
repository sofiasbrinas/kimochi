import { useEffect, useState } from 'react';
import MoodGrid from './components/MoodGrid/MoodGrid';
import { moods } from "./data/moods";
import { getAnimeList } from './services/anilist';

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
  async function loadAnime() {
    const data = await getAnimeList();

    setAnimeList(data);
  }

  loadAnime();
}, []);

  return (
    <main>
      <h1>Kimochi</h1>

      <p>O que você quer sentir?</p>

      <MoodGrid
        moods={moods}
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />

      <p>{animeList.length} animes encontrados</p>

      {selectedMood && (
        <p>Mood selecionado: {selectedMood}</p>
      )}
    </main>
  );
}