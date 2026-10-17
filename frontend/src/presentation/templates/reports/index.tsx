"use client";

import { useMemo, useState } from "react";
import { useGetCategoriesQuery } from "@/presentation/store/apis/categories.api";
import PeriodTabs from "./components/period-tabs";
import KpiCard from "./components/kpi-card";
import DailySalesChart from "./components/daily-sales-chart";
import PaymentDonut from "./components/payment-donut";
import RankingList from "./components/ranking-list";
import { useReport } from "@/presentation/hooks/reports/use-report";
import {
  formatPrice,
  percentChange,
  type Period,
} from "@/presentation/utils/reports";

const ReportsTemplate = () => {
  const [period, setPeriod] = useState<Period>("month");
  const { data: categories = [] } = useGetCategoriesQuery();

  const categoryNames = useMemo(
    () => Object.fromEntries(categories.map((c) => [String(c.id), c.name])),
    [categories],
  );

  const {
    current,
    previous,
    daily,
    payments,
    topProducts,
    categories: byCategory,
  } = useReport(period, categoryNames);

  const kpis = [
    {
      label: "Ventas totales",
      value: formatPrice(current.revenue),
      change: percentChange(current.revenue, previous.revenue),
    },
    {
      label: "N° de ventas",
      value: current.count.toString(),
      change: percentChange(current.count, previous.count),
    },
    {
      label: "Ticket promedio",
      value: formatPrice(current.average),
      change: percentChange(current.average, previous.average),
    },
    {
      label: "Productos vendidos",
      value: current.units.toString(),
      change: percentChange(current.units, previous.units),
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            Reportes
          </h1>
          <p className="mt-1 text-sm text-gray-light">
            Analiza el rendimiento de tu ferretería
          </p>
        </div>
        <PeriodTabs value={period} onChange={setPeriod} />
      </header>

      <dl className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </dl>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DailySalesChart data={daily} />
        <PaymentDonut data={payments} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RankingList
          title="Productos más vendidos"
          items={topProducts}
          formatValue={(v) => `${v} und.`}
        />
        <RankingList
          title="Ventas por categoría"
          items={byCategory}
          formatValue={formatPrice}
          barClassName="bg-violet-500"
        />
      </div>
    </div>
  );
};

export default ReportsTemplate;
