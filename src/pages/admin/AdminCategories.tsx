import { categories } from '../../data/categories';
import { products } from '../../data/products';

export default function AdminCategories() {
  return (
    <div>
      <h1 className="text-display text-2xl text-cream sm:text-3xl">Categorías</h1>
      <p className="mt-1 text-sm text-cream-dim">Organización del menú digital.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <div key={c.id} className="flex items-center justify-between rounded-2xl border border-line bg-ink-card p-4">
              <div>
                <p className="font-bold text-cream">{c.label}</p>
                <p className="text-xs text-cream-dim">{count} productos</p>
              </div>
              <button className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-cream-dim hover:border-ember hover:text-ember">
                Editar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
