import type { Review } from '../types';

/**
 * RESEÑAS DEMO — NO SON REALES.
 * Reemplazar por reseñas verificadas del cliente (Google/Instagram) antes de publicar.
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Marina G.',
    rating: 5,
    comment: 'La Doble Fuego es otro nivel. El pan brioche se nota casero. Volvemos seguro.',
    date: 'hace 2 semanas',
    demo: true,
  },
  {
    id: 'r2',
    name: 'Tomás R.',
    rating: 5,
    comment: 'Pedí delivery un viernes a la noche y llegó todo caliente y en tiempo. Impecable.',
    date: 'hace 1 mes',
    demo: true,
  },
  {
    id: 'r3',
    name: 'Julieta P.',
    rating: 4,
    comment: 'Las papas cheddar & bacon son un peligro. La atención en el local, muy buena onda.',
    date: 'hace 1 mes',
    demo: true,
  },
  {
    id: 'r4',
    name: 'Fede A.',
    rating: 5,
    comment: 'Probé la Blue Smoke por recomendación y no me arrepiento. Miel picante, un golazo.',
    date: 'hace 3 semanas',
    demo: true,
  },
  {
    id: 'r5',
    name: 'Cami L.',
    rating: 5,
    comment: 'La opción sin TACC tiene el mismo nivel que las demás. Se los agradezco muchísimo.',
    date: 'hace 2 meses',
    demo: true,
  },
  {
    id: 'r6',
    name: 'Nico D.',
    rating: 4,
    comment: 'Ambiente re copado para ir con amigos. El Combo Banda rinde y sobra.',
    date: 'hace 5 días',
    demo: true,
  },
];

export const reviewsSummary = {
  average: 4.8,
  count: 1247,
};
