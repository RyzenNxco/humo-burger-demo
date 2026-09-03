import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart, getLineTotal } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Minus, Plus, Trash, X, ShoppingBag } from './icons';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
        >
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col bg-ink-soft"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h3 className="text-display text-lg text-cream">Tu pedido</h3>
              <button
                onClick={closeDrawer}
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-cream-dim/40" />
                <p className="text-sm text-cream-dim">Todavía no agregaste nada. ¡Andá al menú y elegí tu burger!</p>
                <button
                  onClick={() => {
                    closeDrawer();
                    navigate('/menu');
                  }}
                  className="mt-2 rounded-full ember-gradient px-5 py-2.5 text-sm font-bold text-ink"
                >
                  Ver menú
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.cartId} className="flex gap-3 border-b border-line pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-cream">
                              {item.name}
                              {item.size && item.size.priceDiff > 0 ? ` (${item.size.label})` : ''}
                            </p>
                            <button
                              onClick={() => removeItem(item.cartId)}
                              className="shrink-0 text-cream-dim/50 hover:text-red"
                              aria-label="Quitar"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                          {item.extras.length > 0 && (
                            <p className="mt-0.5 truncate text-xs text-cream-dim">
                              + {item.extras.map((e) => e.label).join(', ')}
                            </p>
                          )}
                          {item.removed.length > 0 && (
                            <p className="mt-0.5 truncate text-xs text-cream-dim">
                              − {item.removed.join(', ')}
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-line px-1.5 py-1">
                              <button
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-4 text-center text-xs font-bold text-cream">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-ember">
                              {formatPrice(getLineTotal(item))}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-center justify-between text-sm text-cream-dim">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})</span>
                    <span className="font-bold text-cream">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-cream-dim/60">El envío se calcula en el siguiente paso.</p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      navigate('/pedido');
                    }}
                    className="mt-4 w-full rounded-full ember-gradient py-3.5 text-sm font-bold text-ink transition-transform active:scale-[0.98]"
                  >
                    Continuar pedido
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
