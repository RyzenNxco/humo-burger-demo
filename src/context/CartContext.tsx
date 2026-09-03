import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cartId'>) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineTotal(item: CartItem): number {
  const sizeDiff = item.size?.priceDiff ?? 0;
  const extrasTotal = item.extras.reduce((sum, e) => sum + e.price, 0);
  return (item.basePrice + sizeDiff + extrasTotal) * item.quantity;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function addItem(item: Omit<CartItem, 'cartId'>) {
    const cartId = `${item.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((prev) => [...prev, { ...item, cartId }]);
    setIsDrawerOpen(true);
  }

  function removeItem(cartId: string) {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }

  function updateQuantity(cartId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(cartId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + lineTotal(i), 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}

export function getLineTotal(item: CartItem): number {
  return lineTotal(item);
}
