import type { Product, Tag } from '../types';
import { formatPrice } from '../utils/format';

const tagStyles: Record<Tag, { label: string; className: string }> = {
  bestseller: { label: '🔥 Más vendida', className: 'bg-ember/15 text-ember' },
  recommended: { label: '⭐ Recomendada', className: 'bg-gold/15 text-gold' },
  veggie: { label: '🌱 Veggie', className: 'bg-green/15 text-green' },
  glutenfree: { label: '🌾 Sin TACC', className: 'bg-cream/15 text-cream' },
  new: { label: '🆕 Nueva', className: 'bg-ember/15 text-ember' },
  double: { label: '💣 Doble carne', className: 'bg-red/15 text-red' },
};

interface Props {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: Props) {
  const isOut = product.stock === false;

  return (
    <button
      onClick={() => !isOut && onSelect(product)}
      disabled={isOut}
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-card text-left transition-all hover:-translate-y-1 hover:border-ember/60 hover:shadow-glow ${
        isOut ? 'opacity-50' : ''
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.tags.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className={`rounded-full px-2 py-1 text-[10px] font-bold backdrop-blur-sm ${tagStyles[t].className}`}
              >
                {tagStyles[t].label}
              </span>
            ))}
          </div>
        )}
        {isOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/70">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-cream-dim">
              Sin stock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-sm font-bold text-cream leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-cream-dim">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-extrabold text-ember">{formatPrice(product.price)}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full ember-gradient text-ink text-base font-bold transition-transform group-hover:scale-110">
            +
          </span>
        </div>
      </div>
    </button>
  );
}
