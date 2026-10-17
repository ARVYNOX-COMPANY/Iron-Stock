import Link from "next/link";
import type { Product } from "@/domain/entities/product.entity";

const CRITICAL_STOCK = 4;

const LowStockList = ({ products }: { products: Product[] }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <header className="mb-2 flex items-center justify-between">
      <h2 className="font-semibold text-primary">Stock bajo</h2>
      <Link
        href="/inventary"
        className="text-sm text-button-primary hover:underline"
      >
        Ver inventario
      </Link>
    </header>

    {products.length === 0 ? (
      <p className="py-6 text-center text-sm text-gray-light">
        Todo el stock está en orden.
      </p>
    ) : (
      <ul className="divide-y divide-gray-100">
        {products.slice(0, 5).map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-3 py-3 text-sm"
          >
            <span className="truncate text-primary">{p.name}</span>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                p.quantity <= CRITICAL_STOCK
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {p.quantity} und
            </span>
          </li>
        ))}
      </ul>
    )}
  </article>
);

export default LowStockList;
