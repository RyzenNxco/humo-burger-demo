import { branches } from '../config/business';
import BranchCard from '../components/BranchCard';

export default function Branches() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Nuestros locales</p>
        <h1 className="text-display mt-2 text-4xl text-cream sm:text-5xl">Encontrá tu local</h1>
        <p className="mt-2 text-sm text-cream-dim sm:text-base">
          Horarios, dirección y WhatsApp directo de cada sucursal.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-line">
        <iframe
          title="Mapa de sucursales"
          className="h-72 w-full grayscale sm:h-96"
          loading="lazy"
          src="https://maps.google.com/maps?q=Buenos%20Aires%2C%20Argentina&t=&z=11&ie=UTF8&iwloc=&output=embed"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => (
          <BranchCard key={b.id} branch={b} />
        ))}
      </div>
    </div>
  );
}
