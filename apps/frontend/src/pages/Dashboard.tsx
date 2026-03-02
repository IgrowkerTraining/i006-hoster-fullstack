import React, { useState, useEffect } from "react";
import { User } from "../types";
import { Button } from "../components/register/Button";
import { getAIGreeting } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import ActividadDiaria from "../components/dashboard/ActividadDiaria/ActividadDiaria";
import UltimaActividad from "../components/dashboard/GestionReservas/UltimaActividad";
import Mantenimiento from "../components/dashboard/Mantenimiento/Mantenimiento";
import AccionesRapidas from "../components/dashboard/AccionesRapidas";
import Ocupacion from "../components/dashboard/Ocupacion/Ocupacion";

const Dashboard: React.FC = () => {
	const { user, logout } = useAuth();

	const demoUser: User = {
		id: "demo-001",
		name: "Invitado",
		username: "demo",
		avatar: "https://i.pravatar.cc/150?img=12",
		email: "demo@gmail.com",
	};

	return (
		<div className="h-[100vh] overflow-y-auto scroll-y-auto p-6">
			<h1 className="font-poppins font-medium text-[35px] text-[var(--light-text)] px-6 pb-2">
				Hotel Los Álamos
			</h1>

			{/* Botones */}
			<div className="p-6">
				<AccionesRapidas />
			</div>

			<div className=" grid grid-cols-1 md:grid-cols-[3fr_2fr] grid-rows-2 gap-6 p-6">
				{/* Bloque 1 (60%) */}
				<div className="border border-[var(--light-card)] rounded-xl p-4 bg-[var(--light-card)] shadow-sm">
					<ActividadDiaria />
				</div>

				{/* Bloque 2 (40%) */}
				<div className="border border-[var(--light-card)] rounded-xl p-4 bg-[var(--light-card)] shadow-sm">
					<Mantenimiento />
				</div>

				{/* Bloque 3 (60%) */}
				<div className="border border-[var(--light-card)] rounded-xl p-4 bg-[var(--light-card)] shadow-sm">
					<UltimaActividad />
				</div>

				{/* Bloque 4 (40%) */}
				<div className="border border-[var(--light-card)] rounded-xl p-4 bg-[var(--light-card)] shadow-sm">
					<Ocupacion />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
