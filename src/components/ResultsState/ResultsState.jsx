import {
  CircleAlert,
  SearchX,
  Sparkles,
} from 'lucide-react';
import './ResultsState.css';

export default function ResultsState({
  type,
  message,
}) {
  const states = {
    loading: {
      icon: Sparkles,
      title: 'Buscando seu próximo anime...',
      description:
        'Estamos procurando recomendações que combinam com o seu momento.',
    },

    empty: {
      icon: SearchX,
      title: 'Nenhum anime encontrado',
      description:
        'Tente ajustar os filtros ou escolher outro sentimento.',
    },

    error: {
      icon: CircleAlert,
      title: 'Algo deu errado',
      description:
        message ||
        'Não foi possível carregar as recomendações agora.',
    },
  };

  const state = states[type];

  const Icon = state.icon;

  return (
    <div className={`results-state results-state--${type}`}>
      <div className='results-state__icon'>
        <Icon size={22} />
      </div>

      <div>
        <h3 className='results-state__title'>
          {state.title}
        </h3>

        <p className='results-state__description'>
          {state.description}
        </p>
      </div>
    </div>
  );
}