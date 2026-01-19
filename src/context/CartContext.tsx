import React, { createContext, useContext, useState } from "react";

export type Extra = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  extras?: Extra[];
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string, extrasKey?: string) => void;
  clearCart: () => void;
  getItemTotal: (item: CartItem) => number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const extrasKey = (extras?: Extra[]) =>
    extras?.map(e => e.id).sort().join(",") ?? "";

  const getItemTotal = (item: CartItem) => {
    const extrasTotal =
      item.extras?.reduce((s, e) => s + e.price, 0) ?? 0;

    return (item.price + extrasTotal) * item.quantity;
  };

  const addItem = (
    item: Omit<CartItem, "quantity">,
    qty: number = 1
  ) => {
    setItems(prev => {
      const key = extrasKey(item.extras);

      const existing = prev.find(
        i => i.id === item.id && extrasKey(i.extras) === key
      );

      if (existing) {
        return prev.map(i =>
          i === existing
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (id: string, extrasKeyValue = "") => {
    setItems(prev =>
      prev
        .map(i =>
          i.id === id && extrasKey(i.extras) === extrasKeyValue
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, getItemTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
