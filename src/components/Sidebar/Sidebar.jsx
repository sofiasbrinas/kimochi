import { Compass, Heart, Sparkles } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar__brand'>
        <div className='sidebar__logo'>
          <Sparkles size={18} />
        </div>

        <span className='sidebar__name'>
          Kimochi
        </span>
      </div>

      <nav
        className='sidebar__navigation'
        aria-label='Navegação principal'
      >
        <button
          className='sidebar__navigation-item sidebar__navigation-item--active'
          type='button'
        >
          <Compass size={18} />

          <span>
            Descobrir
          </span>
        </button>

        <button
          className='sidebar__navigation-item'
          type='button'
        >
          <Heart size={18} />

          <span>
            Favoritos
          </span>
        </button>
      </nav>

      <p className='sidebar__footer'>
        Encontre histórias para o seu momento.
      </p>
    </aside>
  );
}