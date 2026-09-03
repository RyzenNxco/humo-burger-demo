import { businessConfig } from '../config/business';
import { WhatsApp, Truck, ChevronRight } from '../components/icons';

const options = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Armá tu pedido en el sitio y lo confirmamos por chat. El más rápido.',
    cta: 'Escribir por WhatsApp',
    href: `https://wa.me/${businessConfig.whatsappNumber}`,
    accent: 'bg-green text-white',
  },
  {
    id: 'propio',
    name: 'Delivery propio',
    description: 'Nuestros repartidores, sin intermediarios. Seguimiento por WhatsApp.',
    cta: 'Pedir delivery propio',
    href: '/pedido',
    accent: 'ember-gradient text-ink',
  },
  {
    id: 'pedidosya',
    name: 'PedidosYa',
    description: 'Pedí desde la app con tus métodos de pago habituales.',
    cta: 'Ir a PedidosYa',
    href: businessConfig.deliveryLinks.pedidosYa,
    accent: 'bg-ink-card text-cream border border-line',
  },
  {
    id: 'rappi',
    name: 'Rappi',
    description: 'Disponible en todas nuestras sucursales.',
    cta: 'Ir a Rappi',
    href: businessConfig.deliveryLinks.rappi,
    accent: 'bg-ink-card text-cream border border-line',
  },
];

export default function Delivery() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full ember-gradient text-ink">
          <Truck className="h-7 w-7" />
        </span>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-ember">Delivery</p>
        <h1 className="text-display mt-2 text-4xl text-cream sm:text-5xl">Pedí como quieras</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-cream-dim sm:text-base">
          Elegí el canal que más te guste. Mismo menú, mismos precios, en todos lados.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex flex-col justify-between rounded-2xl border border-line bg-ink-card p-6"
          >
            <div>
              <h3 className="text-display text-xl text-cream">{opt.name}</h3>
              <p className="mt-2 text-sm text-cream-dim">{opt.description}</p>
            </div>
            <a
              href={opt.href}
              target={opt.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 ${opt.accent}`}
            >
              {opt.cta} <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-line p-6 text-center text-sm text-cream-dim">
        <WhatsApp className="h-4 w-4 text-green" />
        Los enlaces de delivery se configuran una sola vez en{' '}
        <code className="rounded bg-ink px-1.5 py-0.5 text-xs">src/config/business.ts</code>
      </div>
    </div>
  );
}
