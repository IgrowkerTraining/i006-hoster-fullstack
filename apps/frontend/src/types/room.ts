// 1. constantes primero
// /* se usan en RoomCard */
export const TYPE_INITIALS: Record<keyof typeof TYPE_BORDER, string> = {
	Estandar: "E",
	Deluxe: "D",
	Presidencial: "P",
} as const;

export const TYPE_BORDER = {
	Estandar: "border-l-[var(--light-chart1)]",
	Deluxe: "border-l-[var(--light-chart2)]",
	Presidencial: "border-l-[var(--light-chart3)]",
} as const;

export const STATUS_STYLES = {
	Ocupada:
		"border-[var(--light-status-ocupied)] bg-[color-mix(in_srgb,var(--light-status-ocupied),transparent_80%)]",
	Limpieza:
		"border-[var(--light-status-pending)] bg-[color-mix(in_srgb,var(--light-status-pending),transparent_80%)] ",
	Disponible:
		"border-[var(--light-status-completed)] bg-[color-mix(in_srgb,var(--light-status-completed),transparent_80%)] ",
} as const;

/* se usan en RoomsOverview */
export const ROOM_TYPES_LEGEND = [
	{ label: "Estándar", color: "bg-[var(--light-chart1)]" },
	{ label: "Deluxe", color: "bg-[var(--light-chart2)]" },
	{ label: "Presidencial", color: "bg-[var(--light-chart3)]" },
] as const;

export const STATUS_LEGEND = [
	{ label: "Ocupado", color: "bg-[var(--light-status-ocupied)]" },
	{ label: "En limpieza", color: "bg-[var(--light-status-pending)]" },
	{ label: "Disponible", color: "bg-[var(--light-status-completed)]" },
] as const;

// 2. tipos derivados de constantes
export type RoomType = keyof typeof TYPE_BORDER;
export type RoomStatus = keyof typeof STATUS_STYLES;

export interface RoomProps {
	id: string;
	type: RoomType;
	status: RoomStatus;
	capacity: number;
}
