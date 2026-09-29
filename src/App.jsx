import { useState } from 'react';

import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import AnimeGrid from './components/AnimeGrid/AnimeGrid';
import FeaturedAnime from './components/FeaturedAnime/FeaturedAnime';
import FilterPanel from './components/FilterPanel/FilterPanel';
import MoodGrid from './components/MoodGrid/MoodGrid';
import Sidebar from './components/Sidebar/Sidebar';

import { moods } from './data/moods';
import { getAnimeByMood } from './services/anilist';

import './App.css';

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
    const mood = moods.find((item) => item.id === moodId);

    setSelectedMood(moodId);

    const results = await getAnimeByMood(mood, filters);

    setAnimeList(results);
  }

  async function handleFilterChange(newFilters) {
    setFilters(newFilters);

    if (!selectedMood) {
      return;
    }

    const mood = moods.find((item) => item.id === selectedMood);

    const results = await getAnimeByMood(
      mood,
      newFilters,
    );

    setAnimeList(results);
  }

  return (
    <div className='app'>
      <Sidebar />

      <main className='app__content'>
        <header className='app__hero'>
          <span className='app__eyebrow'>
            Descubra pelo que você quer sentir
          </span>

          <h1 className='app__title'>
            O que você quer sentir?
          </h1>

          <p className='app__description'>
            Escolha um sentimento e encontre animes
            que combinam com o seu momento.
          </p>
        </header>

        <section className='app__section'>
          <MoodGrid
            moods={moods}
            selectedMood={selectedMood}
            onSelectMood={handleMoodSelect}
          />
        </section>

        {selectedMood && (
          <section className='app__section'>
            <div className='app__section-header'>
              <div>
                <span className='app__section-eyebrow'>
                  Personalize
                </span>

                <h2 className='app__section-title'>
                  Ajuste sua descoberta
                </h2>
              </div>
            </div>

            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
            />
          </section>
        )}

        {animeList.length > 0 && (
          <>
            <section className='app__section'>
              <div className='app__section-header'>
                <div>
                  <span className='app__section-eyebrow'>
                    Para você
                  </span>

                  <h2 className='app__section-title'>
                    Melhor match
                  </h2>
                </div>
              </div>

              <FeaturedAnime
                anime={featuredAnime}
                onSelect={setSelectedAnime}
              />
            </section>

            <section className='app__section'>
              <div className='app__section-header'>
                <div>
                  <span className='app__section-eyebrow'>
                    Continue explorando
                  </span>

                  <h2 className='app__section-title'>
                    Recomendações
                  </h2>
                </div>
              </div>

              <AnimeGrid
                animeList={recommendations}
                onSelectAnime={setSelectedAnime}
              />
            </section>
          </>
        )}

        {selectedAnime && (
          <AnimeDetails
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
          />
        )}
      </main>
    </div>
  );
}