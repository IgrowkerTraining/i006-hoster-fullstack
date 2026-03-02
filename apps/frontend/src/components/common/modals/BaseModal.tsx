import React from "react";
import { X } from "lucide-react";

type BaseModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;

	/** NUEVO: contenido del header (izquierda) */
	headerSlot?: React.ReactNode;

	/** opcional */
	hideClose?: boolean;
};

const BaseModal: React.FC<BaseModalProps> = ({
	open,
	onClose,
	children,
	headerSlot,
	hideClose = false,
}) => {
	if (!open) return null;

	const hasHeader = Boolean(headerSlot);

	return (
		<div className="fixed inset-0 z-50">
			{/* overlay */}
			<button
				type="button"
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-label="Cerrar modal"
			/>

			{/* dialog */}
			<div className="relative mx-auto mt-16 w-[min(920px,92vw)] rounded-2xl bg-[var(--light-card)] shadow-xl overflow-hidden">
				{/* HEADER TOP BAR */}
				{hasHeader && (
					<div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
						<div className="min-w-0">{headerSlot}</div>

						<button
							type="button"
							onClick={onClose}
							className="ml-4 p-2 rounded-lg hover:bg-black/5"
							aria-label="Cerrar"
							title="Cerrar"
						>
							<X size={18} />
						</button>
					</div>
				)}

				{/* CONTENT */}
				<div className={hasHeader ? "p-6" : "p-6 pt-6"}>{children}</div>
			</div>
		</div>
	);
};

export default BaseModal;
