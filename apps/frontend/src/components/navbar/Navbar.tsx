import React, { useState } from "react";
import {
	House,
	Hotel,
	FileText,
	LogOut,
	ChevronLeft,
	Sun,
	Moon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// modo
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import type { RootState, AppDispatch } from "../../store/store";

const baseBtn =
	"flex items-center gap-3 rounded-lg transition px-2 py-2 w-full";
const iconWrapper =
	"w-[40px] h-[40px] flex items-center justify-center rounded-lg";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const mode = useSelector((s: RootState) => s.theme.mode);

	const handleLogout = () => {
		console.log("logout");
	};

	return (
		<aside
			className={`relative h-screen bg-[var(--light-main2)] flex flex-col py-4 transition-all duration-300 ${isOpen ? "w-[243px]" : "w-[80px]"}`}
		>
			{/* Logo */}
			<div className="flex items-center gap-3 px-4 mt-2">
				<img
					src="/images/Hoster.svg"
					alt="Hoster"
					className="w-12 h-12 object-contain "
				/>
				{isOpen && (
					<span className="font-semibold text-[35px] text-[var(--light-text)]">
						Hoster
					</span>
				)}
			</div>

			{/* 🔘 Botón colapsar  */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="absolute top-1/2 -translate-y-1/2 -right-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[var(--light-main2)] text-[var(--light-text)] shadow-sm transition"
				title={isOpen ? "Cerrar menú" : "Abrir menú"}
			>
				<ChevronLeft
					size={14}
					className={`transition-transform ${!isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{/* Línea separadora */}
			<div className="mt-4 flex justify-center">
				<div
					className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-[180px]" : "w-8"}`}
				/>
			</div>

			{/* Menú */}
			<nav className="flex flex-col gap-2 mt-8 px-3">
				<NavLink to="/dashboard">
					{({ isActive }) => (
						<div
							className={`${baseBtn} ${
								isActive
									? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
									: "text-[var(--light-text)]"
							}`}
						>
							<div className={iconWrapper}>
								<House size={35} />
							</div>
							{isOpen && <span>Inicio</span>}
						</div>
					)}
				</NavLink>

				<NavLink to="/roomsOverview">
					{({ isActive }) => (
						<div
							className={`${baseBtn} ${
								isActive
									? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
									: "text-[var(--light-text)]"
							}`}
						>
							<div className={iconWrapper}>
								<Hotel size={35} />
							</div>
							{isOpen && <span>Alojamiento</span>}
						</div>
					)}
				</NavLink>

				<NavLink to="/reports">
					{({ isActive }) => (
						<div
							className={`${baseBtn} ${
								isActive
									? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
									: "text-[var(--light-text)]"
							}`}
						>
							<div className={iconWrapper}>
								<FileText size={35} />
							</div>
							{isOpen && <span>Reportes</span>}
						</div>
					)}
				</NavLink>
			</nav>

			{/* Tema (Sol / Luna) */}
			<div className="mt-auto px-3">
				<button
					type="button"
					onClick={() => dispatch(toggleTheme())}
					className={`
      w-full flex items-center gap-3 rounded-lg px-2 py-2 transition
      text-[var(--light-text)] hover:bg-black/5
    `}
					title="Cambiar tema"
				>
					{/* Toggle visual */}
					<div className="w-[52px] h-[28px] rounded-full bg-[var(--light-main)] relative flex items-center px-1">
						{/* “bolita” */}
						<div
							className={`
          w-[22px] h-[22px] rounded-full bg-[var(--light-main2)]
          flex items-center justify-center
          transition-transform duration-300
          ${mode === "dark" ? "translate-x-[22px]" : "translate-x-0"}
        `}
						>
							{mode === "dark" ? <Moon size={14} /> : <Sun size={14} />}
						</div>
					</div>

					{/* Texto SOLO cuando está desplegado */}
					{isOpen && (
						<span className="font-poppins text-[14px] font-medium">
							{mode === "dark" ? "Modo oscuro" : "Modo claro"}
						</span>
					)}
				</button>
			</div>

			{/* Logout */}
			<div className="px-3 mb-3">
				<button
					onClick={handleLogout}
					className={`${baseBtn} text-[var(--light-text)] hover:text-red-600 hover:bg-red-500/10`}
				>
					<div className={iconWrapper}>
						<LogOut size={24} />
					</div>
					{isOpen && <span>Cerrar sesión</span>}
				</button>
			</div>
		</aside>
	);
};

export default Navbar;
