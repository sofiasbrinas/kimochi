import AnimeCard from '../AnimeCard/AnimeCard';

import './AnimeGrid.css';

export default function AnimeGrid({ animeList }) {
  return (
    <section className='anime-grid'>
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
        />
      ))}
    </section>
  );
}