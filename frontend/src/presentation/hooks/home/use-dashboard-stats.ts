"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/presentation/store/hooks";
import { selectSales } from "@/presentation/store/slices/sales.slice";
import { useGetProductsQuery } from "@/presentation/store/apis/products.api";
import {
  LOW_STOCK_THRESHOLD,
  addDays,
  percentChange,
  startOfDay,
} from "@/presentation/utils/home";

const dayFormat = new Intl.DateTimeFormat("es-PE", { weekday: "short" });

export interface DayTotal {
  label: string;
  total: number;
  isToday: boolean;
}

export interface TopProduct {
  id: string;
  name: string;
  sold: number;
}

export const useDashboardStats = () => {
  const sales = useAppSelector(selectSales);
  const { data: products = [], isLoading } = useGetProductsQuery();

  return useMemo(() => {
    const today = startOfDay(new Date());
    const yesterday = addDays(today, -1);
    const weekStart = addDays(today, -6);

    let todayTotal = 0;
    let todayCount = 0;
    let yesterdayTotal = 0;
    let yesterdayCount = 0;
    const dayTotals = new Map<number, number>();
    const sold = new Map<string, TopProduct>();

    for (const sale of sales) {
      const day = startOfDay(new Date(sale.date)).getTime();

      if (day === today.getTime()) {
        todayTotal += sale.total;
        todayCount += 1;
      } else if (day === yesterday.getTime()) {
        yesterdayTotal += sale.total;
        yesterdayCount += 1;
      }

      if (day >= weekStart.getTime()) {
        dayTotals.set(day, (dayTotals.get(day) ?? 0) + sale.total);
        for (const item of sale.items) {
          const prev = sold.get(item.id);
          sold.set(item.id, {
            id: item.id,
            name: item.name,
            sold: (prev?.sold ?? 0) + item.quantity,
          });
        }
      }
    }

    const last7Days: DayTotal[] = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      const isToday = i === 6;
      return {
        label: isToday ? "Hoy" : dayFormat.format(date).replace(".", ""),
        total: dayTotals.get(date.getTime()) ?? 0,
        isToday,
      };
    });

    const topProducts = [...sold.values()]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    const lowStock = products
      .filter((p) => p.quantity <= LOW_STOCK_THRESHOLD)
      .sort((a, b) => a.quantity - b.quantity);

    return {
      isLoading,
      todayTotal,
      todayCount,
      totalChange: percentChange(todayTotal, yesterdayTotal),
      countDiff: todayCount - yesterdayCount,
      last7Days,
      topProducts,
      lowStock,
    };
  }, [sales, products, isLoading]);
};
