import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    to: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const base =
  "inline-flex items-center gap-2 px-4 py-2 " +
  "h-[50px] font-poppins text-[16px] font-normal " +
  "rounded-full bg-[var(--light-main)] text-[var(--light-text)] " +
  "transition " +
  "hover:brightness-95 " +
  "focus:outline-none focus:ring-2 focus:ring-[var(--light-text)]/30";

const NavActionButton: React.FC<Props> = ({
    to,
    label,
    icon,
    disabled,
    className = "",
    onClick,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled) return;
        onClick?.();
        navigate(to);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`${base} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default NavActionButton;
