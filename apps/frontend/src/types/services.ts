import type { icons } from "lucide-react";

export type LucideIconName = keyof typeof icons;

export type ServiceItem = {
  id: number;
  tipo: string;
  icon: LucideIconName;
  precio: number;
  descripcion: string;
};