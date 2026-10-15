import { STATUS_LABELS, type StockStatus } from "@/presentation/utils/products";

const STYLES: Record<StockStatus, string> = {
  available: "bg-green-100 text-green-700",
  low: "bg-amber-100 text-amber-700",
  out: "bg-red-100 text-red-700",
};

const StockBadge = ({ status }: { status: StockStatus }) => (
  <span
    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[status]}`}
  >
    {STATUS_LABELS[status]}
  </span>
);

export default StockBadge;
