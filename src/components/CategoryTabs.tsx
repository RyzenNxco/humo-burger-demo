import { useRef } from 'react';
import type { ProductCategory } from '../types';

interface Props {
  categories: { id: ProductCategory | 'todas'; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="no-scrollbar sticky top-16 z-30 -mx-4 flex gap-2 overflow-x-auto bg-ink/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            active === cat.id
              ? 'border-ember bg-ember text-ink'
              : 'border-line text-cream-dim hover:border-cream-dim hover:text-cream'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
