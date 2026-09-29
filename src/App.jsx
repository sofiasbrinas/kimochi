import { useState } from 'react';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import AnimeGrid from './components/AnimeGrid/AnimeGrid';
import FeaturedAnime from './components/FeaturedAnime/FeaturedAnime';
import FilterPanel from './components/FilterPanel/FilterPanel';
import MoodGrid from './components/MoodGrid/MoodGrid';
import ResultsState from './components/ResultsState/ResultsState';
import Sidebar from './components/Sidebar/Sidebar';
import { moods } from './data/moods';
import { getAnimeByMood } from './services/anilist';
import './App.css';

export default function App() {
  /*
    MOOD SELECIONADO

    Guarda o id do sentimento escolhido.
    Exemplo:
    'comforting', 'romantic', 'nostalgic'.
  */
  const [selectedMood, setSelectedMood] = useState(null);

  /*
    CONTROLE DO SELETOR DE MOODS

    true:
    mostra os cards de sentimentos.

    false:
    mantém a escolha compactada.
  */
  const [isMoodPickerOpen, setIsMoodPickerOpen] = useState(true);

  /*
    CONTROLE DO PAINEL DE FILTROS

    Os filtros começam fechados para não
    empurrar a recomendação principal
    para baixo da página.
  */
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  /*
    RESULTADOS DA ANILIST
  */
  const [animeList, setAnimeList] = useState([]);

  /*
    ANIME SELECIONADO PARA O MODAL
  */
  const [selectedAnime, setSelectedAnime] = useState(null);

  /*
    ESTADOS DA REQUISIÇÃO
  */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
    FILTROS

    null significa que aquele filtro
    não está sendo aplicado.
  */
  const [filters, setFilters] = useState({
    format: null,
    status: null,
    genre: null,
    episodeRange: null,
    durationRange: null,
  });

  /*
    Recupera o objeto completo correspondente
    ao mood atualmente selecionado.
  */
  const currentMood = moods.find(
    (item) => item.id === selectedMood,
  );

  /*
    O primeiro anime vira o destaque.
  */
  const featuredAnime = animeList[0];

  /*
    Os demais vão para o grid.
  */
  const recommendations = animeList.slice(1);

  /*
    RÓTULOS DOS FILTROS

    Servem apenas para transformar os valores
    internos da API em textos amigáveis.
  */
  const formatLabels = {
    TV: 'TV',
    MOVIE: 'Filme',
    OVA: 'OVA',
  };

  const statusLabels = {
    RELEASING: 'Em exibição',
    FINISHED: 'Finalizado',
  };

  const episodeLabels = {
    SHORT: 'Até 12 episódios',
    MEDIUM: '13–26 episódios',
    LONG: '27+ episódios',
  };

  const durationLabels = {
    SHORT: 'Até 14 min',
    STANDARD: '15–30 min',
    LONG: '31+ min',
  };

  /*
    RESUMO DOS FILTROS ATIVOS

    O filter(Boolean) remove os valores null
    para exibirmos apenas filtros realmente ativos.
  */
  const activeFilters = [
    filters.format
      ? formatLabels[filters.format]
      : null,

    filters.status
      ? statusLabels[filters.status]
      : null,

    filters.genre,

    filters.episodeRange
      ? episodeLabels[filters.episodeRange]
      : null,

    filters.durationRange
      ? durationLabels[filters.durationRange]
      : null,
  ].filter(Boolean);

  /*
    SELEÇÃO DE MOOD
  */
  async function handleMoodSelect(moodId) {
    const mood = moods.find(
      (item) => item.id === moodId,
    );

    /*
      Salva a escolha.
    */
    setSelectedMood(moodId);

    /*
      Depois da escolha, recolhemos os moods
      para deixar o resultado ganhar destaque.
    */
    setIsMoodPickerOpen(false);

    /*
      Também recolhemos os filtros.
    */
    setIsFilterPanelOpen(false);

    setIsLoading(true);
    setError(null);

    try {
      /*
        Faz a consulta utilizando
        mood + filtros atuais.
      */
      const results = await getAnimeByMood(
        mood,
        filters,
      );

      setAnimeList(results);
    } catch {
      /*
        Em caso de erro, removemos resultados
        antigos e exibimos o estado de erro.
      */
      setAnimeList([]);

      setError(
        'Não foi possível buscar recomendações agora.',
      );
    } finally {
      /*
        O loading termina tanto em sucesso
        quanto em erro.
      */
      setIsLoading(false);
    }
  }

  /*
    ALTERAÇÃO DOS FILTROS
  */
  async function handleFilterChange(newFilters) {
    setFilters(newFilters);

    /*
      Não existe busca sem mood escolhido.
    */
    if (!selectedMood) {
      return;
    }

    const mood = moods.find(
      (item) => item.id === selectedMood,
    );

    setIsLoading(true);
    setError(null);

    try {
      /*
        Refaz a busca com os novos filtros.
      */
      const results = await getAnimeByMood(
        mood,
        newFilters,
      );

      setAnimeList(results);
    } catch {
      setAnimeList([]);

      setError(
        'Não foi possível atualizar as recomendações.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='app'>
      <Sidebar />

      <main className='app__content'>
        {/*
          HERO INICIAL

          Só aparece antes da primeira escolha.

          Depois que o usuário já escolheu
          o que deseja sentir, o resultado
          passa a ser o protagonista.
        */}
        {!selectedMood && (
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
        )}

        {/*
          SELETOR DE MOODS

          Aparece:
          - inicialmente;
          - quando o usuário clicar em "Alterar".
        */}
        {isMoodPickerOpen && (
          <section
            className={`app__section app__section--mood ${
              selectedMood
                ? 'app__section--mood-editing'
                : ''
            }`}
          >
            {selectedMood && (
              <div className='app__section-header'>
                <div>
                  <span className='app__section-eyebrow'>
                    Sentimento
                  </span>

                  <h2 className='app__section-title'>
                    Escolha outro mood
                  </h2>
                </div>

                <button
                  type='button'
                  className='app__text-action'
                  onClick={() => setIsMoodPickerOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            )}

            <MoodGrid
              moods={moods}
              selectedMood={selectedMood}
              onSelectMood={handleMoodSelect}
            />
          </section>
        )}

        {/*
          CONTROLES COMPACTOS

          Depois que existe um mood selecionado,
          mood e filtros passam a ocupar apenas
          uma pequena área de controle.
        */}
        {selectedMood && (
          <section className='app__controls'>
            <div className='app__controls-row'>
              <div className='app__controls-info'>
                <span className='app__controls-label'>
                  Mood
                </span>

                <div className='app__controls-value-group'>
                  <strong className='app__controls-value'>
                    {currentMood?.name}
                  </strong>

                  <span className='app__controls-description'>
                    {currentMood?.description}
                  </span>
                </div>
              </div>

              <button
                type='button'
                className='app__controls-action'
                onClick={() => {
                  setIsMoodPickerOpen(
                    !isMoodPickerOpen,
                  );
                }}
              >
                {isMoodPickerOpen
                  ? 'Fechar'
                  : 'Alterar'}
              </button>
            </div>

            <div className='app__controls-divider' />

            <div className='app__controls-row'>
              <div className='app__controls-info'>
                <span className='app__controls-label'>
                  Filtros
                </span>

                <p className='app__controls-filters'>
                  {activeFilters.length > 0
                    ? activeFilters.join(' · ')
                    : 'Sem filtros adicionais'}
                </p>
              </div>

              <button
                type='button'
                className='app__controls-action'
                onClick={() =>
                  setIsFilterPanelOpen(
                    !isFilterPanelOpen,
                  )
                }
              >
                {isFilterPanelOpen
                  ? 'Fechar'
                  : 'Ajustar'}
              </button>
            </div>

            {/*
              PAINEL COMPLETO

              Só aparece sob demanda.
            */}
            {isFilterPanelOpen && (
              <div className='app__controls-panel'>
                <FilterPanel
                  filters={filters}
                  onChange={handleFilterChange}
                />
              </div>
            )}
          </section>
        )}

        {/*
          LOADING
        */}
        {isLoading && (
          <section className='app__section app__section--state'>
            <ResultsState type='loading' />
          </section>
        )}

        {/*
          ERRO
        */}
        {error && !isLoading && (
          <section className='app__section app__section--state'>
            <ResultsState
              type='error'
              message={error}
            />
          </section>
        )}

        {/*
          NENHUM RESULTADO
        */}
        {selectedMood &&
          !isLoading &&
          !error &&
          animeList.length === 0 && (
            <section className='app__section app__section--state'>
              <ResultsState type='empty' />
            </section>
          )}

        {/*
          RESULTADOS ENCONTRADOS
        */}
        {!isLoading &&
          !error &&
          animeList.length > 0 && (
            <>
              {/*
                RECOMENDAÇÃO PRINCIPAL
              */}
              <section className='app__section app__section--featured'>
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

              {/*
                RECOMENDAÇÕES SECUNDÁRIAS
              */}
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

        {/*
          MODAL DE DETALHES
        */}
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