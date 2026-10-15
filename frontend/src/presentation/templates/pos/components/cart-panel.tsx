import { IoCartOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/presentation/store/hooks";
import {
  clearCart,
  decrement,
  increment,
  removeItem,
  setDiscount,
  selectCartCount,
  selectCartDiscount,
  selectCartItems,
  selectCartTotals,
} from "@/presentation/store/slices/cart.slice";
import { selectSettings } from "@/presentation/store/slices/settings.slice";
import CartLine from "./cart-line";
import CartSummary from "./cart-summary";
import { formatPrice } from "@/presentation/utils/pos";

interface CartPanelProps {
  onCheckout: () => void;
}

const CartPanel = ({ onCheckout }: CartPanelProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const discountPercent = useAppSelector(selectCartDiscount);
  const totals = useAppSelector(selectCartTotals);
  const { igvRate, maxDiscount } = useAppSelector(selectSettings);
  const isEmpty = items.length === 0;

  return (
    <aside
      aria-label="Carrito"
      className="flex flex-col border-border bg-surface lg:sticky lg:top-0 lg:h-screen lg:w-96 lg:border-l"
    >
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-lg font-bold text-primary">Carrito ({count})</h2>
        {!isEmpty && (
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="text-sm font-semibold text-danger hover:underline"
          >
            Vaciar
          </button>
        )}
      </header>

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-gray-light">
          <IoCartOutline size={40} aria-hidden="true" />
          <p className="text-sm">Toca un producto para agregarlo</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto px-5">
          {items.map((item) => (
            <CartLine
              key={item.product.id}
              item={item}
              onIncrement={(id) => dispatch(increment(id))}
              onDecrement={(id) => dispatch(decrement(id))}
              onRemove={(id) => dispatch(removeItem(id))}
            />
          ))}
        </ul>
      )}

      <footer className="border-t border-border bg-surface-muted p-5">
        <CartSummary
          {...totals}
          igvRate={igvRate}
          discountPercent={discountPercent}
          maxDiscount={maxDiscount}
          onDiscountChange={(value) => dispatch(setDiscount(value))}
        />
        <button
          type="button"
          onClick={onCheckout}
          disabled={isEmpty}
          className="mt-4 w-full rounded-xl bg-button-primary py-3.5 text-base font-bold text-white transition-colors hover:bg-button-primary-hover disabled:opacity-50"
        >
          Cobrar {formatPrice(totals.total)}
        </button>
      </footer>
    </aside>
  );
};

export default CartPanel;
