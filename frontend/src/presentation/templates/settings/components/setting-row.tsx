import type { ReactNode } from "react";

interface SettingRowProps {
  title: string;
  description?: string;
  htmlFor?: string;
  children: ReactNode;
}

const SettingRow = ({
  title,
  description,
  htmlFor,
  children,
}: SettingRowProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3.5 last:border-b-0">
    <div className="min-w-0">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-sm font-medium text-primary">
          {title}
        </label>
      ) : (
        <p className="text-sm font-medium text-primary">{title}</p>
      )}
      {description && <p className="text-xs text-gray-light">{description}</p>}
    </div>

    <div className="shrink-0">{children}</div>
  </div>
);

export default SettingRow;
