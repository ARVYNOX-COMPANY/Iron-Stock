"use client";

import { useState } from "react";
import { useAppSelector } from "@/presentation/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
} from "@/presentation/store/slices/cart.slice";
import type { CartItem } from "@/presentation/store/slices/cart.slice";
import { IoMdCart } from "react-icons/io";
import CartModal from "@/presentation/templates/sale/charge/cart-modal";
import styles from "./index.module.css";

const Charge = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const totalItems = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.fixedBar}>
        <div className={styles.barContent}>
          <div>
            <div className={styles.barInfo}>
              <span className={styles.barLabel}>Cantidad de productos:</span>
              <span className={styles.barValue}>{totalItems}</span>
            </div>
            <div className={styles.barInfo}>
              <span className={styles.barLabel}>Total:</span>
              <span className={styles.barValue}>S/ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.viewSaleBtn}
            onClick={() => setShowModal(true)}
            disabled={items.length === 0}
            aria-label={
              items.length === 0
                ? "No hay productos en la venta"
                : "Ver detalle de venta"
            }
          >
            <IoMdCart size={20} />
            <span>Ver venta</span>
          </button>
        </div>
      </div>

      {showModal && <CartModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Charge;
