import { useState } from 'react';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import AnimeGrid from './components/AnimeGrid/AnimeGrid';
import FeaturedAnime from './components/FeaturedAnime/FeaturedAnime';
import FilterPanel from './components/FilterPanel/FilterPanel';
import MoodGrid from './components/MoodGrid/MoodGrid';

import { moods } from './data/moods';
import { getAnimeByMood } from './services/anilist';

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const [filters, setFilters] = useState({
    format: null,
    status: null,
    genre: null,
    episodeRange: null,
    durationRange: null,
  });

  const featuredAnime = animeList[0];
  const recommendations = animeList.slice(1);

  async function handleMoodSelect(moodId) {
    // Procura os dados completos do mood selecionado.
    const mood = moods.find((item) => item.id === moodId);

    // Atualiza o mood selecionado na interface.
    setSelectedMood(moodId);

    // Consulta a AniList usando o mood e os filtros atuais.
    const results = await getAnimeByMood(mood, filters);

    // Guarda as recomendações recebidas.
    setAnimeList(results);
  }

  async function handleFilterChange(newFilters) {
    // Atualiza o estado visual dos filtros.
    setFilters(newFilters);

    // Se nenhum mood foi escolhido, não precisamos consultar a API.
    if (!selectedMood) {
      return;
    }

    // Recupera o objeto completo do mood já selecionado.
    const mood = moods.find((item) => item.id === selectedMood);

    // Faz uma nova consulta usando o novo filtro.
    const results = await getAnimeByMood(mood, newFilters);

    // Atualiza os resultados exibidos.
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
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
        />
      )}

      {animeList.length > 0 && (
        <>
          <FeaturedAnime
            anime={featuredAnime}
            onSelect={setSelectedAnime}
          />

          <AnimeGrid
            animeList={recommendations}
            onSelectAnime={setSelectedAnime}
          />
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