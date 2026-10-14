"use client";
import Loading from "@/presentation/components/loading";
import { useGreeting } from "@/presentation/hooks/home/use-greeting";
import { useDashboardStats } from "@/presentation/hooks/home/use-dashboard-stats";
import QuickActions from "./components/quick-actions";
import StatCard from "./components/stat-card";
import SalesChart from "./components/sales-chart";
import LowStockList from "./components/low-stock-list";
import TopProducts from "./components/top-products";
import { money } from "@/presentation/utils/home";

const HomeTemplate = () => {
  const { greeting, dateLabel } = useGreeting();
  const stats = useDashboardStats();

  if (stats.isLoading) return <Loading text="Cargando inicio" fullScreen />;

  const { totalChange, countDiff } = stats;

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-10">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-primary sm:text-3xl">
            {greeting ?? "Hola"}
            <span
              className="inline-block origin-[70%_70%] animate-wave"
              role="img"
              aria-label="saludo"
            >
              👋
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-light">
            {dateLabel && `${dateLabel} · `}Resumen de tu ferretería
          </p>
        </div>

        <QuickActions />
      </header>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Vendido hoy"
          value={money(stats.todayTotal)}
          hint={
            totalChange === null
              ? "Sin ventas ayer para comparar"
              : `${totalChange >= 0 ? "▲" : "▼"} ${Math.abs(totalChange).toFixed(0)}% vs. ayer`
          }
          trend={
            totalChange === null ? "neutral" : totalChange >= 0 ? "up" : "down"
          }
        />

        <StatCard
          label="Ventas de hoy"
          value={String(stats.todayCount)}
          hint={
            countDiff === 0
              ? "Igual que ayer"
              : `${countDiff > 0 ? "▲" : "▼"} ${Math.abs(countDiff)} ${countDiff > 0 ? "más" : "menos"} que ayer`
          }
          trend={countDiff > 0 ? "up" : countDiff < 0 ? "down" : "neutral"}
        />

        <StatCard
          label="Productos con stock bajo"
          value={String(stats.lowStock.length)}
          hint={
            stats.lowStock.length ? "Requieren reposición" : "Todo en orden"
          }
          danger={stats.lowStock.length > 0}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SalesChart days={stats.last7Days} />
        <LowStockList products={stats.lowStock} />
        <TopProducts products={stats.topProducts} />
      </div>
    </section>
  );
};
export default HomeTemplate;
