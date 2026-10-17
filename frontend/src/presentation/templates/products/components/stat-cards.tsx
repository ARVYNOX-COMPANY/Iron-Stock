import { formatPrice } from "@/presentation/utils/products";

interface StatCardsProps {
  total: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
}

const StatCards = ({
  total,
  inventoryValue,
  lowStock,
  outOfStock,
}: StatCardsProps) => {
  const stats = [
    {
      label: "Total productos",
      value: total.toString(),
      color: "text-primary",
    },
    {
      label: "Valor del inventario",
      value: formatPrice(inventoryValue),
      color: "text-primary",
    },
    {
      label: "Stock bajo",
      value: lowStock.toString(),
      color: "text-amber-600",
    },
    { label: "Sin stock", value: outOfStock.toString(), color: "text-red-600" },
  ];

  return (
    <dl className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="rounded-2xl border border-gray-200 bg-white p-4"
        >
          <dt className="text-sm text-gray-light">{label}</dt>
          <dd className={`mt-1 text-xl font-bold sm:text-2xl ${color}`}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default StatCards;
