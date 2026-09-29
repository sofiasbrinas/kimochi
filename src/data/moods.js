// Este arquivo concentra os moods disponíveis no Kimochi.
//
// Separar esses dados dos componentes facilita a manutenção:
// novos moods podem ser adicionados aqui sem modificar a interface.

export const moods = [
  {
    id: 'comforting',
    name:'Conforto',
    description: 'Histórias que acolhem',
    genres: ['Slice of Life'],
    tags: ['Iyashikei'],
  },

  {
    id: 'emotional',
    name: 'Emocional',
    description: 'Prepare os lencinhos',
    genres: ['Drama'],
    tags: ['Tragedy'],
  },

  {
    id: 'funny',
    name: 'Engraçado',
    description: 'Para dar boas risadas',
    genres: ['Comedy'],
    tags: [],
  },

  {
    id: 'romantic',
    name: 'Romântico',
    description: 'Histórias de amor',
    genres: ['Romance'],
    tags: [],
  },

  {
    id: 'intense',
    name: 'Intenso',
    description: 'Tramas que prendem',
    genres: ['Action', 'Thriller'],
    tags: [],
  },

  {
    id: 'reflective',
    name: 'Reflexivo',
    description: 'Para pensar sobre a vida',
    genres: ['Drama', 'Psychological'],
    tags: ['Philosophy'],
  },

  {
    id: 'adventurous',
    name: 'Aventureiro',
    description: 'Grandes jornadas',
    genres: ['Adventure'],
    tags: [],
  },

  {
    id: 'nostalgic',
    name: 'Nostálgico',
    description: 'Para revisitar boas sensações',
    genres: [],
    tags: [],
  },
];