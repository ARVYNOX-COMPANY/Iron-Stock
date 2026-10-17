"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/presentation/store/hooks";
import { useGetProductsQuery } from "@/presentation/store/apis/products.api";
import { useGetCategoriesQuery } from "@/presentation/store/apis/categories.api";
import {
  addItem,
  selectCartItems,
} from "@/presentation/store/slices/cart.slice";
import { selectSettings } from "@/presentation/store/slices/settings.slice";
import Loading from "@/presentation/components/loading";
import CartModal from "./components/cart-modal";
import CategoryChips from "./components/category-chips";
import ProductGrid from "./components/product-grid";
import CartPanel from "./components/cart-panel";
import { useFilteredProducts } from "@/presentation/hooks/pos/use-filtered-products";
import { usePosShortcuts } from "@/presentation/hooks/pos/use-pos-shortcuts";

const PosTemplate = () => {
  const dispatch = useAppDispatch();
  const { data: products = [], isLoading } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const items = useAppSelector(selectCartItems);
  const { lowStockThreshold } = useAppSelector(selectSettings);

  const { filtered, search, setSearch, categoryId, setCategoryId } =
    useFilteredProducts(products);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const quantities = useMemo(
    () => Object.fromEntries(items.map((i) => [i.product.id, i.quantity])),
    [items],
  );

  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  usePosShortcuts({
    searchRef,
    canCheckout: items.length > 0,
    onCheckout: openCheckout,
  });

  if (isLoading) return <Loading fullScreen />;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-primary sm:text-3xl">
          Punto de venta
        </h1>

        <div className="relative mb-4">
          <IoSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-light"
            aria-hidden="true"
          />
          <input
            ref={searchRef}
            type="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto por nombre o código..."
            aria-label="Buscar producto"
            className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-20 text-sm outline-none focus:border-button-primary focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <CategoryChips
          categories={categories}
          selectedId={categoryId}
          onSelect={setCategoryId}
        />

        <ProductGrid
          products={filtered}
          quantities={quantities}
          lowStockThreshold={lowStockThreshold}
          onAdd={(product) => dispatch(addItem(product))}
        />
      </main>

      <CartPanel onCheckout={openCheckout} />

      {isCheckoutOpen && <CartModal onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
};

export default PosTemplate;
