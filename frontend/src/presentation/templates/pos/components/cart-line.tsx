import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import type { CartItem } from "@/presentation/store/slices/cart.slice";
import { formatPrice } from "@/presentation/utils/pos";

interface CartLineProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

const stepButton =
  "flex h-7 w-7 items-center justify-center rounded-md hover:bg-surface-muted disabled:opacity-40";

const CartLine = ({
  item: { product, quantity },
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineProps) => (
  <li className="flex items-center gap-3 border-b border-border py-3 last:border-0">
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-primary">
        {product.name}
      </p>
      <p className="text-xs text-gray-light">
        {formatPrice(product.price)} c/u
      </p>
    </div>

    <div className="flex items-center rounded-lg border border-border">
      <button
        type="button"
        onClick={() => onDecrement(product.id)}
        disabled={quantity <= 1}
        aria-label={`Quitar una unidad de ${product.name}`}
        className={stepButton}
      >
        <IoRemove />
      </button>
      <span className="w-7 text-center text-sm font-bold" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onIncrement(product.id)}
        disabled={quantity >= product.stock}
        aria-label={`Agregar una unidad de ${product.name}`}
        className={stepButton}
      >
        <IoAdd />
      </button>
    </div>

    <span className="w-20 text-right text-sm font-bold">
      {formatPrice(product.price * quantity)}
    </span>

    <button
      type="button"
      onClick={() => onRemove(product.id)}
      aria-label={`Eliminar ${product.name}`}
      className="rounded-md p-1 text-gray-light hover:bg-danger-soft hover:text-danger"
    >
      <IoTrashOutline />
    </button>
  </li>
);

export default CartLine;
