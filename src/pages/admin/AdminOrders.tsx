import { useState } from 'react';
import { demoOrders } from '../../data/orders';
import { formatPrice } from '../../utils/format';
import type { OrderStatus } from '../../types';
import { StatusBadge } from './AdminDashboard';

const statusFlow: OrderStatus[] = [
  'nuevo',
  'confirmado',
  'preparando',
  'listo',
  'en-camino',
  'entregado',
  'cancelado',
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(demoOrders);

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div>
      <h1 className="text-display text-2xl text-cream sm:text-3xl">Pedidos</h1>
      <p className="mt-1 text-sm text-cream-dim">
        Cambiá el estado de cada pedido a medida que avanza. (Cambios solo en esta sesión demo.)
      </p>

      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-ink-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-cream">{o.id}</p>
                <StatusBadge status={o.status} />
                <span className="text-xs text-cream-dim/60">
                  {o.method === 'delivery' ? '🛵 Delivery' : '🏠 Retiro'} · {o.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-cream-dim">{o.customer} — {o.items}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-bold text-ember">{formatPrice(o.total)}</span>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                className="rounded-lg border border-line bg-ink px-2.5 py-2 text-xs text-cream focus:border-ember focus:outline-none"
              >
                {statusFlow.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
