import React, { useState } from "react";
import RoomCard from "../components/roomsOverview/RoomCard";
import ServiciosAdicionales from "../components/roomsOverview/Servicios/ServiceCard";
import type { RoomProps } from "../types/room";
import { ROOM_TYPES_LEGEND, STATUS_LEGEND } from "../types/room";

// Dentro de RoomsOverview.tsx
const roomsData: RoomProps[] = [
	// Habitaciones
	{ id: "H01", type: "Presidencial", status: "Ocupada", capacity: 2 },
	{ id: "H02", type: "Deluxe", status: "Ocupada", capacity: 2 },
	{ id: "H03", type: "Deluxe", status: "Limpieza", capacity: 4 },
	{ id: "H04", type: "Deluxe", status: "Disponible", capacity: 4 },
	{ id: "H05", type: "Deluxe", status: "Disponible", capacity: 2 },
	{ id: "H06", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H07", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "H08", type: "Estandar", status: "Disponible", capacity: 3 },
	{ id: "H09", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H10", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H11", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H12", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H13", type: "Estandar", status: "Disponible", capacity: 3 },
	{ id: "H14", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H15", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H16", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H17", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "H18", type: "Estandar", status: "Disponible", capacity: 4 },
	// Cabañas
	{ id: "C01", type: "Presidencial", status: "Ocupada", capacity: 2 },
	{ id: "C02", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "C03", type: "Estandar", status: "Disponible", capacity: 3 },
	{ id: "C04", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "C05", type: "Deluxe", status: "Disponible", capacity: 4 },
	{ id: "C06", type: "Deluxe", status: "Disponible", capacity: 2 },
];

const LegendItem = ({ color, label }: { color: string; label: string }) => (
	<div className="flex items-center gap-2 w-[180px] text-[var(--light-text)]">
		<span className={`w-8 h-8 rounded ${color}`}></span>
		<span>{label}</span>
	</div>
);

const RoomsOverview: React.FC = () => {
	const tabs = ["Habitaciones", "Cabañas", "Servicios Adicionales"] as const;
	const [activeTab, setActiveTab] =
		useState<(typeof tabs)[number]>("Habitaciones");

	const filteredRooms = roomsData.filter((room) => {
		if (activeTab === "Habitaciones") return room.id.startsWith("H");
		return room.id.startsWith("C");
	});

	const isServicios = activeTab === "Servicios Adicionales";

	return (
		<div className="h-[100vh] overflow-y-auto scroll-y-auto p-6 font-['Poppins']">
			<h1 className="font-medium text-[var(--light-text)] text-[35px] px-6">
				Unidades de Alojamiento
			</h1>

			{/* BUTTONS */}
			<div className="flex gap-3 bg-[var(--light-main2)] max-w-[515px] rounded-lg p-1 m-6">
				{tabs.map((label) => {
					const isActive = activeTab === label;

					return (
						<button
							key={label}
							onClick={() => setActiveTab(label)}
							className={`px-2 whitespace-nowrap text-[20px] h-[42px] font-normal rounded-md transition ${isActive ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm" : "text-[var(--light-text)] hover:bg-white/10"}`}
						>
							{label}
						</button>
					);
				})}
			</div>

			{/* LEYENDA */}
			{!isServicios && (
				<div className="flex gap-x-6 pt-0 p-6 items-centerself-start text-[20px] text-[var(--light-text)]">
					<div className="flex-col border-r-[2px] border-r-[var(--light-outline)]">
						<h2 className="font-semibold text-[20px]">
							{activeTab === "Habitaciones"
								? "Tipo de habitación"
								: "Tipo de cabaña"}
						</h2>
						<div className="flex flex-wrap  gap-3 pt-5">
							{ROOM_TYPES_LEGEND.map((item) => (
								<LegendItem key={item.label} {...item} />
							))}
						</div>
					</div>

					<div className="flex-col">
						<h2 className="font-semibold text-[20px]">Estado</h2>
						<div className="flex flex-wrap gap-3 pt-5">
							{STATUS_LEGEND.map((item) => (
								<LegendItem key={item.label} {...item} />
							))}
						</div>
					</div>
				</div>
			)}

			<div
				className={`grid gap-6 pt-4 pb-[20dvh] text-[var(--light-text)] ${
					isServicios
						? "w-full grid-cols-[repeat(auto-fill,372px)] justify-start px-6"
						: "p-2 grid-cols-[repeat(auto-fill,250px)] justify-center"
				}`}
			>
				{activeTab === "Servicios Adicionales" ? (
					<ServiciosAdicionales />
				) : (
					filteredRooms.map((room) => <RoomCard key={room.id} {...room} />)
				)}
			</div>
		</div>
	);
};

export default RoomsOverview;
