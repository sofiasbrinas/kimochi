import { useState } from 'react';
import AnimeGrid from './components/AnimeGrid/AnimeGrid';
import FeaturedAnime from './components/FeaturedAnime/FeaturedAnime';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import MoodGrid from './components/MoodGrid/MoodGrid';
import { moods } from './data/moods';
import { getAnimeByMood } from './services/anilist';

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const featuredAnime = animeList[0];
  const recommendations = animeList.slice(1);

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
        <>
          <FeaturedAnime 
            anime={featuredAnime}
  onSelect={setSelectedAnime} />
          <AnimeGrid 
            animeList={recommendations}
            onSelectAnime={setSelectedAnime} />
        </>
      )}
      {selectedAnime && (
        <AnimeDetails
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
        )}
    </main>
  );
}