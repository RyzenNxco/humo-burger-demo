import type { Promotion } from '../types';

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const promotions: Promotion[] = [
  {
    id: 'martes-2x1',
    name: '2x1 en Burgers Clásicas',
    description: 'Todos los martes, llevate dos La Clásica al precio de una.',
    image: img('photo-1568901346375-23c9450c58cd'),
    oldPrice: 14400,
    price: 7200,
    validity: 'Todos los martes',
    active: true,
  },
  {
    id: 'combo-pareja-promo',
    name: 'Combo Pareja',
    description: '2 burgers a elección + papas grandes + 2 bebidas.',
    image: img('photo-1571091718767-18b5b1457add'),
    oldPrice: 24800,
    price: 21900,
    validity: 'Todos los días',
    active: true,
  },
  {
    id: 'happy-hour',
    name: 'Happy Hour',
    description: '20% off en toda la carta de 18 a 20hs.',
    image: img('photo-1608270586620-248524c67de9'),
    price: 0,
    validity: 'Lunes a viernes, 18 a 20hs',
    active: true,
  },
  {
    id: 'promo-estudiantes',
    name: 'Promo Estudiantes',
    description: 'Burger + papas + bebida con 15% off presentando libreta.',
    image: img('photo-1541592106381-b31e9677c0e5'),
    price: 0,
    validity: 'Lunes a viernes, todo el día',
    active: true,
  },
  {
    id: 'miercoles-fuego',
    name: 'Miércoles de Fuego',
    description: 'Todas las burgers picantes con 25% off.',
    image: img('photo-1594212699903-ec8a3eca50f5'),
    price: 0,
    validity: 'Todos los miércoles',
    active: true,
  },
  {
    id: 'combo-amigos-promo',
    name: 'Combo Banda',
    description: '4 burgers + 2 papas grandes + 4 bebidas para compartir.',
    image: img('photo-1607013251379-e6eecfffe234'),
    oldPrice: 45600,
    price: 39900,
    validity: 'Todos los días',
    active: true,
  },
];
