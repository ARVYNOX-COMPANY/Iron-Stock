"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

const NavItem = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon: React.ReactElement;
  link: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive =
    pathname === link || (link !== "/" && pathname.startsWith(link));

  return (
    <button
      onClick={() => {
        router.push(link);
      }}
      className={`${styles.navItem} ${isActive ? styles.active : ""} cursor-pointer group flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="text-lg flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
        {icon}
      </span>
      <p className="text-sm font-medium truncate opacity-95 group-hover:opacity-100 transition-opacity">
        {title}
      </p>
    </button>
  );
};

export default NavItem;
