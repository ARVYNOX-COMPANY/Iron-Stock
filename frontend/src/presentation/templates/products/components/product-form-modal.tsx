"use client";

import { useEffect, useState, type FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import type {
  InventoryProduct,
  ProductInput,
} from "@/presentation/store/slices/inventory.slice";
import { CATEGORIES, inputClass } from "@/presentation/utils/products";

type FormErrors = Partial<Record<keyof ProductInput, string>>;

interface ProductFormModalProps {
  product?: InventoryProduct;
  onSubmit: (input: ProductInput) => void;
  onClose: () => void;
}

const EMPTY: ProductInput = {
  name: "",
  code: "",
  category: CATEGORIES[0],
  price: 0,
  stock: 0,
};

const validate = (v: ProductInput): FormErrors => {
  const errors: FormErrors = {};
  if (!v.name.trim()) errors.name = "Ingresa el nombre.";
  if (!v.code.trim()) errors.code = "Ingresa el código.";
  if (v.price <= 0) errors.price = "El precio debe ser mayor a 0.";
  if (v.stock < 0 || !Number.isInteger(v.stock))
    errors.stock = "El stock debe ser un entero positivo.";
  return errors;
};

const ProductFormModal = ({
  product,
  onSubmit,
  onClose,
}: ProductFormModalProps) => {
  const [values, setValues] = useState<ProductInput>(product ?? EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const isEdit = Boolean(product);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (!Object.keys(found).length)
      onSubmit({
        ...values,
        name: values.name.trim(),
        code: values.code.trim().toUpperCase(),
      });
  };

  const field = (
    key: keyof ProductInput,
    label: string,
    input: React.ReactNode,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={key} className="text-sm font-medium text-primary">
        {label}
      </label>
      {input}
      {errors[key] && <p className="text-xs text-red-600">{errors[key]}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="product-form-title"
            className="text-lg font-semibold text-primary cursor-pointer"
          >
            {isEdit ? "Editar producto" : "Nuevo producto"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <IoClose size={22} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {field(
              "name",
              "Nombre",
              <input
                id="name"
                autoFocus
                className={inputClass}
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
              />,
            )}
          </div>
          {field(
            "code",
            "Código",
            <input
              id="code"
              className={inputClass}
              value={values.code}
              onChange={(e) => set("code", e.target.value)}
              aria-invalid={!!errors.code}
            />,
          )}
          {field(
            "category",
            "Categoría",
            <select
              id="category"
              className={inputClass}
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>,
          )}
          {field(
            "price",
            "Precio (S/)",
            <input
              id="price"
              type="number"
              min={0}
              step="0.1"
              className={inputClass}
              value={values.price}
              onChange={(e) => set("price", Number(e.target.value))}
              aria-invalid={!!errors.price}
            />,
          )}
          {field(
            "stock",
            "Stock",
            <input
              id="stock"
              type="number"
              min={0}
              step="1"
              className={inputClass}
              value={values.stock}
              onChange={(e) => set("stock", Number(e.target.value))}
              aria-invalid={!!errors.stock}
            />,
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button type="submit" className="btn-primary font-semibold">
            {isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormModal;
