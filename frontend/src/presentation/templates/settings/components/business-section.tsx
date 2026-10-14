"use client";

import { useState, type ChangeEvent } from "react";
import { IoImageOutline } from "react-icons/io5";
import type { BusinessInfo } from "@/presentation/store/slices/settings.slice";
import SectionCard from "./section-card";
import TextField from "@/presentation/components/text-field";
import {
  MAX_LOGO_BYTES,
  type BusinessErrors,
} from "@/presentation/utils/settings";

interface BusinessSectionProps {
  value: BusinessInfo;
  errors: BusinessErrors;
  onChange: (value: BusinessInfo) => void;
}

const BusinessSection = ({ value, errors, onChange }: BusinessSectionProps) => {
  const [logoError, setLogoError] = useState("");

  const field =
    (key: keyof BusinessInfo) => (e: ChangeEvent<HTMLInputElement>) =>
      onChange({ ...value, [key]: e.target.value });

  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("El logo debe pesar menos de 1 MB.");
      return;
    }
    setLogoError("");
    const reader = new FileReader();
    reader.onload = () => onChange({ ...value, logo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <SectionCard
      title="Datos del negocio"
      description="Aparecen en tus comprobantes y reportes."
      className="mb-4"
    >
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <label className="group flex h-28 w-28 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-button-secondary text-button-primary hover:border-button-primary focus-within:ring-2 focus-within:ring-blue-100">
            {value.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value.logo}
                alt="Logo del negocio"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <IoImageOutline
                  size={32}
                  className="text-blue-300 group-hover:text-button-primary"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold">Subir logo</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleLogo}
              aria-label="Subir logo"
            />
          </label>
          {logoError && (
            <p className="max-w-28 text-center text-xs text-red-600">
              {logoError}
            </p>
          )}
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="name"
            label="Nombre comercial"
            placeholder="Ferretería El Tornillo"
            value={value.name}
            onChange={field("name")}
            error={errors.name}
          />
          <TextField
            id="ruc"
            label="RUC"
            inputMode="numeric"
            maxLength={11}
            placeholder="20601234567"
            value={value.ruc}
            onChange={field("ruc")}
            error={errors.ruc}
          />
          <TextField
            id="address"
            label="Dirección"
            placeholder="Av. Los Constructores 123, Lima"
            value={value.address}
            onChange={field("address")}
          />
          <TextField
            id="phone"
            label="Teléfono"
            type="tel"
            placeholder="987 654 321"
            value={value.phone}
            onChange={field("phone")}
          />
          <TextField
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="ventas@tuferreteria.pe"
            className="sm:col-span-2"
            value={value.email}
            onChange={field("email")}
            error={errors.email}
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default BusinessSection;
