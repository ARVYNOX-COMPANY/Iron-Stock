import type { Product } from "@/domain/entities/product";
import {
  STOCK_TEXT,
  formatPrice,
  getStockLevel,
} from "@/presentation/utils/pos";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  lowStockThreshold: number;
  onAdd: (product: Product) => void;
}

const ProductCard = ({
  product,
  quantityInCart,
  lowStockThreshold,
  onAdd,
}: ProductCardProps) => {
  const level = getStockLevel(product.stock, lowStockThreshold);
  const isOut = level === "out";
  const reachedStock = quantityInCart >= product.stock;

  return (
    <button
      type="button"
      onClick={() => onAdd(product)}
      disabled={isOut || reachedStock}
      aria-label={`Agregar ${product.name}, ${formatPrice(product.price)}`}
      className={`relative flex flex-col rounded-2xl border bg-surface p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none ${
        quantityInCart > 0 ? "border-2 border-button-primary" : "border-border"
      }`}
    >
      {quantityInCart > 0 && (
        <span className="absolute right-2 top-2 rounded-full bg-button-primary px-2 py-0.5 text-xs font-bold text-white">
          {quantityInCart}
        </span>
      )}
      <div className="mb-2 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-button-secondary">
        {product.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.img}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <p className="line-clamp-2 min-h-10 text-sm font-semibold text-primary">
        {product.name}
      </p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-bold text-button-primary">
          {formatPrice(product.price)}
        </span>
        <span className={`text-xs ${STOCK_TEXT[level]}`}>
          {isOut ? "Agotado" : `${product.stock} und.`}
        </span>
      </div>
    </button>
  );
};

export default ProductCard;
