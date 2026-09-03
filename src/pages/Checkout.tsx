import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, getLineTotal } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { buildWhatsAppMessage, type CheckoutInfo } from '../utils/whatsapp';
import { businessConfig, branches } from '../config/business';
import type { DeliveryMethod, PaymentMethod } from '../types';
import { Minus, Plus, Trash, Check, ChevronRight, WhatsApp } from '../components/icons';

type Step = 'carrito' | 'metodo' | 'datos' | 'pago' | 'confirmar';

const steps: { id: Step; label: string }[] = [
  { id: 'carrito', label: 'Carrito' },
  { id: 'metodo', label: 'Entrega' },
  { id: 'datos', label: 'Datos' },
  { id: 'pago', label: 'Pago' },
  { id: 'confirmar', label: 'Confirmar' },
];

const paymentOptions: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: 'efectivo', label: 'Efectivo', hint: 'Pagás al recibir o retirar' },
  { id: 'transferencia', label: 'Transferencia', hint: 'Te pasamos el CBU/alias' },
  { id: 'mercadopago', label: 'Mercado Pago', hint: 'Link de pago por WhatsApp' },
  { id: 'tarjeta', label: 'Tarjeta', hint: 'POS al recibir o retirar' },
];

const SHIPPING_COST = 2500;

export default function Checkout() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('carrito');
  const [method, setMethod] = useState<DeliveryMethod>('delivery');
  const [payment, setPayment] = useState<PaymentMethod>('efectivo');
  const [branchId, setBranchId] = useState(branches[0]?.id);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    locality: '',
    reference: '',
    estimatedTime: '',
    notes: '',
  });

  const shippingCost = method === 'delivery' ? SHIPPING_COST : 0;
  const total = subtotal + shippingCost;

  const stepIndex = steps.findIndex((s) => s.id === step);

  const canContinueFromDatos = useMemo(() => {
    if (!form.name.trim() || !form.phone.trim()) return false;
    if (method === 'delivery' && !form.address.trim()) return false;
    return true;
  }, [form, method]);

  function goNext() {
    const order = ['carrito', 'metodo', 'datos', 'pago', 'confirmar'] as Step[];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  }
  function goBack() {
    const order = ['carrito', 'metodo', 'datos', 'pago', 'confirmar'] as Step[];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  }

  function handleSendWhatsApp() {
    const branch = branches.find((b) => b.id === branchId);
    const info: CheckoutInfo = {
      method,
      payment,
      name: form.name,
      phone: form.phone,
      address: form.address,
      locality: form.locality,
      reference: form.reference,
      branchName: branch?.name,
      estimatedTime: form.estimatedTime,
      notes: form.notes,
    };
    const { url } = buildWhatsAppMessage(items, info, shippingCost, businessConfig.whatsappNumber);
    window.open(url, '_blank');
    clearCart();
    navigate('/');
  }

  if (items.length === 0 && step === 'carrito') {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-display text-3xl text-cream">Tu carrito está vacío</h1>
        <p className="text-sm text-cream-dim">Elegí algo rico del menú para arrancar tu pedido.</p>
        <Link to="/menu" className="mt-2 rounded-full ember-gradient px-6 py-3 text-sm font-bold text-ink">
          Ver menú
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-display text-3xl text-cream sm:text-4xl">Tu pedido</h1>

      {/* STEP INDICATOR */}
      <div className="no-scrollbar mt-6 flex items-center gap-2 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s.id} className="flex shrink-0 items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                i <= stepIndex ? 'ember-gradient text-ink' : 'bg-ink-card text-cream-dim'
              }`}
            >
              {i < stepIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={`text-xs font-medium ${i <= stepIndex ? 'text-cream' : 'text-cream-dim/50'}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-4 bg-line" />}
          </div>
        ))}
      </div>

      <div className="mt-8">
        {step === 'carrito' && (
          <div>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.cartId}
                  className="flex gap-3 rounded-2xl border border-line bg-ink-card p-3"
                >
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-cream">
                        {item.name}
                        {item.size && item.size.priceDiff > 0 ? ` (${item.size.label})` : ''}
                      </p>
                      <button onClick={() => removeItem(item.cartId)} className="text-cream-dim/50 hover:text-red">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                    {item.extras.length > 0 && (
                      <p className="text-xs text-cream-dim">+ {item.extras.map((e) => e.label).join(', ')}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-line px-1.5 py-1">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center text-xs font-bold text-cream">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-cream-dim hover:bg-ink"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-ember">{formatPrice(getLineTotal(item))}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <SummaryBox subtotal={subtotal} shipping={0} total={subtotal} showShipping={false} />
          </div>
        )}

        {step === 'metodo' && (
          <div>
            <p className="text-sm font-bold text-cream">¿Cómo querés recibir tu pedido?</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod('delivery')}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  method === 'delivery' ? 'border-ember bg-ember/10' : 'border-line'
                }`}
              >
                <p className="font-bold text-cream">🛵 Delivery</p>
                <p className="mt-1 text-xs text-cream-dim">Te lo llevamos a tu dirección</p>
              </button>
              <button
                onClick={() => setMethod('retiro')}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  method === 'retiro' ? 'border-ember bg-ember/10' : 'border-line'
                }`}
              >
                <p className="font-bold text-cream">🏠 Retiro en local</p>
                <p className="mt-1 text-xs text-cream-dim">Lo retirás vos en la sucursal</p>
              </button>
            </div>
            <SummaryBox subtotal={subtotal} shipping={shippingCost} total={total} />
          </div>
        )}

        {step === 'datos' && (
          <div className="space-y-4">
            <Field label="Nombre y apellido" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

            {method === 'delivery' ? (
              <>
                <Field label="Dirección" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                <Field label="Localidad" value={form.locality} onChange={(v) => setForm({ ...form, locality: v })} />
                <Field
                  label="Referencias (opcional)"
                  value={form.reference}
                  onChange={(v) => setForm({ ...form, reference: v })}
                />
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-cream-dim">Sucursal</label>
                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-ink px-3 py-3 text-sm text-cream focus:border-ember focus:outline-none"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.address}
                      </option>
                    ))}
                  </select>
                </div>
                <Field
                  label="Horario estimado de retiro"
                  value={form.estimatedTime}
                  onChange={(v) => setForm({ ...form, estimatedTime: v })}
                  placeholder="Ej: hoy 21:00hs"
                />
              </>
            )}
            <SummaryBox subtotal={subtotal} shipping={shippingCost} total={total} />
          </div>
        )}

        {step === 'pago' && (
          <div>
            <p className="text-sm font-bold text-cream">¿Cómo vas a pagar?</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    payment === opt.id ? 'border-ember bg-ember/10' : 'border-line'
                  }`}
                >
                  <p className="text-sm font-bold text-cream">{opt.label}</p>
                  <p className="mt-1 text-xs text-cream-dim">{opt.hint}</p>
                </button>
              ))}
            </div>
            <SummaryBox subtotal={subtotal} shipping={shippingCost} total={total} />
          </div>
        )}

        {step === 'confirmar' && (
          <div>
            <div className="rounded-2xl border border-line bg-ink-card p-5">
              <p className="text-sm font-bold text-cream">Resumen del pedido</p>
              <ul className="mt-3 space-y-1.5 text-xs text-cream-dim">
                {items.map((i) => (
                  <li key={i.cartId}>
                    {i.quantity}x {i.name} — {formatPrice(getLineTotal(i))}
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
                <div className="flex justify-between text-cream-dim">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {method === 'delivery' && (
                  <div className="flex justify-between text-cream-dim">
                    <span>Envío estimado</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-cream">
                  <span>Total</span>
                  <span className="text-ember">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-1 border-t border-line pt-3 text-xs text-cream-dim">
                <p>👤 {form.name} · {form.phone}</p>
                {method === 'delivery' ? (
                  <p>📍 {form.address}{form.locality ? `, ${form.locality}` : ''}</p>
                ) : (
                  <p>🏠 Retiro en {branches.find((b) => b.id === branchId)?.name}</p>
                )}
                <p>💳 {paymentOptions.find((p) => p.id === payment)?.label}</p>
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green py-4 text-sm font-bold text-white transition-transform active:scale-[0.98]"
            >
              <WhatsApp className="h-5 w-5" /> Enviar pedido por WhatsApp
            </button>
            <p className="mt-2 text-center text-xs text-cream-dim/60">
              Se abrirá WhatsApp con tu pedido ya armado. Solo tenés que enviarlo.
            </p>
          </div>
        )}
      </div>

      {/* NAV BUTTONS */}
      {step !== 'confirmar' && (
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={goBack}
            disabled={step === 'carrito'}
            className="rounded-full border border-line px-5 py-3 text-sm font-bold text-cream-dim disabled:opacity-0"
          >
            Atrás
          </button>
          <button
            onClick={goNext}
            disabled={step === 'datos' && !canContinueFromDatos}
            className="flex items-center gap-2 rounded-full ember-gradient px-7 py-3 text-sm font-bold text-ink disabled:opacity-40"
          >
            Continuar <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wide text-cream-dim">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-ink px-3 py-3 text-sm text-cream placeholder:text-cream-dim/50 focus:border-ember focus:outline-none"
      />
    </div>
  );
}

function SummaryBox({
  subtotal,
  shipping,
  total,
  showShipping = true,
}: {
  subtotal: number;
  shipping: number;
  total: number;
  showShipping?: boolean;
}) {
  return (
    <div className="mt-6 space-y-1 rounded-2xl border border-line bg-ink-card p-4 text-sm">
      <div className="flex justify-between text-cream-dim">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {showShipping && (
        <div className="flex justify-between text-cream-dim">
          <span>Envío estimado</span>
          <span>{shipping > 0 ? formatPrice(shipping) : 'A definir'}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-line pt-2 font-bold text-cream">
        <span>Total</span>
        <span className="text-ember">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
