interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  trend?: "up" | "down" | "neutral";
  danger?: boolean;
}

const TREND_STYLES = {
  up: "text-green-600",
  down: "text-red-600",
  neutral: "text-gray-light",
} as const;

const StatCard = ({
  label,
  value,
  hint,
  trend = "neutral",
  danger,
}: StatCardProps) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`mt-1.5 text-2xl font-bold sm:text-3xl ${danger ? "text-red-600" : "text-primary"}`}
    >
      {value}
    </p>
    {hint && <p className={`mt-1 text-xs ${TREND_STYLES[trend]}`}>{hint}</p>}
  </article>
);

export default StatCard;
