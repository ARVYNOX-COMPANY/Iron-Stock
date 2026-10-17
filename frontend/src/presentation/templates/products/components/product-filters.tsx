import { IoSearch } from "react-icons/io5";
import {
  CATEGORIES,
  STATUS_LABELS,
  inputClass,
  type StatusFilter,
  type StockStatus,
} from "@/presentation/utils/products";

interface ProductFiltersProps {
  search: string;
  category: string;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
}

const ProductFilters = ({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ProductFiltersProps) => (
  <div className="mb-4 flex flex-col gap-3 md:flex-row">
    <div className="relative flex-1">
      <IoSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar por nombre o código..."
        aria-label="Buscar productos"
        className={`${inputClass} pl-9`}
      />
    </div>
    <select
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      aria-label="Filtrar por categoría"
      className={`${inputClass} md:w-48`}
    >
      <option value="all">Todas las categorías</option>
      {CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
      aria-label="Filtrar por estado"
      className={`${inputClass} md:w-44`}
    >
      <option value="all">Todos los estados</option>
      {(Object.keys(STATUS_LABELS) as StockStatus[]).map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  </div>
);

export default ProductFilters;
