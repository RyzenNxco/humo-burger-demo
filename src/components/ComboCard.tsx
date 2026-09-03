import { useState } from 'react';
import type { ComboItem, Product } from '../types';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Check } from './icons';

const burgerOptions = products.filter((p) =>
  ['mas-vendidas', 'simples', 'dobles', 'triples', 'pollo', 'veggie'].includes(p.category)
);

export default function ComboCard({ combo }: { combo: ComboItem }) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product[]>([]);
  const [added, setAdded] = useState(false);

  function toggleBurger(product: Product) {
    setSelected((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= combo.burgerChoices) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  }

  function handleAdd() {
    addItem({
      productId: combo.id,
      name: `${combo.name}${selected.length ? ` (${selected.map((s) => s.name).join(' + ')})` : ''}`,
      image: combo.image,
      basePrice: combo.price,
      extras: [],
      removed: [],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-card">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img src={combo.image} alt={combo.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-display text-lg text-cream">{combo.name}</h3>
        <p className="mt-1 text-sm text-cream-dim">{combo.description}</p>
        <ul className="mt-3 space-y-1">
          {combo.includes.map((inc) => (
            <li key={inc} className="flex items-center gap-2 text-xs text-cream-dim">
              <Check className="h-3.5 w-3.5 text-ember" /> {inc}
            </li>
          ))}
        </ul>

        {combo.burgerChoices > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-xs font-bold text-gold underline underline-offset-2"
            >
              {open ? 'Ocultar selección de burgers' : `Elegir ${combo.burgerChoices} hamburguesa${combo.burgerChoices > 1 ? 's' : ''}`}
            </button>
            {open && (
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {burgerOptions.slice(0, 8).map((p) => {
                  const isSelected = selected.some((s) => s.id === p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleBurger(p)}
                      className={`truncate rounded-lg border px-2 py-1.5 text-left text-[11px] font-medium transition-colors ${
                        isSelected
                          ? 'border-ember bg-ember/10 text-ember'
                          : 'border-line text-cream-dim hover:border-cream-dim'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            {combo.oldPrice && (
              <span className="mr-2 text-xs text-cream-dim/60 line-through">
                {formatPrice(combo.oldPrice)}
              </span>
            )}
            <span className="text-lg font-extrabold text-ember">{formatPrice(combo.price)}</span>
          </div>
          <button
            onClick={handleAdd}
            className="shrink-0 rounded-full ember-gradient px-4 py-2 text-xs font-bold text-ink transition-transform active:scale-95"
          >
            {added ? '¡Agregado! ✓' : 'Agregar combo'}
          </button>
        </div>
      </div>
    </div>
  );
}
