import React from "react";

type MiniBarTabsProps<T extends string> = {
  tabs: readonly T[];
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;

  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;

  getLabel?: (tab: T) => React.ReactNode;
  disabled?: boolean;
};

const MiniBarTabs = <T extends string>({
  tabs,
  value,
  onChange,
  className = "",
  tabClassName = "",
  activeTabClassName = "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm",
  inactiveTabClassName = "text-[var(--light-text)] hover:bg-white/10",
  getLabel,
  disabled = false,
}: MiniBarTabsProps<T>) => {
  return (
    <div className={`flex bg-[var(--light-main2)] rounded-lg p-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = value === tab;

        return (
          <button
            key={tab}
            type="button"
            disabled={disabled}
            onClick={() => onChange(tab)}
            className={[
              "flex-1 py-2 font-poppins text-sm font-medium rounded-md transition",
              tabClassName,
              isActive ? activeTabClassName : inactiveTabClassName,
              disabled ? "opacity-60 cursor-not-allowed" : "",
            ].join(" ")}
          >
            {getLabel ? getLabel(tab) : tab}
          </button>
        );
      })}
    </div>
  );
};

export default MiniBarTabs;