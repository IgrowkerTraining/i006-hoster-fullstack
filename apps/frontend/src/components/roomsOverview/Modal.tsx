import React from "react";
import { X } from "lucide-react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	// Si no está abierto, no renderizamos nada
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop (Fondo oscuro) */}
			<div
				className="fixed inset-0 bg-black/50 transition-opacity"
				onClick={onClose}
			/>

			{/* Contenedor del Modal */}
			<div className="relative z-10 w-full max-w-[697px] overflow-hidden rounded-xl bg-[var(--light-card)] p-6 shadow-xl transition-all">
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-[40px] font-medium font-['Poppins'] text-[var(--light-text)]">
						{title}
					</h3>
					<button
						onClick={onClose}
						className="text hover:text-gray-600 transition-colors"
					>
						<X size={22} />
					</button>
				</div>

				{/* Body */}
				<div className="mt-2 text-[var(--light-text)]">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
