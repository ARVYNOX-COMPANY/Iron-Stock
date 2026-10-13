"use client";

import { useGetProductsQuery } from "@/presentation/store/apis/products.api";
import { useGetCategoriesQuery } from "@/presentation/store/apis/categories.api";
import { useEffect, useState } from "react";
import ProductItem from "./product-item";
import Loading from "@/presentation/components/loading";

const ProductList = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const [newProducts, setNewProducts] = useState(products);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    const updateProducts = () => {
      setNewProducts(products);
    };

    updateProducts();
  }, [products]);

  return (
    <section>
      {!!(isLoading || isLoadingCategories) && <Loading />}

      <div className="flex gap-3 mb-6">
        {categories.length
          ? categories.map((item) => (
              <p
                key={item.id}
                onClick={() => {
                  setNewProducts(
                    products.filter((prod) => prod.id_category === item.id),
                  );
                  setSelectCategory(item.id);
                }}
                className={`p-2 px-4 text-[14px] rounded-[10px] cursor-pointer font-medium ${item.id === selectCategory ? "bg-button-primary text-white" : "bg-button-secondary"}`}
              >
                {item.name}
              </p>
            ))
          : ""}
      </div>

      <div className="flex gap-2 flex-wrap">
        {newProducts.length
          ? newProducts.map((item) => {
              return <ProductItem key={item.id} {...item} />;
            })
          : ""}
      </div>
    </section>
  );
};

export default ProductList;
