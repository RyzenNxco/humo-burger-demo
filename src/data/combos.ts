import type { ComboItem } from '../types';

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const combos: ComboItem[] = [
  {
    id: 'combo-solo',
    name: 'Combo Solo',
    description: 'Tu burger favorita, papas clásicas y bebida.',
    includes: ['1 hamburguesa a elección', 'Papas clásicas', 'Bebida 354ml'],
    burgerChoices: 1,
    price: 11900,
    oldPrice: 13400,
    image: img('photo-1550547660-d9450f859349'),
  },
  {
    id: 'combo-pareja',
    name: 'Combo Pareja',
    description: 'Dos burgers, papas grandes para compartir y dos bebidas.',
    includes: ['2 hamburguesas a elección', 'Papas grandes', '2 bebidas 354ml'],
    burgerChoices: 2,
    price: 21900,
    oldPrice: 24800,
    image: img('photo-1571091718767-18b5b1457add'),
  },
  {
    id: 'combo-banda',
    name: 'Combo Banda',
    description: 'Para el grupo: 4 burgers, 2 papas grandes y 4 bebidas.',
    includes: ['4 hamburguesas a elección', '2 papas grandes', '4 bebidas 354ml'],
    burgerChoices: 4,
    price: 39900,
    oldPrice: 45600,
    image: img('photo-1607013251379-e6eecfffe234'),
  },
  {
    id: 'combo-veggie',
    name: 'Combo Veggie',
    description: 'Veggie Verde, papas rústicas y limonada de jengibre.',
    includes: ['1 Veggie Verde', 'Papas rústicas', 'Limonada de jengibre'],
    burgerChoices: 0,
    price: 12900,
    image: img('photo-1521305916504-4a1121188589'),
  },
  {
    id: 'combo-kids',
    name: 'Combo Peque',
    description: 'Mini burger clásica, papas chicas y jugo.',
    includes: ['1 mini burger', 'Papas chicas', 'Jugo de caja'],
    burgerChoices: 0,
    price: 6900,
    image: img('photo-1561758033-d89a9ad46330'),
  },
];
