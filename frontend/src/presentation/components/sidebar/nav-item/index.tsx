import styles from "./index.module.css";

const NavItem = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactElement;
}) => {
  return (
    <button className={`${styles.navItem} flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors hover:bg-white/10`}>
      <span className="text-lg flex items-center justify-center">{icon}</span>
      <p className="text-sm font-medium truncate">{title}</p>
    </button>
  );
};

export default NavItem;
