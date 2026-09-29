import AnimeCard from '../AnimeCard/AnimeCard';
import './AnimeGrid.css';

export default function AnimeGrid({ animeList, onSelectAnime }) {
  return (
    <section className='anime-grid'>
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          onSelect={onSelectAnime}
        />
      ))}
    </section>
  );
}