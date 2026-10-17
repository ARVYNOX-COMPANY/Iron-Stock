import type { Sale } from "@/presentation/store/slices/sales.slice";

export type Period = "today" | "week" | "month" | "year";

export const PERIOD_LABELS: Record<Period, string> = {
  today: "Hoy",
  week: "Semana",
  month: "Mes",
  year: "Año",
};

export const PAYMENT_LABELS: Record<Sale["paymentMethod"], string> = {
  cash: "Efectivo",
  card: "Tarjeta",
  yape: "Yape / Plin",
};

export const PAYMENT_COLORS: Record<Sale["paymentMethod"], string> = {
  cash: "#2563eb",
  yape: "#8b5cf6",
  card: "#10b981",
};

const DAY_MS = 86_400_000;

export const getRange = (period: Period, now = new Date()) => {
  const end = now.getTime();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if (period === "week") start.setDate(start.getDate() - 6);
  if (period === "month") start.setDate(1);
  if (period === "year") start.setMonth(0, 1);
  const length = end - start.getTime();
  return {
    start: start.getTime(),
    end,
    prevStart: start.getTime() - length - DAY_MS,
    prevEnd: start.getTime(),
  };
};

export const percentChange = (current: number, previous: number) =>
  previous === 0 ? null : ((current - previous) / previous) * 100;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(value);
