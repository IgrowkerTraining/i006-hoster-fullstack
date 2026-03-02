import React from "react";
import type { MaintenanceItem } from "@/src/types/dashboard";
import CardMantenimiento from "./CardMantenimiento";

type Props = {
  items: MaintenanceItem[];
  maxHeightClassName?: string;
  emptyText?: string;
};

const MantenimientoList: React.FC<Props> = ({
  items,
  maxHeightClassName = "max-h-[420px]",
  emptyText = "No hay actividad para este filtro.",
}) => {
  return (
    <div className={`flex flex-col gap-2 overflow-y-auto pr-2 scroll-sutil ${maxHeightClassName}`}>
      {items.map((item) => (
        <CardMantenimiento key={item.id} item={item} />
      ))}

      {items.length === 0 && (
        <div className="py-4 text-center text-sm text-gray-500 font-poppins">
          {emptyText}
        </div>
      )}
    </div>
  );
};

export default MantenimientoList;