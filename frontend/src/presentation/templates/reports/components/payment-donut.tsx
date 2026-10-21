import type { Sale } from "@/presentation/store/slices/sales.slice";
import { PAYMENT_COLORS, PAYMENT_LABELS } from "@/presentation/utils/reports";

interface PaymentDonutProps {
  data: { method: Sale["paymentMethod"]; value: number }[];
}

const PaymentDonut = ({ data }: PaymentDonutProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const gradient = data
    .reduce<{ stops: string[]; end: number }>(
      ({ stops, end }, { method, value }) => {
        const next = end + (value / total) * 100;
        return {
          stops: [...stops, `${PAYMENT_COLORS[method]} ${end}% ${next}%`],
          end: next,
        };
      },
      { stops: [], end: 0 },
    )
    .stops.join(", ");

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-base font-semibold text-primary">
        Métodos de pago
      </h2>
      {total === 0 ? (
        <p className="py-16 text-center text-sm text-gray-light">Sin datos.</p>
      ) : (
        <>
          <div
            className="relative mx-auto mb-5 h-36 w-36 rounded-full"
            style={{ background: `conic-gradient(${gradient})` }}
            role="img"
            aria-label="Distribución por método de pago"
          >
            <div className="absolute inset-7 rounded-full bg-surface" />
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            {data.map(({ method, value }) => (
              <li key={method} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: PAYMENT_COLORS[method] }}
                    aria-hidden="true"
                  />
                  {PAYMENT_LABELS[method]}
                </span>
                <b>{((value / total) * 100).toFixed(0)}%</b>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default PaymentDonut;
