export interface ActividadDiariaItem {
  reservaId: number;
  estado: "Check-in" | "Check-out";
  estadoDetalle: string;
  cliente: {
    nombre: string;
  };
  personas: number;
  pago: "parcial" | "completo" | "pendiente";
  horarioEstimado?: {
    llegada?: string;
    salida?: string;
  };
  habitacion: number;
  serviciosAdicionales: {
    cantidad: number;
    parking: boolean;
  };
  fechas: {
    llegada: string;
    salida: string;
  };
}

export interface DashboardData {
  actividadDiaria: ActividadDiariaItem[];
}


export interface UltimaActividadItem {
  reservaId: number;
  tipo: "Nueva reserva" | "Check-in" | "Check-out" | string; // por si agregan más tipos
  cliente: string;
  personas: number;
  pago: "Parcial" | "Total" | "Pendiente" | string;
  hora: string; // "14:30"
  habitacion: string; // "06"
  serviciosAdicionales: number; // 0
  parking: boolean;
  fechas: {
    llegada: string;
    salida: string;
  };
}

export interface DashboardData {
  actividadDiaria: ActividadDiariaItem[];
  ultimasActividades: UltimaActividadItem[];
  mantenimiento?: {
    vista: string;
    items: any[];
  };
}

export type MaintenanceItem = {
  id: string;
  lugar: string;
  tipo: "Limpieza" | "Mantenimiento" | string;
  estado: string;
  duracionEstimada: string;
  responsable: string;
};
