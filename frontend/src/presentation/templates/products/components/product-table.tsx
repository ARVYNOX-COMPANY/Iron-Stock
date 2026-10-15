import type { InventoryProduct } from "@/presentation/store/slices/inventory.slice";
import StockBadge from "./stock-badge";
import { formatPrice, getStockStatus } from "@/presentation/utils/products";

interface ProductTableProps {
  products: InventoryProduct[];
  threshold: number;
  onEdit: (product: InventoryProduct) => void;
  onDelete: (product: InventoryProduct) => void;
}

const Actions = ({
  product,
  onEdit,
  onDelete,
}: { product: InventoryProduct } & Pick<
  ProductTableProps,
  "onEdit" | "onDelete"
>) => (
  <div className="flex gap-3 text-sm font-semibold">
    <button
      type="button"
      onClick={() => onEdit(product)}
      className="text-button-primary hover:underline cursor-pointer"
      aria-label={`Editar ${product.name}`}
    >
      Editar
    </button>
    <button
      type="button"
      onClick={() => onDelete(product)}
      className="text-red-600 hover:underline cursor-pointer"
      aria-label={`Eliminar ${product.name}`}
    >
      Eliminar
    </button>
  </div>
);

const ProductTable = ({
  products,
  threshold,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  if (!products.length) {
    return (
      <p className="py-12 text-center text-sm text-gray-light">
        No se encontraron productos.
      </p>
    );
  }

  return (
    <>
      <table className="hidden w-full text-sm md:table">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-light">
            <th className="p-3 font-semibold">Producto</th>
            <th className="p-3 font-semibold">Código</th>
            <th className="p-3 font-semibold">Categoría</th>
            <th className="p-3 font-semibold">Precio</th>
            <th className="p-3 font-semibold">Stock</th>
            <th className="p-3 font-semibold">Estado</th>
            <th className="p-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              <td className="p-3 font-medium text-primary">{p.name}</td>
              <td className="p-3 text-gray-light">{p.code}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{formatPrice(p.price)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                <StockBadge status={getStockStatus(p.stock, threshold)} />
              </td>
              <td className="p-3">
                <Actions product={p} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex flex-col gap-3 md:hidden">
        {products.map((p) => (
          <li key={p.id} className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-gray-light">
                  {p.code} · {p.category}
                </p>
              </div>
              <StockBadge status={getStockStatus(p.stock, threshold)} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm">
                {formatPrice(p.price)} ·{" "}
                <span className="text-gray-light">{p.stock} und.</span>
              </p>
              <Actions product={p} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductTable;
