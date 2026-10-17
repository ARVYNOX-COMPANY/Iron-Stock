export const ALL_CATEGORY_ID = "1";

export type StockLevel = "ok" | "low" | "out";

export const getStockLevel = (stock: number, threshold: number): StockLevel =>
  stock <= 0 ? "out" : stock <= threshold ? "low" : "ok";

export const STOCK_TEXT: Record<StockLevel, string> = {
  ok: "text-gray-light",
  low: "text-warning",
  out: "text-danger",
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    value,
  );
