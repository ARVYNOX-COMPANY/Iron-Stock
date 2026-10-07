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
  { title: "Inicio", icon: <IoHomeOutline /> },
  { title: "POS / Venta", icon: <IoCartOutline /> },
  { title: "Inventario & Kardex", icon: <IoClipboardOutline /> },
  { title: "Productos", icon: <IoCubeOutline /> },
  { title: "Reportes", icon: <IoBarChartOutline /> },
  { title: "Historial", icon: <IoTimeOutline /> },
  { title: "Configuración", icon: <IoSettingsOutline /> },
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
        } fixed top-0 left-0 h-screen w-[260px] bg-[var(--background-dark)] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
          <IoStorefrontOutline size={24} />
          <span className="text-lg font-semibold">Iron Stock</span>
        </div>

        <nav className="flex flex-col gap-1 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.title} title={item.title} icon={item.icon} />
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
