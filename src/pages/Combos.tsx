import { combos } from '../data/combos';
import ComboCard from '../components/ComboCard';

export default function Combos() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Para compartir</p>
        <h1 className="text-display mt-2 text-4xl text-cream sm:text-5xl">Combos</h1>
        <p className="mt-2 text-sm text-cream-dim sm:text-base">
          Solo, en pareja o con toda la banda. Elegí tus hamburguesas y listo.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo) => (
          <ComboCard key={combo.id} combo={combo} />
        ))}
      </div>
    </div>
  );
}
