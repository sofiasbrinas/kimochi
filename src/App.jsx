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

    Guarda o id do sentimento escolhido pelo usuário.
    Exemplo: 'comforting', 'romantic', 'intense'.
  */
  const [selectedMood, setSelectedMood] = useState(null);

  /*
    LISTA DE ANIMES

    Armazena os resultados recebidos da AniList.
    Essa lista é usada para montar:
    - o anime em destaque;
    - os cards de recomendações.
  */
  const [animeList, setAnimeList] = useState([]);

  /*
    ANIME SELECIONADO

    Guarda o anime que o usuário clicou
    para abrir o modal de detalhes.
  */
  const [selectedAnime, setSelectedAnime] = useState(null);

  /*
    ESTADO DE CARREGAMENTO

    true:
    a aplicação está esperando a resposta da API.

    false:
    a requisição terminou.
  */
  const [isLoading, setIsLoading] = useState(false);

  /*
    ESTADO DE ERRO

    null:
    não existe erro.

    string:
    contém uma mensagem para mostrar ao usuário.
  */
  const [error, setError] = useState(null);

  /*
    FILTROS

    Cada propriedade representa uma escolha
    feita dentro do FilterPanel.

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
    O primeiro anime retornado pela API
    será usado como destaque principal.
  */
  const featuredAnime = animeList[0];

  /*
    Os demais resultados serão exibidos
    no grid de recomendações.
  */
  const recommendations = animeList.slice(1);

  /*
    SELEÇÃO DE MOOD

    Essa função é executada quando o usuário
    clica em um dos cards de sentimento.
  */
  async function handleMoodSelect(moodId) {
    /*
      Procura, dentro do array moods,
      o objeto correspondente ao id clicado.
    */
    const mood = moods.find(
      (item) => item.id === moodId,
    );

    /*
      Atualiza visualmente qual mood
      está selecionado.
    */
    setSelectedMood(moodId);

    /*
      Antes de iniciar a requisição:

      - ativa o estado de loading;
      - remove qualquer erro anterior.
    */
    setIsLoading(true);
    setError(null);

    try {
      /*
        Faz a requisição para a AniList.

        Enviamos:
        - o mood selecionado;
        - os filtros atuais.
      */
      const results = await getAnimeByMood(
        mood,
        filters,
      );

      /*
        Se a requisição funcionar,
        salvamos os resultados recebidos.
      */
      setAnimeList(results);
    } catch {
      /*
        Se ocorrer algum erro:

        - limpamos resultados antigos;
        - salvamos uma mensagem de erro.
      */
      setAnimeList([]);

      setError(
        'Não foi possível buscar recomendações agora.',
      );
    } finally {
      /*
        O finally sempre é executado,
        independentemente de sucesso ou erro.

        Portanto, o loading termina aqui.
      */
      setIsLoading(false);
    }
  }

  /*
    ALTERAÇÃO DOS FILTROS

    Essa função é executada sempre que
    algum filtro é alterado.
  */
  async function handleFilterChange(newFilters) {
    /*
      Atualiza o estado com os novos filtros.
    */
    setFilters(newFilters);

    /*
      Sem um mood selecionado, ainda não existe
      contexto suficiente para buscar recomendações.
    */
    if (!selectedMood) {
      return;
    }

    /*
      Recupera o objeto completo do mood atual.
    */
    const mood = moods.find(
      (item) => item.id === selectedMood,
    );

    /*
      Começamos uma nova requisição.
    */
    setIsLoading(true);
    setError(null);

    try {
      /*
        Busca novamente os animes,
        agora usando os filtros atualizados.
      */
      const results = await getAnimeByMood(
        mood,
        newFilters,
      );

      /*
        Atualiza os resultados exibidos.
      */
      setAnimeList(results);
    } catch {
      /*
        Se a requisição falhar,
        limpamos a lista e mostramos erro.
      */
      setAnimeList([]);

      setError(
        'Não foi possível atualizar as recomendações.',
      );
    } finally {
      /*
        Finaliza o estado de carregamento.
      */
      setIsLoading(false);
    }
  }

  return (
    <div className='app'>
      {/* Navegação lateral principal */}
      <Sidebar />

      <main className='app__content'>
        {/* Introdução da aplicação */}
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

        {/* Seleção de sentimento */}
        <section className='app__section'>
          <MoodGrid
            moods={moods}
            selectedMood={selectedMood}
            onSelectMood={handleMoodSelect}
          />
        </section>

        {/*
          FILTROS

          Só aparecem depois que o usuário
          escolhe um mood.
        */}
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

        {/*
          LOADING STATE

          Aparece enquanto esperamos
          a resposta da API.
        */}
        {isLoading && (
          <section className='app__section'>
            <ResultsState type='loading' />
          </section>
        )}

        {/*
          ERROR STATE

          Só aparece se existir um erro
          e a aplicação não estiver carregando.
        */}
        {error && !isLoading && (
          <section className='app__section'>
            <ResultsState
              type='error'
              message={error}
            />
          </section>
        )}

        {/*
          EMPTY STATE

          Temos:
          - um mood selecionado;
          - nenhuma requisição em andamento;
          - nenhum erro;
          - zero resultados.

          Nesse caso, informamos que nenhum
          anime corresponde à combinação escolhida.
        */}
        {selectedMood &&
          !isLoading &&
          !error &&
          animeList.length === 0 && (
            <section className='app__section'>
              <ResultsState type='empty' />
            </section>
          )}

        {/*
          RESULTADOS

          Só mostramos featured + grid quando:
          - terminou de carregar;
          - não existe erro;
          - existem resultados.
        */}
        {!isLoading &&
          !error &&
          animeList.length > 0 && (
            <>
              {/* Anime principal da recomendação */}
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

              {/* Demais recomendações */}
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

          Só existe quando selectedAnime
          contém um anime selecionado.
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