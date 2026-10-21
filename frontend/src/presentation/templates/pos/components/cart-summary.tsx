import { formatPrice } from "@/presentation/utils/pos";

interface CartSummaryProps {
  subtotal: number;
  igv: number;
  igvRate: number;
  discountPercent: number;
  discountAmount: number;
  maxDiscount: number;
  total: number;
  onDiscountChange: (value: number) => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm text-gray-light">
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);

const CartSummary = ({
  subtotal,
  igv,
  igvRate,
  discountPercent,
  discountAmount,
  maxDiscount,
  total,
  onDiscountChange,
}: CartSummaryProps) => (
  <dl className="flex flex-col gap-2">
    <Row label="Subtotal" value={formatPrice(subtotal)} />
    <Row label={`IGV (${igvRate}%)`} value={formatPrice(igv)} />
    <div className="flex items-center justify-between text-sm text-gray-light">
      <dt>
        <label htmlFor="discount">Descuento (%)</label>
      </dt>
      <dd className="flex items-center gap-2">
        {discountAmount > 0 && (
          <span className="text-success">-{formatPrice(discountAmount)}</span>
        )}
        <input
          id="discount"
          type="number"
          min={0}
          max={maxDiscount}
          value={discountPercent}
          onChange={(e) =>
            onDiscountChange(
              Math.min(maxDiscount, Math.max(0, Number(e.target.value) || 0)),
            )
          }
          className="w-16 rounded-lg border border-border bg-surface px-2 py-1 text-right outline-none focus:border-button-primary"
        />
      </dd>
    </div>
    <div className="mt-1 flex justify-between border-t border-dashed border-border pt-3 text-xl font-extrabold text-primary">
      <dt>Total</dt>
      <dd>{formatPrice(total)}</dd>
    </div>
  </dl>
);

export default CartSummary;
