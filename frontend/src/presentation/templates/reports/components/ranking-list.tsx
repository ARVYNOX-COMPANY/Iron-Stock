interface RankingListProps {
  title: string;
  items: { label: string; value: number }[];
  formatValue: (value: number) => string;
  barClassName?: string;
}

const RankingList = ({
  title,
  items,
  formatValue,
  barClassName = "bg-button-primary",
}: RankingListProps) => {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-base font-semibold text-primary">{title}</h2>
      {items.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-light">Sin datos.</p>
      ) : (
        <ol className="flex flex-col gap-3.5">
          {items.map(({ label, value }) => (
            <li key={label}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="truncate">{label}</span>
                <b className="shrink-0">{formatValue(value)}</b>
              </div>
              <div className="h-2 rounded-full bg-border">
                <div
                  className={`h-2 rounded-full ${barClassName}`}
                  style={{ width: `${(value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default RankingList;
