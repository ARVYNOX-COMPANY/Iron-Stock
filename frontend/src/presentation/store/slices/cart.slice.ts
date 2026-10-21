import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "@/domain/entities/product";
import type { RootStore } from "../index";

export interface CartItem {
  product: Product;
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

const round = (value: number) => Math.round(value * 100) / 100;

const findItem = (state: CartState, id: number) =>
  state.items.find((item) => item.product.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const item = findItem(state, action.payload.id);
      if (!item) {
        state.items.push({ product: action.payload, quantity: 1 });
      } else if (item.quantity < item.product.stock) {
        item.quantity += 1;
      }
    },
    increment: (state, action: PayloadAction<number>) => {
      const item = findItem(state, action.payload);
      if (item && item.quantity < item.product.stock) item.quantity += 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      const item = findItem(state, action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discountPercent = Math.min(100, Math.max(0, action.payload));
    },
    clearCart: () => initialState,
  },
});

export const {
  addItem,
  increment,
  decrement,
  removeItem,
  setDiscount,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootStore) => state.cart.items;
export const selectCartDiscount = (state: RootStore) =>
  state.cart.discountPercent;
const selectIgvRate = (state: RootStore) => state.settings.igvRate;
const selectPricesIncludeIgv = (state: RootStore) =>
  state.settings.pricesIncludeIgv;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotals = createSelector(
  [selectCartItems, selectCartDiscount, selectIgvRate, selectPricesIncludeIgv],
  (items, discountPercent, igvRate, pricesIncludeIgv) => {
    const gross = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const discountAmount = round((gross * discountPercent) / 100);
    const afterDiscount = gross - discountAmount;
    const rate = igvRate / 100;

    const subtotal = round(
      pricesIncludeIgv ? afterDiscount / (1 + rate) : afterDiscount,
    );
    const igv = round(subtotal * rate);
    const total = round(subtotal + igv);

    return { subtotal, igv, discountAmount, total };
  },
);

export default cartSlice.reducer;
