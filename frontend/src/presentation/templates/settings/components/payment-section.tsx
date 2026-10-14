import type { Settings } from "@/presentation/store/slices/settings.slice";
import SectionCard from "./section-card";
import { PAYMENT_LABELS } from "@/presentation/utils/settings";

type PaymentMethods = Settings["paymentMethods"];

interface PaymentSectionProps {
  value: PaymentMethods;
  onChange: (value: PaymentMethods) => void;
}

const PaymentSection = ({ value, onChange }: PaymentSectionProps) => (
  <SectionCard
    title="Métodos de pago"
    description="Los que aparecen al cobrar en POS."
  >
    <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <legend className="sr-only">Métodos de pago habilitados</legend>
      {(Object.keys(PAYMENT_LABELS) as (keyof PaymentMethods)[]).map((key) => (
        <label
          key={key}
          className={`flex cursor-pointer items-center gap-3 rounded-[10px] border px-3.5 py-2.5 text-sm font-medium transition-colors ${
            value[key]
              ? "border-button-primary bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input
            type="checkbox"
            checked={value[key]}
            onChange={(e) => onChange({ ...value, [key]: e.target.checked })}
            className="h-4 w-4 accent-button-primary"
          />
          {PAYMENT_LABELS[key]}
        </label>
      ))}
    </fieldset>
  </SectionCard>
);

export default PaymentSection;
