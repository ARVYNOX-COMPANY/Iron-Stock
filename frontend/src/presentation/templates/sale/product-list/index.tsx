"use client";

import { useGetProductsQuery } from "@/presentation/store/apis/products.api";
import ProductItem from "./product-item";

const ProductList = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  return (
    <section>
      {isLoading && <p>Cargando...</p>}

      <div className="flex gap-2 flex-wrap">
        {products.length
          ? products.map((item) => {
              return <ProductItem key={item.id} {...item} />;
            })
          : ""}
      </div>
    </section>
  );
};

export default ProductList;
