import type { Settings } from "@/presentation/store/slices/settings.slice";
import SectionCard from "./section-card";
import SettingRow from "./setting-row";
import Toggle from "@/presentation/components/toggle";
import {
  numberInputClass,
  toNumber,
  type UpdateSetting,
} from "@/presentation/utils/settings";

interface SalesSectionProps {
  form: Settings;
  update: UpdateSetting;
}

const SalesSection = ({ form, update }: SalesSectionProps) => (
  <SectionCard
    title="Ventas e impuestos"
    description="Cómo se calcula el total de cada venta."
    className="lg:row-span-2"
  >
    <SettingRow
      title="Tasa de IGV"
      description="Impuesto general a las ventas (%)"
      htmlFor="igv"
    >
      <input
        id="igv"
        type="number"
        min={0}
        max={100}
        className={numberInputClass}
        value={form.igvRate}
        onChange={(e) => update("igvRate", toNumber(e.target.value, 0, 100))}
      />
    </SettingRow>

    <SettingRow
      title="Precios incluyen IGV"
      description="El precio del producto ya trae el impuesto"
    >
      <Toggle
        label="Precios incluyen IGV"
        checked={form.pricesIncludeIgv}
        onChange={(v) => update("pricesIncludeIgv", v)}
      />
    </SettingRow>

    <SettingRow
      title="Moneda"
      description="Se muestra en precios y comprobantes"
      htmlFor="currency"
    >
      <select
        id="currency"
        value={form.currency}
        onChange={(e) =>
          update("currency", e.target.value as Settings["currency"])
        }
        className="rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-button-primary focus:ring-2 focus:ring-blue-100"
      >
        <option value="PEN">S/ PEN</option>
        <option value="USD">$ USD</option>
      </select>
    </SettingRow>

    <SettingRow
      title="Descuento máximo"
      description="Tope que puede aplicar un cajero (%)"
      htmlFor="max-discount"
    >
      <input
        id="max-discount"
        type="number"
        min={0}
        max={100}
        className={numberInputClass}
        value={form.maxDiscount}
        onChange={(e) =>
          update("maxDiscount", toNumber(e.target.value, 0, 100))
        }
      />
    </SettingRow>
  </SectionCard>
);

export default SalesSection;
