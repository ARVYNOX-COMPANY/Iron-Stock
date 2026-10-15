import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootStore } from "../index";

export interface InventoryProduct {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

export type ProductInput = Omit<InventoryProduct, "id">;

const initialState: InventoryProduct[] = [
  {
    id: "1",
    name: "Martillo de uña 16oz",
    code: "HER-001",
    category: "Herramientas",
    price: 35,
    stock: 42,
  },
  {
    id: "2",
    name: "Cemento Sol 42.5kg",
    code: "CON-014",
    category: "Construcción",
    price: 29.5,
    stock: 4,
  },
  {
    id: "3",
    name: 'Tubo PVC 1/2" x 5m',
    code: "GAS-022",
    category: "Gasfitería",
    price: 12.8,
    stock: 0,
  },
  {
    id: "4",
    name: "Pintura látex blanco 1gl",
    code: "PIN-005",
    category: "Pinturas",
    price: 48.9,
    stock: 18,
  },
  {
    id: "5",
    name: "Cable THW 14 AWG x m",
    code: "ELE-031",
    category: "Electricidad",
    price: 2.4,
    stock: 350,
  },
];

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action: PayloadAction<InventoryProduct>) => {
        state.unshift(action.payload);
      },
      prepare: (input: ProductInput) => ({
        payload: { ...input, id: nanoid() },
      }),
    },
    updateProduct: (state, action: PayloadAction<InventoryProduct>) => {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) =>
      state.filter((p) => p.id !== action.payload),
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  inventorySlice.actions;
export const selectInventory = (state: RootStore) => state.inventory;
export default inventorySlice.reducer;
