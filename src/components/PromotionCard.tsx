import { useNavigate } from 'react-router-dom';
import type { Promotion } from '../types';
import { formatPrice } from '../utils/format';

export default function PromotionCard({ promo }: { promo: Promotion }) {
  const navigate = useNavigate();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-card">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={promo.image}
          alt={promo.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full ember-gradient px-3 py-1 text-[11px] font-black uppercase tracking-wide text-ink">
          Promo
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-display text-lg text-cream">{promo.name}</h3>
        <p className="mt-1 text-sm text-cream-dim">{promo.description}</p>
        <p className="mt-2 text-xs font-medium text-gold">{promo.validity}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            {promo.oldPrice && (
              <span className="mr-2 text-xs text-cream-dim/60 line-through">
                {formatPrice(promo.oldPrice)}
              </span>
            )}
            {promo.price > 0 && (
              <span className="text-lg font-extrabold text-ember">{formatPrice(promo.price)}</span>
            )}
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-bold text-cream transition-colors hover:bg-ember hover:text-ink"
          >
            Pedir promo
          </button>
        </div>
      </div>
    </div>
  );
}
