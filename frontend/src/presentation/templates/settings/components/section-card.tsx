import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const SectionCard = ({
  title,
  description,
  className = "",
  children,
}: SectionCardProps) => (
  <section
    className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
  >
    <header className="mb-4">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      {description && (
        <p className="mt-0.5 text-sm text-gray-light">{description}</p>
      )}
    </header>
    {children}
  </section>
);

export default SectionCard;
