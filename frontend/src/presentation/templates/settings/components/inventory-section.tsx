import type { Settings } from "@/presentation/store/slices/settings.slice";
import SectionCard from "./section-card";
import SettingRow from "./setting-row";
import Toggle from "@/presentation/components/toggle";
import {
  numberInputClass,
  toNumber,
  type UpdateSetting,
} from "@/presentation/utils/settings";

interface InventorySectionProps {
  form: Settings;
  update: UpdateSetting;
}

const InventorySection = ({ form, update }: InventorySectionProps) => (
  <SectionCard
    title="Inventario"
    description="Alertas de stock en Inicio e Inventario."
  >
    <SettingRow
      title="Alerta de stock bajo"
      description="Avisar cuando queden estas unidades o menos"
      htmlFor="low-stock"
    >
      <input
        id="low-stock"
        type="number"
        min={0}
        className={numberInputClass}
        value={form.lowStockThreshold}
        onChange={(e) => update("lowStockThreshold", toNumber(e.target.value))}
      />
    </SettingRow>
    <SettingRow
      title="Permitir vender sin stock"
      description="Útil para pedidos por encargo"
    >
      <Toggle
        label="Permitir vender sin stock"
        checked={form.allowSellWithoutStock}
        onChange={(v) => update("allowSellWithoutStock", v)}
      />
    </SettingRow>
  </SectionCard>
);

export default InventorySection;
