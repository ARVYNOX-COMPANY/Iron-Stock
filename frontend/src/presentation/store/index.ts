import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apis/products.api";

export const makeStore = () =>
  configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootStore = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
