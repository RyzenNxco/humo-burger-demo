import { businessConfig } from '../config/business';

export function formatPrice(value: number): string {
  return `${businessConfig.currencySymbol}${value.toLocaleString('es-AR')}`;
}
