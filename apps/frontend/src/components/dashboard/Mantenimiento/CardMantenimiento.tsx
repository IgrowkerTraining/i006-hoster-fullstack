import React from 'react'
import { MaintenanceItem } from '@/src/types/dashboard';
import { BedDouble, Store, MoreVertical, BrushCleaning, Wrench, UserX, ClockArrowDown } from "lucide-react";

type Props = { item: MaintenanceItem }

const CardMantenimiento: React.FC<Props> = ({ item }) => {
  const isHabitacion = item.lugar.toLowerCase().includes("habitación");
  const isLimpieza = item.tipo === "Limpieza";

  return (
    <div className="border-b border-[#D4D4D4] py-3">
      <div className="grid grid-cols-[48px_2.1fr_2.1fr_28px] gap-3 font-poppins items-start">

        {/* Icono */}
        <div className="flex justify-start items-start pt-1">
          <div className="w-10 h-10 rounded-full bg-[var(--light-main2)] flex items-center justify-center">
            {isHabitacion ? (
              <BedDouble size={18} className="text-[var(--light-text)]" />
            ) : (
              <Store size={18} className="text-[var(--light-text)]" />
            )}
          </div>
        </div>

        <div className="text-start">
          <p className="text-[16px] text-[var(--light-text)] font-bold">{item.lugar}</p>
          {/* Tipo + icono */}
          <div className="flex items-center gap-2 py-1">
            {isLimpieza ? (
              <BrushCleaning size={14} className="text-[var(--light-text)]" />
            ) : (
              <Wrench size={14} className="text-[var(--light-text)]" />
            )}
            <span className="text-[14px] font-light text-[var(--light-text)]">
              Tipo: {item.tipo}
            </span>
          </div>
          <p className="text-[14px] font-light text-[var(--light-text)]">Estatus: {" "}
            <span
              style={{
                backgroundColor:
                  item.estado === "Pendiente"
                    ? "color-mix(in srgb, var(--light-status-pending) 20%, transparent)"
                    : item.estado === "Completado" || item.estado === "Confirmado"
                      ? "color-mix(in srgb, var(--light-status-completed) 20%, transparent)"
                      : "color-mix(in srgb, #D4D4D4 20%, transparent)",
                borderColor:
                  item.estado === "Pendiente"
                    ? "var(--light-status-pending)"
                    : item.estado === "Completado" || item.estado === "Confirmado"
                      ? "var(--light-status-completed)"
                      : "#D4D4D4",
              }}
              className="px-3 py-1 rounded-xl text-[10px] font-light text-[var(--light-text)] border"
            >
              {item.estado}
            </span>
          </p>
        </div>

        <div className="text-start">
          <div className="h-[25px]" />   {/* Spacer para alinear con "Tipo" */}
          <div className="flex items-center gap-2 mt-1">
            <ClockArrowDown size={14} className="text-[var(--light-text)]" />
            <p className="text-[14px] font-light text-[var(--light-text)]">Duración estimada: {item.duracionEstimada}</p>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <UserX size={14} className="text-[var(--light-text)]" />
            <p className="text-[14px] font-light text-[var(--light-text)]">Responsable: {item.responsable}</p>
          </div>
        </div>

        <div className="flex justify-center items-start pt-1">
          <MoreVertical size={18} className="text-[var(--light-text)] cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default CardMantenimiento