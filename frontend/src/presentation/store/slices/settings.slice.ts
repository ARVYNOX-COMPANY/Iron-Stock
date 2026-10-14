import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "..";

export interface BusinessInfo {
  name: string;
  ruc: string;
  address: string;
  phone: string;
  email: string;
  logo: string | null;
}

export interface PaymentMethods {
  cash: boolean;
  card: boolean;
  yape: boolean;
  transfer: boolean;
}

export interface Settings {
  business: BusinessInfo;
  igvRate: number;
  pricesIncludeIgv: boolean;
  currency: "PEN" | "USD";
  maxDiscount: number;
  paymentMethods: PaymentMethods;
  lowStockThreshold: number;
  allowSellWithoutStock: boolean;
}

const initialState: Settings = {
  business: {
    name: "",
    ruc: "",
    address: "",
    phone: "",
    email: "",
    logo: null,
  },
  igvRate: 18,
  pricesIncludeIgv: true,
  currency: "PEN",
  maxDiscount: 20,
  paymentMethods: { cash: true, card: true, yape: true, transfer: false },
  lowStockThreshold: 5,
  allowSellWithoutStock: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveSettings: (_state, action: PayloadAction<Settings>) => action.payload,
  },
});

export const { saveSettings } = settingsSlice.actions;
export const selectSettings = (state: RootStore) => state.settings;
export default settingsSlice.reducer;
