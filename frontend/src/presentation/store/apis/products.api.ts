import { Product } from "@/domain/entities/product.entity";
import { getAllProductsUseCase } from "@/infrastructure/config/product.dependencies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        try {
          const data = await getAllProductsUseCase.execute();

          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
