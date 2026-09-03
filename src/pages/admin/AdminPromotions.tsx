import { useState } from 'react';
import { promotions as initialPromos } from '../../data/promotions';
import { formatPrice } from '../../utils/format';

export default function AdminPromotions() {
  const [promos, setPromos] = useState(initialPromos);

  function toggle(id: string) {
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-display text-2xl text-cream sm:text-3xl">Promociones</h1>
          <p className="mt-1 text-sm text-cream-dim">Activá o pausá promos sin tocar el menú.</p>
        </div>
        <button className="rounded-full ember-gradient px-5 py-2.5 text-sm font-bold text-ink">
          + Nueva promo
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {promos.map((promo) => (
          <div key={promo.id} className="overflow-hidden rounded-2xl border border-line bg-ink-card">
            <img src={promo.image} alt={promo.name} className="h-32 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-cream">{promo.name}</p>
                <button
                  onClick={() => toggle(promo.id)}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    promo.active ? 'bg-green/15 text-green' : 'bg-line text-cream-dim'
                  }`}
                >
                  {promo.active ? 'Activa' : 'Pausada'}
                </button>
              </div>
              <p className="mt-1 text-xs text-cream-dim">{promo.validity}</p>
              {promo.price > 0 && (
                <p className="mt-2 text-sm font-bold text-ember">{formatPrice(promo.price)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
