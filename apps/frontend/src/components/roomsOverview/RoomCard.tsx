import React, { useState } from "react";
import Modal from "./Modal";
import type { RoomProps } from "../../types/room";
import { TYPE_INITIALS, STATUS_STYLES, TYPE_BORDER } from "../../types/room";
import { User } from "lucide-react";
import {
	Bath,
	BedDouble,
	ShowerHead,
	SoapDispenserDroplet,
} from "lucide-react";

const RoomCard: React.FC<RoomProps> = ({ id, type, status, capacity }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="group">
			{/*Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={id}
			>
				<div className="flex flex-col justify-between items-start gap-2 font-['Poppins'] text-[20px]">
					<span
						className={` px-2 py-0.5 rounded-full uppercase border ${STATUS_STYLES[status]}`}
					>
						{status === "Limpieza" ? "En limpieza" : status}
					</span>
					{type}
					<div className="flex gap-2">
						{Array.from({ length: capacity }).map((_, i) => (
							<User key={i} size={23} className="text-[var(--light-text)]" />
						))}
					</div>
					<div className="flex gap-2">
						<ShowerHead size={22} />
						<BedDouble size={22} />
						<SoapDispenserDroplet size={22} />
						<Bath size={22} />
					</div>

					<p>Precio por noche: $ 75.000</p>
					<p>
						Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et dolore magna
						aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</Modal>

			{/* Contenedor padre opcional para efectos */}
			<div
				onClick={() => setIsModalOpen(true)} // AHORA ES UN CLIC
				className={`relative cursor-pointer bg-[var(--light-card)] text-[var(--light-text)] rounded-2xl p-4 h-48 w-full  min-h-[250px] flex flex-col justify-between border-l-[6px] ${TYPE_BORDER[type]}`}
			>
				{/* SVG de Borde Punteado */}
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
					preserveAspectRatio="none"
				>
					<rect
						x="-6"
						y="1"
						width="calc(100% + 5px)"
						height="calc(100% - 2px)"
						rx="16"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeDasharray="10, 10"
						className="shape-rendering-crispEdges text-[var(--light-text)]"
					/>
				</svg>

				<div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
					{/* Header: Iconos y Badge */}
					<div className="flex flex-col justify-between items-start gap-2">
						<div className="flex gap-0.5">
							{Array.from({ length: capacity }).map((_, i) => (
								<User key={i} size={23} className="text-[var(--light-text)]" />
							))}
						</div>

						<span
							className={`font-['Poppins'] text-[14px] px-2 py-0.5 rounded-full uppercase border ${STATUS_STYLES[status]}`}
						>
							{status === "Limpieza" ? "En limpieza" : status}
						</span>
					</div>

					{/* Body: ID de Habitación */}
					<div className="absolute inset-0 flex justify-center items-center pointer-events-none ">
						<h3 className="font-['Poppins'] font-bold text-[40px] pointer-events-auto">
							{id} - {TYPE_INITIALS[type]}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomCard;
