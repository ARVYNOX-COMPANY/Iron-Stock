import Link from "next/link";
import type { TopProduct } from "@/presentation/hooks/home/use-dashboard-stats";

const TopProducts = ({ products }: { products: TopProduct[] }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-3">
    <header className="mb-2 flex items-center justify-between">
      <h2 className="font-semibold text-primary">Más vendidos esta semana</h2>
      <Link
        href="/products"
        className="text-sm text-button-primary hover:underline"
      >
        Ver productos
      </Link>
    </header>

    {products.length === 0 ? (
      <p className="py-6 text-center text-sm text-gray-light">
        Aún no hay ventas esta semana.
      </p>
    ) : (
      <ol className="divide-y divide-gray-100">
        {products.map((p, i) => (
          <li key={p.id} className="flex items-center gap-3 py-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-button-primary">
              {i + 1}
            </span>
            <span className="flex-1 truncate text-primary">{p.name}</span>
            <span className="shrink-0 text-xs text-gray-light">
              {p.sold} vendido{p.sold !== 1 ? "s" : ""}
            </span>
          </li>
        ))}
      </ol>
    )}
  </article>
);

export default TopProducts;
