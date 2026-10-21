import { useMemo } from "react";
import { useAppSelector } from "@/presentation/store/hooks";
import {
  selectSales,
  type Sale,
} from "@/presentation/store/slices/sales.slice";
import { getRange, type Period } from "@/presentation/utils/reports";

interface RankItem {
  label: string;
  value: number;
}

const summarize = (sales: Sale[]) => {
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce(
    (sum, s) => sum + s.items.reduce((u, i) => u + i.quantity, 0),
    0,
  );
  return {
    revenue,
    count: sales.length,
    average: sales.length ? revenue / sales.length : 0,
    units,
  };
};

const topBy = (map: Map<string, number>, limit = 5): RankItem[] =>
  [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);

export const useReport = (
  period: Period,
  categoryNames: Record<string, string>,
) => {
  const sales = useAppSelector(selectSales);

  return useMemo(() => {
    const { start, end, prevStart, prevEnd } = getRange(period);
    const inRange = (from: number, to: number) =>
      sales.filter((s) => {
        const t = new Date(s.date).getTime();
        return t >= from && t <= to;
      });

    const current = inRange(start, end);
    const previous = inRange(prevStart, prevEnd);

    const byDay = new Map<string, number>();
    const byPayment = new Map<Sale["paymentMethod"], number>();
    const byProduct = new Map<string, number>();
    const byCategory = new Map<string, number>();

    for (const sale of current) {
      const day = new Date(sale.date).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
      });
      byDay.set(day, (byDay.get(day) ?? 0) + sale.total);
      byPayment.set(
        sale.paymentMethod,
        (byPayment.get(sale.paymentMethod) ?? 0) + sale.total,
      );
      for (const { product, quantity } of sale.items) {
        byProduct.set(
          product.name,
          (byProduct.get(product.name) ?? 0) + quantity,
        );
        const category = categoryNames[String(product.id_category)] ?? "Otros";
        byCategory.set(
          category,
          (byCategory.get(category) ?? 0) + product.price * quantity,
        );
      }
    }

    return {
      current: summarize(current),
      previous: summarize(previous),
      daily: [...byDay.entries()].map(([label, value]) => ({ label, value })),
      payments: [...byPayment.entries()].map(([method, value]) => ({
        method,
        value,
      })),
      topProducts: topBy(byProduct),
      categories: topBy(byCategory),
    };
  }, [sales, period, categoryNames]);
};
