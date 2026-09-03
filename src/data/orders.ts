import type { DemoOrder } from '../types';

export const demoOrders: DemoOrder[] = [
  { id: '#1042', customer: 'Marina G.', items: '2x Doble Fuego, 1x Papas Cheddar', total: 24700, method: 'delivery', status: 'en-camino', time: '21:42' },
  { id: '#1041', customer: 'Tomás R.', items: '1x Combo Pareja', total: 21900, method: 'retiro', status: 'listo', time: '21:38' },
  { id: '#1040', customer: 'Julieta P.', items: '1x Blue Smoke, 1x Milkshake Choco', total: 13400, method: 'delivery', status: 'preparando', time: '21:35' },
  { id: '#1039', customer: 'Fede A.', items: '3x La Clásica', total: 21600, method: 'retiro', status: 'preparando', time: '21:30' },
  { id: '#1038', customer: 'Cami L.', items: '1x Sin TACC Classic, 1x Limonada', total: 11500, method: 'delivery', status: 'confirmado', time: '21:26' },
  { id: '#1037', customer: 'Nico D.', items: '1x Combo Banda', total: 39900, method: 'delivery', status: 'confirmado', time: '21:20' },
  { id: '#1036', customer: 'Lola M.', items: '2x Pollo Picante Crunch', total: 15800, method: 'retiro', status: 'nuevo', time: '21:18' },
  { id: '#1035', customer: 'Bruno S.', items: '1x Triple Amenaza, 1x Papas', total: 16300, method: 'delivery', status: 'nuevo', time: '21:15' },
  { id: '#1034', customer: 'Vale T.', items: '1x Veggie Verde, 1x Agua', total: 9400, method: 'retiro', status: 'entregado', time: '20:55' },
  { id: '#1033', customer: 'Iván C.', items: '2x BBQ Rebelde, 2x Cerveza IPA', total: 26200, method: 'delivery', status: 'entregado', time: '20:40' },
  { id: '#1032', customer: 'Sofi K.', items: '1x Nachos Desembarco, 1x Nuggets', total: 12000, method: 'retiro', status: 'cancelado', time: '20:20' },
];
