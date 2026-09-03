import type { Branch } from '../types';

/**
 * BUSINESS CONFIG — DEMO
 * Reemplazar estos valores por los del cliente real antes de publicar.
 * Todo el sitio lee de acá: nombre, contacto, redes, sucursales y moneda.
 */
export const businessConfig = {
  name: 'HUMO',
  fullName: 'HUMO Burger Co.',
  slogan: 'Fuego, humo y una sola regla: la carne manda.',
  shortPitch:
    'Hamburguesas ahumadas a la parrilla, pan brioche de casa y una vuelta de fuego real en cada vuelta de plancha.',
  currency: 'ARS',
  currencySymbol: '$',
  whatsappNumber: '5491155550199', // DEMO — reemplazar por el WhatsApp real del cliente
  instagramHandle: '@humoburger', // DEMO
  instagramUrl: 'https://instagram.com/',
  phone: '+54 9 11 5555-0199',
  email: 'hola@humoburger.demo',
  deliveryLinks: {
    pedidosYa: '#',
    rappi: '#',
    ownDelivery: true,
  },
  socials: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    facebook: 'https://facebook.com/',
  },
  seo: {
    title: 'HUMO Burger Co. — Hamburguesas ahumadas a la parrilla',
    description:
      'Hamburguesas artesanales ahumadas a la parrilla, combos, promos y delivery. Pedí online o por WhatsApp. Sucursales en toda la ciudad.',
  },
};

export const branches: Branch[] = [
  {
    id: 'palermo',
    name: 'HUMO Palermo',
    address: 'Av. Costa Rica 5312',
    city: 'CABA',
    phone: '+54 9 11 5555-0199',
    whatsapp: '5491155550199',
    hours: [
      { days: 'Dom a jue', time: '19:00 a 00:30' },
      { days: 'Vie y sáb', time: '19:00 a 01:30' },
    ],
    mapsUrl: 'https://maps.google.com/?q=Av+Costa+Rica+5312+CABA',
    lat: -34.5876,
    lng: -58.4306,
  },
  {
    id: 'nunez',
    name: 'HUMO Núñez',
    address: 'Av. Cabildo 3221',
    city: 'CABA',
    phone: '+54 9 11 5555-0287',
    whatsapp: '5491155550287',
    hours: [
      { days: 'Dom a jue', time: '19:30 a 00:00' },
      { days: 'Vie y sáb', time: '19:30 a 01:30' },
    ],
    mapsUrl: 'https://maps.google.com/?q=Av+Cabildo+3221+CABA',
    lat: -34.5453,
    lng: -58.4626,
  },
  {
    id: 'rosario',
    name: 'HUMO Rosario Centro',
    address: 'Córdoba 1450',
    city: 'Rosario, Santa Fe',
    phone: '+54 9 341 555-0341',
    whatsapp: '543415550341',
    hours: [
      { days: 'Dom a jue', time: '20:00 a 00:30' },
      { days: 'Vie y sáb', time: '20:00 a 02:00' },
    ],
    mapsUrl: 'https://maps.google.com/?q=Cordoba+1450+Rosario',
    lat: -32.9468,
    lng: -60.6393,
  },
];
