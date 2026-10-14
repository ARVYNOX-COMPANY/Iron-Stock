import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootStore } from "..";
import type { CartItem } from "./cart.slice";

export type PaymentMethod = "cash" | "card" | "yape";

export interface Sale {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  igv: number;
  total: number;
  paymentMethod: PaymentMethod;
  received?: number;
  change?: number;
}

interface SalesState {
  list: Sale[];
}

const initialState: SalesState = { list: [] };

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSale: (state, action: PayloadAction<Sale>) => {
      state.list.unshift(action.payload);
    },
  },
});

export const { addSale } = salesSlice.actions;
export default salesSlice.reducer;

export const selectSales = (state: RootStore) => state?.sales?.list;
