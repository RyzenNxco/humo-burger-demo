export type Tag =
  | 'bestseller'
  | 'recommended'
  | 'veggie'
  | 'glutenfree'
  | 'new'
  | 'double';

export type ProductCategory =
  | 'mas-vendidas'
  | 'simples'
  | 'dobles'
  | 'triples'
  | 'pollo'
  | 'veggie'
  | 'sin-tacc'
  | 'papas'
  | 'entradas'
  | 'bebidas'
  | 'postres'
  | 'extras';

export interface SizeOption {
  id: 'simple' | 'doble' | 'triple';
  label: string;
  priceDiff: number;
}

export interface ExtraOption {
  id: string;
  label: string;
  price: number;
}

export interface RemovableIngredient {
  id: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  image: string;
  category: ProductCategory;
  tags: Tag[];
  customizable?: boolean;
  sizes?: SizeOption[];
  extras?: ExtraOption[];
  removable?: RemovableIngredient[];
  active?: boolean;
  stock?: boolean;
}

export interface ComboItem {
  id: string;
  name: string;
  description: string;
  includes: string[];
  burgerChoices: number;
  price: number;
  oldPrice?: number;
  image: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  image: string;
  oldPrice?: number;
  price: number;
  validity: string;
  active: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  demo: true;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  hours: { days: string; time: string }[];
  isOpenOverride?: 'open' | 'closed' | 'auto';
  mapsUrl: string;
  lat: number;
  lng: number;
}

export type CartSize = 'simple' | 'doble' | 'triple';

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  size?: SizeOption;
  extras: ExtraOption[];
  removed: string[];
  notes?: string;
  quantity: number;
}

export type DeliveryMethod = 'delivery' | 'retiro';
export type PaymentMethod = 'efectivo' | 'transferencia' | 'mercadopago' | 'tarjeta';

export type OrderStatus =
  | 'nuevo'
  | 'confirmado'
  | 'preparando'
  | 'listo'
  | 'en-camino'
  | 'entregado'
  | 'cancelado';

export interface DemoOrder {
  id: string;
  customer: string;
  items: string;
  total: number;
  method: DeliveryMethod;
  status: OrderStatus;
  time: string;
}
