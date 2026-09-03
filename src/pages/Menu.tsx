import { useMemo, useState } from 'react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import type { Product } from '../types';

const allCategories = [{ id: 'todas' as const, label: 'Todas' }, ...categories];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(() => {
    return products.filter((p) => {
      if (p.active === false) return false;
      const matchesCategory = activeCategory === 'todas' || p.category === activeCategory;
      const matchesQuery =
        query.trim() === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.ingredients.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Menú digital</p>
        <h1 className="text-display mt-2 text-4xl text-cream sm:text-5xl">Elegí tu próxima burger</h1>
        <p className="mt-2 text-sm text-cream-dim sm:text-base">
          {products.length}+ productos. Personalizá cada hamburguesa a tu gusto.
        </p>
      </div>

      <div className="mt-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <CategoryTabs
        categories={allCategories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-24 text-center">
          <p className="text-lg font-bold text-cream">No encontramos nada con eso 🤔</p>
          <p className="text-sm text-cream-dim">Probá con otra palabra o mirá otra categoría.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 pb-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={setSelected} />
          ))}
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
