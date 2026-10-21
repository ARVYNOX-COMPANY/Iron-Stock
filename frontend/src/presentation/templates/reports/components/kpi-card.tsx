import { IoCaretDown, IoCaretUp } from "react-icons/io5";

interface KpiCardProps {
  label: string;
  value: string;
  change: number | null;
}

const KpiCard = ({ label, value, change }: KpiCardProps) => {
  const isUp = (change ?? 0) >= 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <dt className="text-sm text-gray-light">{label}</dt>
      <dd className="mt-1 text-xl font-bold text-primary sm:text-2xl">
        {value}
      </dd>
      <dd
        className={`mt-1 flex items-center gap-0.5 text-xs font-semibold ${
          change === null
            ? "text-gray-light"
            : isUp
              ? "text-success"
              : "text-danger"
        }`}
      >
        {change === null ? (
          "Sin datos previos"
        ) : (
          <>
            {isUp ? (
              <IoCaretUp aria-hidden="true" />
            ) : (
              <IoCaretDown aria-hidden="true" />
            )}
            {Math.abs(change).toFixed(0)}% vs periodo anterior
          </>
        )}
      </dd>
    </div>
  );
};

export default KpiCard;
