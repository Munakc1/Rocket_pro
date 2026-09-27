"use client";

import { create, persist } from "@lacspace/store";
import { createCart, addItem, setQty, removeItem, type Cart } from "@lacspace/cart";

const EMPTY: Cart = createCart({ currency: "NPR" });

export interface AddInput {
  id: string;
  name: string;
  unitPrice: number;
  qty?: number;
  meta?: Record<string, unknown>;
}

interface CartStore {
  cart: Cart;
  add: (item: AddInput) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

// @lacspace/cart is pure & immutable — every op returns a brand-new Cart, which
// is exactly what @lacspace/store wants. persist() guards SSR (no localStorage
// on the server), so this is safe to import anywhere.
export const useCart = create<CartStore>(
  persist(
    (set, get) => ({
      cart: EMPTY,
      add: (item) =>
        set({
          cart: addItem(get().cart, {
            id: item.id,
            name: item.name,
            unitPrice: item.unitPrice,
            qty: item.qty ?? 1,
            meta: item.meta,
          }),
        }),
      setQty: (id, qty) => set({ cart: setQty(get().cart, id, qty) }),
      remove: (id) => set({ cart: removeItem(get().cart, id) }),
      clear: () => set({ cart: createCart({ currency: "NPR" }) }),
    }),
    { name: "market-cart" },
  ),
);
