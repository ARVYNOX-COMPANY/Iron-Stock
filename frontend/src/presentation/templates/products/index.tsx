"use client";

import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/presentation/store/hooks";
import {
  addProduct,
  deleteProduct,
  selectInventory,
  updateProduct,
  type InventoryProduct,
  type ProductInput,
} from "@/presentation/store/slices/inventory.slice";
import { selectSettings } from "@/presentation/store/slices/settings.slice";
import StatCards from "./components/stat-cards";
import ProductFilters from "./components/product-filters";
import ProductTable from "./components/product-table";
import ProductFormModal from "./components/product-form-modal";
import ConfirmDialog from "./components/confirm-dialog";
import {
  PAGE_SIZE,
  getStockStatus,
  type StatusFilter,
} from "@/presentation/utils/products";

type ModalState =
  | { type: "closed" }
  | { type: "form"; product?: InventoryProduct }
  | { type: "delete"; product: InventoryProduct };

const ProductsTemplate = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectInventory);
  const { lowStockThreshold } = useAppSelector(selectSettings);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: "closed" });

  const stats = useMemo(
    () => ({
      total: products.length,
      inventoryValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
      lowStock: products.filter(
        (p) => getStockStatus(p.stock, lowStockThreshold) === "low",
      ).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
    }),
    [products, lowStockThreshold],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!term ||
          p.name.toLowerCase().includes(term) ||
          p.code.toLowerCase().includes(term)) &&
        (category === "all" || p.category === category) &&
        (status === "all" ||
          getStockStatus(p.stock, lowStockThreshold) === status),
    );
  }, [products, search, category, status, lowStockThreshold]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const withPageReset =
    <T,>(setter: (v: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  const closeModal = useCallback(() => setModal({ type: "closed" }), []);

  const handleSubmit = (input: ProductInput) => {
    if (modal.type === "form" && modal.product) {
      dispatch(updateProduct({ ...input, id: modal.product.id }));
    } else {
      dispatch(addProduct(input));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modal.type === "delete") dispatch(deleteProduct(modal.product.id));
    closeModal();
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            Productos
          </h1>
          <p className="mt-1 text-sm text-gray-light">
            Gestiona tu catálogo, precios y stock
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ type: "form" })}
          className="btn-primary flex items-center justify-center gap-1 font-semibold"
        >
          <IoAdd size={20} aria-hidden="true" /> Nuevo producto
        </button>
      </header>

      <StatCards {...stats} />

      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <ProductFilters
          search={search}
          category={category}
          status={status}
          onSearchChange={withPageReset(setSearch)}
          onCategoryChange={withPageReset(setCategory)}
          onStatusChange={withPageReset(setStatus)}
        />

        <ProductTable
          products={visible}
          threshold={lowStockThreshold}
          onEdit={(product) => setModal({ type: "form", product })}
          onDelete={(product) => setModal({ type: "delete", product })}
        />

        {filtered.length > 0 && (
          <nav
            aria-label="Paginación"
            className="mt-4 flex items-center justify-between text-sm text-gray-light"
          >
            <span>
              Mostrando {(currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} de{" "}
              {filtered.length}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-lg border border-gray-300 px-3 py-1 disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-lg border border-gray-300 px-3 py-1 disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </nav>
        )}
      </section>

      {modal.type === "form" && (
        <ProductFormModal
          product={modal.product}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
      {modal.type === "delete" && (
        <ConfirmDialog
          title="Eliminar producto"
          message={`¿Seguro que quieres eliminar "${modal.product.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default ProductsTemplate;
