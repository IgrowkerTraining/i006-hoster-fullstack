import React from "react";
import type { ActividadDiariaItem } from "../../../types/dashboard";
import CardActividadDiaria from "./CardActividadDiaria";

type Props = {
  items: ActividadDiariaItem[];
  emptyText?: string;
  className?: string;
  maxHeightClassName?: string; // para dashboard vs modal
};

const ActividadDiariaList: React.FC<Props> = ({
  items,
  emptyText = "No hay actividad para este filtro.",
  className = "",
  maxHeightClassName = "max-h-[420px]",
}) => {
  return (
    <div className={`flex flex-col gap-2 overflow-y-auto pr-2 scroll-sutil ${maxHeightClassName} ${className}`}>
      {items.map((item) => (
        <CardActividadDiaria key={item.reservaId} item={item} />
      ))}

      {items.length === 0 && (
        <div className="py-4 text-center text-sm text-gray-500 font-poppins">
          {emptyText}
        </div>
      )}
    </div>
  );
};

export default ActividadDiariaList;