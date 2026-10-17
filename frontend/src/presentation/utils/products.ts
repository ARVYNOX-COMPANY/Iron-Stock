export type StockStatus = "available" | "low" | "out";
export type StatusFilter = StockStatus | "all";

export const PAGE_SIZE = 8;

export const CATEGORIES = [
  "Herramientas",
  "Construcción",
  "Gasfitería",
  "Pinturas",
  "Electricidad",
] as const;

export const STATUS_LABELS: Record<StockStatus, string> = {
  available: "Disponible",
  low: "Stock bajo",
  out: "Sin stock",
};

export const getStockStatus = (
  stock: number,
  threshold: number,
): StockStatus =>
  stock === 0 ? "out" : stock <= threshold ? "low" : "available";

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    value,
  );

export const inputClass =
  "w-full rounded-[10px] border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-button-primary focus:ring-2 focus:ring-blue-100";
