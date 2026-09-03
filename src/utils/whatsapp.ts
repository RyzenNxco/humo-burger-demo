import type { CartItem, DeliveryMethod, PaymentMethod } from '../types';
import { getLineTotal } from '../context/CartContext';
import { formatPrice } from './format';

export interface CheckoutInfo {
  method: DeliveryMethod;
  payment: PaymentMethod;
  name: string;
  phone: string;
  address?: string;
  locality?: string;
  reference?: string;
  branchName?: string;
  estimatedTime?: string;
  notes?: string;
}

const paymentLabels: Record<PaymentMethod, string> = {
  efectivo: 'Efectivo',
  transferencia: 'Transferencia bancaria',
  mercadopago: 'Mercado Pago',
  tarjeta: 'Tarjeta (POS al recibir/retirar)',
};

export function buildWhatsAppMessage(
  items: CartItem[],
  info: CheckoutInfo,
  shippingCost: number,
  whatsappNumber: string
): { text: string; url: string } {
  const lines: string[] = [];
  lines.push('🍔 *Nuevo pedido — El Desembarco*');
  lines.push('');
  lines.push(`👤 Nombre: ${info.name}`);
  lines.push(`📱 Teléfono: ${info.phone}`);
  lines.push('');
  lines.push('*Detalle del pedido:*');

  items.forEach((item) => {
    const sizeLabel = item.size && item.size.priceDiff > 0 ? ` (${item.size.label})` : '';
    lines.push(`▪ ${item.quantity}x ${item.name}${sizeLabel} — ${formatPrice(getLineTotal(item))}`);
    if (item.extras.length) {
      lines.push(`   + Extras: ${item.extras.map((e) => e.label).join(', ')}`);
    }
    if (item.removed.length) {
      lines.push(`   − Sin: ${item.removed.join(', ')}`);
    }
    if (item.notes) {
      lines.push(`   📝 ${item.notes}`);
    }
  });

  const subtotal = items.reduce((sum, i) => sum + getLineTotal(i), 0);
  const total = subtotal + shippingCost;

  lines.push('');
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  if (info.method === 'delivery') {
    lines.push(`Envío estimado: ${formatPrice(shippingCost)}`);
  }
  lines.push(`*Total: ${formatPrice(total)}*`);
  lines.push('');

  if (info.method === 'delivery') {
    lines.push('🛵 *Método de entrega:* Delivery');
    lines.push(`📍 Dirección: ${info.address ?? '-'}`);
    if (info.locality) lines.push(`🏙️ Localidad: ${info.locality}`);
    if (info.reference) lines.push(`ℹ️ Referencias: ${info.reference}`);
  } else {
    lines.push('🏠 *Método de entrega:* Retiro en local');
    if (info.branchName) lines.push(`📍 Sucursal: ${info.branchName}`);
    if (info.estimatedTime) lines.push(`🕒 Horario estimado: ${info.estimatedTime}`);
  }

  lines.push('');
  lines.push(`💳 Método de pago: ${paymentLabels[info.payment]}`);

  const text = lines.join('\n');
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  return { text, url };
}
