import { useState } from 'react';
import AnimeCard from './components/AnimeCard/AnimeCard';
import MoodGrid from './components/MoodGrid/MoodGrid';
import { moods } from './data/moods';
import { getAnimeByMood } from './services/anilist';

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [animeList, setAnimeList] = useState([]);

  async function handleMoodSelect(moodId) {
    // Procura os dados completos do mood selecionado.
    const mood = moods.find((item) => item.id === moodId);

    // Atualiza o mood selecionado na interface.
    setSelectedMood(moodId);

    // Consulta a AniList usando os filtros desse mood.
    const results = await getAnimeByMood(mood);

    // Guarda as recomendações recebidas.
    setAnimeList(results);
  }

  return (
    <main>
      <h1>Kimochi</h1>

      <p>O que você quer sentir?</p>

      <MoodGrid
        moods={moods}
        selectedMood={selectedMood}
        onSelectMood={handleMoodSelect}
      />

      {selectedMood && (
        <>
          <p>Mood selecionado: {selectedMood}</p>

          <p>{animeList.length} animes encontrados</p>
        </>
      )}
      {animeList.length > 0 && (
        <AnimeCard anime={animeList[0]} />
        )}
    </main>
  );
}