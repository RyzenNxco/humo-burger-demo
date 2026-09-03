import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ExtraOption, Product, SizeOption } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Minus, Plus, X, Check } from './icons';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  return (
    <AnimatePresence>
      {product && <ModalContent key={product.id} product={product} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<SizeOption | undefined>(product.sizes?.[0]);
  const [extras, setExtras] = useState<ExtraOption[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = useMemo(() => {
    const sizeDiff = size?.priceDiff ?? 0;
    const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
    return product.price + sizeDiff + extrasTotal;
  }, [product.price, size, extras]);

  function toggleExtra(extra: ExtraOption) {
    setExtras((prev) =>
      prev.some((e) => e.id === extra.id) ? prev.filter((e) => e.id !== extra.id) : [...prev, extra]
    );
  }

  function toggleRemoved(label: string) {
    setRemoved((prev) => (prev.includes(label) ? prev.filter((r) => r !== label) : [...prev, label]));
  }

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      basePrice: product.price,
      size,
      extras,
      removed,
      notes: notes.trim() || undefined,
      quantity,
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 550);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-ink-soft sm:max-w-lg sm:rounded-3xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto">
          <div className="relative h-56 w-full shrink-0 sm:h-64">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-transparent to-transparent" />
          </div>

          <div className="px-5 pb-6 pt-2 sm:px-6">
            <h3 className="text-display text-2xl text-cream">{product.name}</h3>
            <p className="mt-1 text-sm text-cream-dim">{product.description}</p>
            <p className="mt-2 text-xs text-cream-dim/70">{product.ingredients}</p>

            {product.sizes && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-cream-dim">Elegí la carne</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s)}
                      className={`rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition-colors ${
                        size?.id === s.id
                          ? 'border-ember bg-ember/10 text-ember'
                          : 'border-line text-cream-dim hover:border-cream-dim'
                      }`}
                    >
                      {s.label}
                      {s.priceDiff > 0 && (
                        <span className="mt-0.5 block text-[10px] font-normal">
                          +{formatPrice(s.priceDiff)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.extras && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-cream-dim">Sumale extras</p>
                <div className="mt-2 space-y-1.5">
                  {product.extras.map((extra) => {
                    const selected = extras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra)}
                        className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                          selected ? 'border-ember bg-ember/10' : 'border-line hover:border-cream-dim'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-cream">
                          <span
                            className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
                              selected ? 'border-ember bg-ember text-ink' : 'border-cream-dim/50'
                            }`}
                          >
                            {selected && <Check className="h-3 w-3" />}
                          </span>
                          {extra.label}
                        </span>
                        <span className="text-cream-dim">+{formatPrice(extra.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.removable && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-cream-dim">Preferencias</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.removable.map((r) => {
                    const selected = removed.includes(r.label);
                    return (
                      <button
                        key={r.id}
                        onClick={() => toggleRemoved(r.label)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          selected
                            ? 'border-red bg-red/10 text-red'
                            : 'border-line text-cream-dim hover:border-cream-dim'
                        }`}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-cream-dim">Notas (opcional)</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: cortar al medio, salsa aparte..."
                rows={2}
                className="mt-2 w-full resize-none rounded-xl border border-line bg-ink px-3 py-2 text-sm text-cream placeholder:text-cream-dim/50 focus:border-ember focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-line bg-ink-soft px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
              aria-label="Restar"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-bold text-cream">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
              aria-label="Sumar"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex flex-1 items-center justify-between rounded-full ember-gradient px-5 py-3.5 text-sm font-bold text-ink transition-transform active:scale-[0.98]"
          >
            <span>{justAdded ? '¡Agregado! ✓' : 'Agregar al pedido'}</span>
            <span>{formatPrice(unitPrice * quantity)}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
