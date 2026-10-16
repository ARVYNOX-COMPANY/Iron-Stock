import { formatPrice } from "@/presentation/utils/reports";

interface DailySalesChartProps {
  data: { label: string; value: number }[];
}

const DailySalesChart = ({ data }: DailySalesChartProps) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 lg:col-span-2">
      <h2 className="mb-4 text-base font-semibold text-primary">
        Ventas por día
      </h2>
      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-light">
          No hay ventas en este periodo.
        </p>
      ) : (
        <ul
          className="flex h-52 items-end gap-2 border-b border-border"
          aria-label="Ventas por día"
        >
          {data.map(({ label, value }) => (
            <li
              key={label}
              className="group flex h-full flex-1 flex-col items-center justify-end"
            >
              <span className="mb-1 text-[10px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {formatPrice(value)}
              </span>
              <div
                className="w-full max-w-10 rounded-t-md bg-button-primary/85 transition-colors group-hover:bg-button-primary"
                style={{ height: `${(value / max) * 100}%` }}
                aria-label={`${label}: ${formatPrice(value)}`}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-1.5 flex gap-2">
        {data.map(({ label }) => (
          <span
            key={label}
            className="flex-1 truncate text-center text-[10px] text-gray-light"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default DailySalesChart;
