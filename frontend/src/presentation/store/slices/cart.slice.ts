import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "..";

export interface CartItem {
  id: string;
  name: string;
  code: string;
  price: number;
  img: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountPercent: number;
}

const initialState: CartState = {
  items: [],
  discountPercent: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discountPercent = Math.max(0, Math.min(100, action.payload));
    },
    clearCart: (state) => {
      state.items = [];
      state.discountPercent = 0;
    },
  },
});

export const {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setDiscount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCartState = (state: RootStore) => state.cart;

export const selectCartItems = createSelector(selectCartState, (cart) => cart.items);
export const selectCartDiscount = createSelector(selectCartState, (cart) => cart.discountPercent);

export const selectCartSubtotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
);

export const selectCartIgv = createSelector(
  selectCartSubtotal,
  selectCartDiscount,
  (subtotal, discountPercent) => (subtotal * (1 - discountPercent / 100)) * 0.18
);

export const selectCartTotal = createSelector(
  selectCartSubtotal,
  selectCartDiscount,
  selectCartIgv,
  (subtotal, discountPercent, igv) => subtotal * (1 - discountPercent / 100) + igv
);