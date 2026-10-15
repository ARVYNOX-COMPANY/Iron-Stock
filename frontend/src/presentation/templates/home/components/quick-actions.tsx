import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const ACTIONS = [
  { label: "Nueva venta", href: "/pos", primary: true },
  { label: "Agregar producto", href: "/products" },
  { label: "Ingreso de mercadería", href: "/inventary" },
];

const QuickActions = () => (
  <nav aria-label="Acciones rápidas" className="flex flex-wrap gap-2">
    {ACTIONS.map(({ label, href, primary }) => (
      <Link
        key={href}
        href={href}
        className={`inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-sm font-semibold transition-colors ${
          primary
            ? "bg-button-primary text-white hover:bg-button-primary-hover"
            : "border border-gray-200 bg-button-secondary text-primary hover:bg-gray-200"
        }`}
      >
        {primary && <IoAdd size={18} aria-hidden="true" />}
        {label}
      </Link>
    ))}
  </nav>
);

export default QuickActions;
