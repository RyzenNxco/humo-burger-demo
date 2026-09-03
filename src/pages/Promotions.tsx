import { promotions } from '../data/promotions';
import PromotionCard from '../components/PromotionCard';

export default function Promotions() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Ofertas activas</p>
        <h1 className="text-display mt-2 text-4xl text-cream sm:text-5xl">Promociones</h1>
        <p className="mt-2 text-sm text-cream-dim sm:text-base">
          Descuentos reales, sin letra chica. Válidas en todas nuestras sucursales.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo) => (
          <PromotionCard key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  );
}
