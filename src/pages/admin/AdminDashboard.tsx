import { demoOrders } from '../../data/orders';
import { formatPrice } from '../../utils/format';

const today = demoOrders;
const revenue = today.filter((o) => o.status !== 'cancelado').reduce((s, o) => s + o.total, 0);
const avgTicket = Math.round(revenue / today.filter((o) => o.status !== 'cancelado').length);
const pending = today.filter((o) => ['nuevo', 'confirmado'].includes(o.status)).length;
const preparing = today.filter((o) => o.status === 'preparando').length;
const delivered = today.filter((o) => o.status === 'entregado').length;

const stats = [
  { label: 'Pedidos de hoy', value: today.length },
  { label: 'Facturación de hoy', value: formatPrice(revenue) },
  { label: 'Ticket promedio', value: formatPrice(avgTicket) },
  { label: 'Producto más vendido', value: 'Doble Fuego' },
];

const statusStats = [
  { label: 'Pendientes', value: pending, color: 'text-gold' },
  { label: 'Preparando', value: preparing, color: 'text-ember' },
  { label: 'Entregados', value: delivered, color: 'text-green' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-display text-2xl text-cream sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-cream-dim">Resumen del día — datos de demostración.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-ink-card p-5">
            <p className="text-xs text-cream-dim">{s.label}</p>
            <p className="text-display mt-2 text-2xl text-cream">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {statusStats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-ink-card p-5 text-center">
            <p className={`text-display text-3xl ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-xs text-cream-dim">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-ink-card p-5">
        <h2 className="text-sm font-bold text-cream">Últimos pedidos</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-cream-dim">
                <th className="pb-2">Pedido</th>
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {today.slice(0, 6).map((o) => (
                <tr key={o.id} className="border-t border-line/60">
                  <td className="py-2.5 font-medium text-cream">{o.id}</td>
                  <td className="py-2.5 text-cream-dim">{o.customer}</td>
                  <td className="py-2.5 text-cream-dim">{formatPrice(o.total)}</td>
                  <td className="py-2.5">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    nuevo: 'bg-gold/15 text-gold',
    confirmado: 'bg-cream/15 text-cream',
    preparando: 'bg-ember/15 text-ember',
    listo: 'bg-green/15 text-green',
    'en-camino': 'bg-green/15 text-green',
    entregado: 'bg-line text-cream-dim',
    cancelado: 'bg-red/15 text-red',
  };
  const labels: Record<string, string> = {
    nuevo: 'Nuevo',
    confirmado: 'Confirmado',
    preparando: 'Preparando',
    listo: 'Listo',
    'en-camino': 'En camino',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${map[status]}`}>
      {labels[status]}
    </span>
  );
}
