import { branches } from '../../config/business';
import { isBranchOpenNow } from '../../utils/hours';

export default function AdminBranches() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-display text-2xl text-cream sm:text-3xl">Sucursales</h1>
          <p className="mt-1 text-sm text-cream-dim">Gestión de locales, direcciones y contacto.</p>
        </div>
        <button className="rounded-full ember-gradient px-5 py-2.5 text-sm font-bold text-ink">
          + Agregar sucursal
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {branches.map((b) => {
          const open = isBranchOpenNow(b);
          return (
            <div key={b.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-ink-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-cream">{b.name}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${open ? 'bg-green/15 text-green' : 'bg-red/15 text-red'}`}>
                    {open ? 'Abierto' : 'Cerrado'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-cream-dim">{b.address}, {b.city}</p>
                <p className="text-xs text-cream-dim/60">{b.phone}</p>
              </div>
              <button className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-semibold text-cream-dim hover:border-ember hover:text-ember">
                Editar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
