"use client";

import { useState, type FormEvent } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/presentation/store/hooks";
import {
  saveSettings,
  selectSettings,
  type BusinessInfo,
  type Settings,
} from "@/presentation/store/slices/settings.slice";
import BusinessSection from "./components/business-section";
import SalesSection from "./components/sales-section";
import PaymentSection from "./components/payment-section";
import InventorySection from "./components/inventory-section";
import {
  validateBusiness,
  type BusinessErrors,
  type UpdateSetting,
} from "@/presentation/utils/settings";

const SettingsTemplate = () => {
  const dispatch = useAppDispatch();
  const saved = useAppSelector(selectSettings);
  const [form, setForm] = useState<Settings>(saved);
  const [errors, setErrors] = useState<BusinessErrors>({});
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  const update: UpdateSetting = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setJustSaved(false);
  };

  const updateBusiness = (business: BusinessInfo) => {
    update("business", business);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateBusiness(form.business);
    setErrors(found);
    if (Object.keys(found).length) return;
    dispatch(saveSettings(form));
    setJustSaved(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="px-4 py-6 sm:px-6 lg:px-10"
    >
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            Configuración
          </h1>
          <p className="mt-1 text-sm text-gray-light">
            Administra los datos de tu ferretería, ventas e inventario
          </p>
        </div>
        <div className="flex items-center gap-3">
          {justSaved && !isDirty && (
            <span
              role="status"
              className="flex items-center gap-1 text-sm text-green-600"
            >
              <IoCheckmarkCircle size={18} aria-hidden="true" /> Cambios
              guardados
            </span>
          )}
          <button
            type="submit"
            disabled={!isDirty}
            className="btn-primary font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Guardar cambios
          </button>
        </div>
      </header>

      <BusinessSection
        value={form.business}
        errors={errors}
        onChange={updateBusiness}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SalesSection form={form} update={update} />
        <PaymentSection
          value={form.paymentMethods}
          onChange={(v) => update("paymentMethods", v)}
        />
        <InventorySection form={form} update={update} />
      </div>
    </form>
  );
};

export default SettingsTemplate;
