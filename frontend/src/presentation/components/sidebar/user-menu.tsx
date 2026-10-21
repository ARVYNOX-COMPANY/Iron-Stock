import { IoLogOutOutline } from "react-icons/io5";

interface UserMenuProps {
  name: string;
  role: string;
  onLogout?: () => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const UserMenu = ({ name, role, onLogout }: UserMenuProps) => (
  <div className="mt-auto flex items-center gap-3 border-t border-white/10 p-4">
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-button-primary text-sm font-bold text-white"
    >
      {getInitials(name)}
    </span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-white">{name}</p>
      <p className="truncate text-xs text-gray-light">{role}</p>
    </div>
    <button
      type="button"
      onClick={onLogout}
      aria-label="Cerrar sesión"
      title="Cerrar sesión"
      className="rounded-lg p-2 text-gray-light transition-colors hover:bg-danger-soft hover:text-danger"
    >
      <IoLogOutOutline size={20} />
    </button>
  </div>
);

export default UserMenu;
