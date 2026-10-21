import { useMemo, useState } from "react";
import type { Product } from "@/domain/entities/product";
import { ALL_CATEGORY_ID } from "@/presentation/utils/pos";

export const useFilteredProducts = (products: Product[]) => {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(ALL_CATEGORY_ID);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (categoryId === ALL_CATEGORY_ID || p.id_category === categoryId) &&
        (!term ||
          p.name.toLowerCase().includes(term) ||
          p.code.toLowerCase().includes(term)),
    );
  }, [products, search, categoryId]);

  return { filtered, search, setSearch, categoryId, setCategoryId };
};
