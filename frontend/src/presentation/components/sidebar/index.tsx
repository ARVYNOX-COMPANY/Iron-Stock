"use client";

import { useState } from "react";
import styles from "./index.module.css";
import NavItem from "./nav-item";
import {
  IoHomeOutline,
  IoCartOutline,
  IoClipboardOutline,
  IoCubeOutline,
  IoBarChartOutline,
  IoTimeOutline,
  IoSettingsOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

const navItems = [
  { title: "Inicio", icon: <IoHomeOutline />, link: "/", id: "1" },
  { title: "POS / Venta", icon: <IoCartOutline />, link: "/pos", id: "2" },
  {
    title: "Inventario & Kardex",
    icon: <IoClipboardOutline />,
    link: "/inventary",
    id: "3",
  },
  { title: "Productos", icon: <IoCubeOutline />, link: "/products", id: "4" },
  { title: "Reportes", icon: <IoBarChartOutline />, link: "/reports", id: "5" },
  { title: "Historial", icon: <IoTimeOutline />, link: "/history", id: "6" },
  {
    title: "Configuración",
    icon: <IoSettingsOutline />,
    link: "/settings",
    id: "7",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className={`${styles.toggleBtn} md:hidden fixed top-3 left-3 z-50 flex items-center justify-center w-9 h-9 rounded-md bg-[var(--background-dark)] text-white shadow-md`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <IoCloseOutline size={22} /> : <IoMenuOutline size={22} />}
      </button>

      <aside
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : ""
        } fixed top-0 left-0 h-screen shrink-0 md:sticky w-[260px] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out`}
      >
        <div
          className={`${styles.logoContainer} flex items-center gap-3 px-4 py-5 border-b border-white/10`}
        >
          <div
            className={`${styles.logoIcon} flex h-9 w-9 items-center justify-center rounded-lg`}
          >
            <IoStorefrontOutline size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight">
              Iron Stock
            </span>
            <span className="text-xs text-white/60">Inventory System</span>
          </div>
        </div>

        <nav
          className={`${styles.navContainer} flex flex-col gap-1 p-3 overflow-y-auto flex-1`}
        >
          {navItems.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </nav>
      </aside>

      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlayVisible : ""
        } md:hidden fixed inset-0 bg-black/40 z-30 transition-opacity duration-300`}
        onClick={closeSidebar}
      />
    </>
  );
};

export default Sidebar;
