import Link from "next/link";
import type { DayTotal } from "@/presentation/hooks/home/use-dashboard-stats";
import { money } from "@/presentation/utils/home";

const SalesChart = ({ days }: { days: DayTotal[] }) => {
  const max = Math.max(...days.map((d) => d.total), 1);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-primary">
          Ventas de los últimos 7 días
        </h2>
        <Link
          href="/reportes"
          className="text-sm text-button-primary hover:underline"
        >
          Ver reportes
        </Link>
      </header>

      <ul
        className="flex h-48 items-end gap-2 sm:gap-4"
        aria-label="Ventas por día"
      >
        {days.map((day) => (
          <li
            key={day.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className={`group relative w-full rounded-t-md transition-colors ${
                day.isToday
                  ? "bg-button-primary"
                  : "bg-blue-200 hover:bg-blue-300"
              }`}
              style={{ height: `${Math.max((day.total / max) * 100, 2)}%` }}
              title={money(day.total)}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-0.5 text-xs text-white group-hover:block">
                {money(day.total)}
              </span>
            </div>
            <span
              className={`text-xs capitalize ${
                day.isToday
                  ? "font-bold text-button-primary"
                  : "text-gray-light"
              }`}
            >
              {day.label}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SalesChart;
