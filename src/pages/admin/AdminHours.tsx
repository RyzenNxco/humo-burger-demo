import { branches } from '../../config/business';

export default function AdminHours() {
  return (
    <div>
      <h1 className="text-display text-2xl text-cream sm:text-3xl">Horarios</h1>
      <p className="mt-1 text-sm text-cream-dim">Horarios de atención por sucursal.</p>

      <div className="mt-6 space-y-4">
        {branches.map((b) => (
          <div key={b.id} className="rounded-2xl border border-line bg-ink-card p-4">
            <p className="font-bold text-cream">{b.name}</p>
            <div className="mt-3 space-y-2">
              {b.hours.map((h) => (
                <div key={h.days} className="flex items-center justify-between rounded-lg bg-ink px-3 py-2 text-sm">
                  <span className="text-cream-dim">{h.days}</span>
                  <span className="font-medium text-cream">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
