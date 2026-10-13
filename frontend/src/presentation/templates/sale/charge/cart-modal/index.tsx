"use client";

import { useAppDispatch, useAppSelector } from "@/presentation/store/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setDiscount,
  clearCart,
} from "@/presentation/store/slices/cart.slice";
import type { CartItem } from "@/presentation/store/slices/cart.slice";
import { IoMdRemove, IoMdAdd, IoMdClose, IoMdCash } from "react-icons/io";
import styles from "./index.module.css";

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discountPercent = useAppSelector(selectCartDiscount);
  const discountAmount = subtotal * (discountPercent / 100);
  const afterDiscount = subtotal - discountAmount;
  const igv = afterDiscount * 0.18;
  const total = afterDiscount + igv;
  const totalItems = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch(setDiscount(Math.max(0, Math.min(value, 100))));
  };

  const handleCharge = () => {
    if (items.length === 0) return;
    alert(`Cobrar total: S/ ${total.toFixed(2)}`);
    dispatch(clearCart());
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            Detalle de venta
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <IoMdClose size={24} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <IoMdCash size={48} />
            <p>No hay productos en la venta</p>
            <span>Agrega productos desde la lista</span>
          </div>
        ) : (
          <>
            <ul
              className={styles.itemsList}
              role="list"
              aria-label="Productos en la venta"
            >
              {items.map((item: CartItem) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className={styles.itemImg}
                      width={56}
                      height={56}
                    />
                    <div className={styles.itemDetails}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemPrice}>
                        S/ {item.price.toFixed(2)} c/u
                      </p>
                    </div>
                  </div>

                  <div className={styles.quantityControls}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      aria-label="Disminuir cantidad"
                    >
                      <IoMdRemove size={20} />
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      aria-label="Aumentar cantidad"
                    >
                      <IoMdAdd size={20} />
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <IoMdClose size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <div className={`py-2 ${styles.summaryRow}`}>
                <span>Cantidad de Productos</span>
                <span>
                  {totalItems} producto{totalItems !== 1 ? "s" : ""}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.discountRow}>
                <label
                  htmlFor="modal-discount"
                  className={styles.discountLabel}
                >
                  Descuento
                </label>
                <div className={styles.discountInputWrapper}>
                  <div className={styles.percentInputWrapper}>
                    <input
                      type="number"
                      id="modal-discount"
                      className={styles.discountInput}
                      value={discountPercent}
                      onChange={handleDiscountChange}
                      min={0}
                      max={100}
                      step={0.01}
                      placeholder="0"
                      aria-label="Descuento en porcentaje"
                    />
                    <span className={styles.percentSymbol}>%</span>
                  </div>
                  <div className={styles.discountAmount}>
                    S/ {discountAmount.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className={styles.summaryRow}>
                <span>IGV (18%)</span>
                <span>S/ {igv.toFixed(2)}</span>
              </div>

              <div className={styles.totalRow}>
                <span>Total: </span>
                <span>S/ {total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className={styles.chargeBtn}
                onClick={handleCharge}
                disabled={items.length === 0}
              >
                <IoMdCash size={20} />
                <span>Cobrar S/ {total.toFixed(2)}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
