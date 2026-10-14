import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apis/products.api";
import { categoriesApi } from "./apis/categories.api";
import cartReducer from "./slices/cart.slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware, categoriesApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootStore = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
