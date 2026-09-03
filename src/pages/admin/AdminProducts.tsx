import { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import { categories } from '../../data/categories';
import { formatPrice } from '../../utils/format';

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('todas');

  function toggleActive(id: string) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }
  function toggleStock(id: string) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: !p.stock } : p)));
  }

  const visible = filter === 'todas' ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-display text-2xl text-cream sm:text-3xl">Productos</h1>
          <p className="mt-1 text-sm text-cream-dim">
            Activá, desactivá o marcá sin stock. ({products.length} productos)
          </p>
        </div>
        <button className="rounded-full ember-gradient px-5 py-2.5 text-sm font-bold text-ink">
          + Crear producto
        </button>
      </div>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter('todas')}
          className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
            filter === 'todas' ? 'border-ember bg-ember/10 text-ember' : 'border-line text-cream-dim'
          }`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
              filter === c.id ? 'border-ember bg-ember/10 text-ember' : 'border-line text-cream-dim'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink-card">
            <tr className="text-xs uppercase tracking-wide text-cream-dim">
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Activo</th>
              <th className="px-4 py-3">Stock</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id} className="border-t border-line bg-ink-soft">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="font-medium text-cream">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-cream-dim">
                  {categories.find((c) => c.id === p.category)?.label}
                </td>
                <td className="px-4 py-3 text-cream-dim">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <Toggle checked={p.active !== false} onChange={() => toggleActive(p.id)} />
                </td>
                <td className="px-4 py-3">
                  <Toggle checked={p.stock !== false} onChange={() => toggleStock(p.id)} tone="gold" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  tone = 'green',
}: {
  checked: boolean;
  onChange: () => void;
  tone?: 'green' | 'gold';
}) {
  const activeColor = tone === 'green' ? 'bg-green' : 'bg-gold';
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? activeColor : 'bg-line'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
