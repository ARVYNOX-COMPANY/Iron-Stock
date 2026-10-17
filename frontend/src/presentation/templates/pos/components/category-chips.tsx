import { Category } from "@/domain/entities/categories";

interface CategoryChipsProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategoryChips = ({
  categories,
  selectedId,
  onSelect,
}: CategoryChipsProps) => (
  <div
    role="tablist"
    aria-label="Categorías"
    className="mb-4 flex gap-2 overflow-x-auto pb-1"
  >
    {categories.map(({ id, name }) => {
      const active = id === selectedId;
      return (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onSelect(id)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            active
              ? "border-button-primary bg-button-primary text-white"
              : "border-border bg-surface text-primary hover:border-button-primary"
          }`}
        >
          {name}
        </button>
      );
    })}
  </div>
);

export default CategoryChips;
