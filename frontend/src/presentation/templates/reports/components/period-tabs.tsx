import { PERIOD_LABELS, type Period } from "@/presentation/utils/reports";

interface PeriodTabsProps {
  value: Period;
  onChange: (period: Period) => void;
}

const PeriodTabs = ({ value, onChange }: PeriodTabsProps) => (
  <div
    role="tablist"
    aria-label="Periodo"
    className="flex rounded-xl border border-border bg-surface p-1"
  >
    {(Object.keys(PERIOD_LABELS) as Period[]).map((period) => (
      <button
        key={period}
        type="button"
        role="tab"
        aria-selected={value === period}
        onClick={() => onChange(period)}
        className={`flex-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors sm:flex-none ${
          value === period
            ? "bg-button-primary text-white"
            : "text-gray-light hover:text-primary"
        }`}
      >
        {PERIOD_LABELS[period]}
      </button>
    ))}
  </div>
);

export default PeriodTabs;
