import type { ProductCategory } from '../types';

export const categories: { id: ProductCategory; label: string }[] = [
  { id: 'mas-vendidas', label: 'Más vendidas' },
  { id: 'simples', label: 'Simples' },
  { id: 'dobles', label: 'Dobles' },
  { id: 'triples', label: 'Triples' },
  { id: 'pollo', label: 'Pollo' },
  { id: 'veggie', label: 'Veggie' },
  { id: 'sin-tacc', label: 'Sin TACC' },
  { id: 'papas', label: 'Papas' },
  { id: 'entradas', label: 'Entradas' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'postres', label: 'Postres' },
  { id: 'extras', label: 'Extras' },
];

export const sizeOptions = {
  simple: { id: 'simple' as const, label: 'Simple', priceDiff: 0 },
  doble: { id: 'doble' as const, label: 'Doble carne', priceDiff: 2200 },
  triple: { id: 'triple' as const, label: 'Triple carne', priceDiff: 4200 },
};

export const extraOptions = [
  { id: 'cheddar', label: 'Cheddar extra', price: 900 },
  { id: 'panceta', label: 'Panceta', price: 1300 },
  { id: 'huevo', label: 'Huevo frito', price: 800 },
  { id: 'cebolla-caramelizada', label: 'Cebolla caramelizada', price: 700 },
  { id: 'pepinillos', label: 'Pepinillos extra', price: 500 },
  { id: 'carne-extra', label: 'Medallón extra', price: 2200 },
  { id: 'salsa-humo', label: 'Salsa ahumada especial', price: 600 },
];

export const removableOptions = [
  { id: 'sin-cebolla', label: 'Sin cebolla' },
  { id: 'sin-pepinillos', label: 'Sin pepinillos' },
  { id: 'sin-salsa', label: 'Sin salsa' },
  { id: 'sin-lechuga', label: 'Sin lechuga' },
  { id: 'sin-tomate', label: 'Sin tomate' },
];
