import type {
  BusinessInfo,
  Settings,
} from "@/presentation/store/slices/settings.slice";

export type BusinessErrors = Partial<Record<keyof BusinessInfo, string>>;

export type UpdateSetting = <K extends keyof Settings>(
  key: K,
  value: Settings[K],
) => void;

export const MAX_LOGO_BYTES = 1024 * 1024;

export const PAYMENT_LABELS: Record<keyof Settings["paymentMethods"], string> =
  {
    cash: "Efectivo",
    card: "Tarjeta",
    yape: "Yape / Plin",
    transfer: "Transferencia",
  };

export const numberInputClass =
  "w-24 rounded-[10px] border border-gray-300 px-3 py-2 text-right text-sm outline-none focus:border-button-primary focus:ring-2 focus:ring-blue-100";

const RUC_REGEX = /^(10|20)\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateBusiness = (business: BusinessInfo): BusinessErrors => {
  const errors: BusinessErrors = {};
  if (!business.name.trim()) errors.name = "Ingresa el nombre comercial.";
  if (business.ruc && !RUC_REGEX.test(business.ruc))
    errors.ruc = "El RUC debe tener 11 dígitos y empezar con 10 o 20.";
  if (business.email && !EMAIL_REGEX.test(business.email))
    errors.email = "Ingresa un correo válido.";
  return errors;
};

export const toNumber = (
  value: string,
  min = 0,
  max = Number.POSITIVE_INFINITY,
) => Math.min(max, Math.max(min, Number(value) || 0));
