"use client";

import { useEffect, useState, type FormEvent } from "react";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/presentation/store/hooks";
import {
  clearCart,
  selectCartCount,
  selectCartDiscount,
  selectCartItems,
  selectCartTotals,
} from "@/presentation/store/slices/cart.slice";
import { addSale, type Sale } from "@/presentation/store/slices/sales.slice";
import { selectSettings } from "@/presentation/store/slices/settings.slice";

type PaymentMethod = Sale["paymentMethod"];

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Efectivo" },
  { value: "card", label: "Tarjeta" },
  { value: "yape", label: "Yape / Plin" },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    value,
  );

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const discountPercent = useAppSelector(selectCartDiscount);
  const { subtotal, igv, discountAmount, total } =
    useAppSelector(selectCartTotals);
  const { igvRate, paymentMethods } = useAppSelector(selectSettings);

  const options = PAYMENT_OPTIONS.filter(({ value }) => paymentMethods[value]);
  const [method, setMethod] = useState<PaymentMethod>(
    options[0]?.value ?? "cash",
  );
  const [received, setReceived] = useState("");
  const [paidTotal, setPaidTotal] = useState<number | null>(null);

  const receivedAmount = Number(received) || 0;
  const change = Math.max(0, receivedAmount - total);
  const canCharge = method !== "cash" || receivedAmount >= total;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canCharge || !items.length) return;

    dispatch(
      addSale({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        items,
        subtotal,
        discountPercent,
        discountAmount,
        igv,
        total,
        paymentMethod: method,
        ...(method === "cash" && { received: receivedAmount, change }),
      }),
    );
    dispatch(clearCart());
    setPaidTotal(total);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-2xl bg-surface p-6 shadow-xl sm:rounded-2xl"
      >
        {paidTotal !== null ? (
          <div
            className="flex flex-col items-center gap-3 py-6 text-center"
            role="status"
          >
            <IoCheckmarkCircle
              size={56}
              className="text-success"
              aria-hidden="true"
            />
            <h2 id="checkout-title" className="text-xl font-bold text-primary">
              Venta registrada
            </h2>
            <p className="text-gray-light">
              Total cobrado: {formatPrice(paidTotal)}
            </p>
            {method === "cash" && change > 0 && (
              <p className="text-lg font-semibold text-primary">
                Vuelto: {formatPrice(change)}
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="mt-2 w-full rounded-xl bg-button-primary py-3 font-bold text-white hover:bg-button-primary-hover"
            >
              Nueva venta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <header className="mb-5 flex items-center justify-between">
              <h2
                id="checkout-title"
                className="text-lg font-bold text-primary"
              >
                Cobrar venta
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-full p-1 hover:bg-surface-muted"
              >
                <IoClose size={22} />
              </button>
            </header>

            <dl className="mb-5 flex flex-col gap-1.5 rounded-xl bg-surface-muted p-4 text-sm text-gray-light">
              <div className="flex justify-between">
                <dt>Productos</dt>
                <dd>{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success">
                  <dt>Descuento ({discountPercent}%)</dt>
                  <dd>-{formatPrice(discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>IGV ({igvRate}%)</dt>
                <dd>{formatPrice(igv)}</dd>
              </div>
              <div className="mt-1 flex justify-between border-t border-dashed border-border pt-2 text-xl font-extrabold text-primary">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <fieldset className="mb-5">
              <legend className="mb-2 text-sm font-medium text-primary">
                Método de pago
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {options.map(({ value, label }) => (
                  <label
                    key={value}
                    className={`rounded-xl border px-2 py-2.5 text-center text-sm font-semibold transition-colors ${
                      method === value
                        ? "border-2 border-button-primary bg-button-secondary text-button-primary"
                        : "border-border hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={method === value}
                      onChange={() => setMethod(value)}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            {method === "cash" && (
              <div className="mb-5">
                <label
                  htmlFor="received"
                  className="mb-1.5 block text-sm font-medium text-primary"
                >
                  Monto recibido
                </label>
                <input
                  id="received"
                  type="number"
                  min={0}
                  step="0.1"
                  inputMode="decimal"
                  autoFocus
                  value={received}
                  onChange={(e) => setReceived(e.target.value)}
                  placeholder={total.toFixed(2)}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-lg outline-none focus:border-button-primary focus:ring-2 focus:ring-blue-100"
                />
                <p
                  className={`mt-2 text-sm font-semibold ${receivedAmount && !canCharge ? "text-danger" : "text-primary"}`}
                >
                  {receivedAmount && !canCharge
                    ? `Faltan ${formatPrice(total - receivedAmount)}`
                    : `Vuelto: ${formatPrice(change)}`}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!canCharge}
              className="w-full rounded-xl bg-button-primary py-3.5 text-base font-bold text-white transition-colors hover:bg-button-primary-hover disabled:opacity-50"
            >
              Confirmar cobro {formatPrice(total)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CartModal;
