import { businessConfig } from '../../config/business';

const fields: { label: string; value: string }[] = [
  { label: 'Nombre de marca', value: businessConfig.fullName },
  { label: 'Slogan', value: businessConfig.slogan },
  { label: 'WhatsApp', value: `+${businessConfig.whatsappNumber}` },
  { label: 'Instagram', value: businessConfig.instagramHandle },
  { label: 'Email', value: businessConfig.email },
  { label: 'Teléfono', value: businessConfig.phone },
  { label: 'Moneda', value: businessConfig.currency },
];

export default function AdminSettings() {
  return (
    <div>
      <h1 className="text-display text-2xl text-cream sm:text-3xl">Configuración</h1>
      <p className="mt-1 text-sm text-cream-dim">
        Estos datos se editan una sola vez en{' '}
        <code className="rounded bg-ink-card px-1.5 py-0.5 text-xs">src/config/business.ts</code> y se
        actualizan en todo el sitio automáticamente.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label} className="rounded-2xl border border-line bg-ink-card p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-cream-dim">{f.label}</p>
            <p className="mt-1.5 text-sm text-cream">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-line p-5 text-sm text-cream-dim">
        Próximo paso sugerido: conectar este panel a Supabase o Firebase para persistencia real de
        productos, pedidos y usuarios.
      </div>
    </div>
  );
}
